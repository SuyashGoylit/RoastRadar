'use client'

import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

export function useUserSync() {
  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (isLoaded && user) {
      // Call the sync API endpoint
      fetch('/api/user/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch((error) => {
        console.error('Error syncing user:', error)
      })
    }
  }, [isLoaded, user])

  return { user, isLoaded }
}
