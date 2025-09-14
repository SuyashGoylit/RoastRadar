'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useWishlist } from '@/hooks/useWishlist'

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

interface WishlistContextType {
  wishlist: Coffee[]
  loading: boolean
  error: string | null
  addToWishlist: (coffeeId: string) => Promise<boolean>
  removeFromWishlist: (coffeeId: string) => Promise<boolean>
  toggleWishlist: (coffeeId: string) => Promise<boolean>
  isInWishlist: (coffeeId: string) => boolean
  fetchWishlist: () => Promise<void>
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

interface WishlistProviderProps {
  children: ReactNode
}

export function WishlistProvider({ children }: WishlistProviderProps) {
  const wishlistData = useWishlist()

  return (
    <WishlistContext.Provider value={wishlistData}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlistContext() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlistContext must be used within a WishlistProvider')
  }
  return context
}
