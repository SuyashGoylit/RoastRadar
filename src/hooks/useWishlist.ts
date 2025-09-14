'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

interface Coffee {
  id: string
  name: string
  roaster: string
  type: string
  roastLevel: string
  bitterness: string
  acidity: string
  origin: {
    location?: string
    altitude?: number
  }
  processing: string
  description: string
  price: number
  url: string
  createdAt: Date
  updatedAt: Date
}

export function useWishlist() {
  const { user, isLoaded } = useUser()
  const [wishlist, setWishlist] = useState<Coffee[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch wishlist
  const fetchWishlist = async () => {
    if (!isLoaded || !user) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/wishlist')
      if (!response.ok) {
        throw new Error('Failed to fetch wishlist')
      }
      const data = await response.json()
      setWishlist(data.wishlist || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Add to wishlist
  const addToWishlist = async (coffeeId: string) => {
    if (!isLoaded || !user) return false

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/wishlist/${coffeeId}`, {
        method: 'POST',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add to wishlist')
      }

      // Refresh wishlist
      await fetchWishlist()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return false
    } finally {
      setLoading(false)
    }
  }

  // Remove from wishlist
  const removeFromWishlist = async (coffeeId: string) => {
    if (!isLoaded || !user) return false

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/wishlist/${coffeeId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to remove from wishlist')
      }

      // Refresh wishlist
      await fetchWishlist()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return false
    } finally {
      setLoading(false)
    }
  }

  // Check if coffee is in wishlist
  const isInWishlist = (coffeeId: string) => {
    return wishlist.some(coffee => coffee.id === coffeeId)
  }

  // Toggle wishlist status
  const toggleWishlist = async (coffeeId: string) => {
    if (isInWishlist(coffeeId)) {
      return await removeFromWishlist(coffeeId)
    } else {
      return await addToWishlist(coffeeId)
    }
  }

  // Fetch wishlist when user loads
  useEffect(() => {
    if (isLoaded && user) {
      fetchWishlist()
    } else {
      setWishlist([])
    }
  }, [isLoaded, user])

  return {
    wishlist,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    fetchWishlist,
  }
}
