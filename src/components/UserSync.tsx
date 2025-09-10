'use client'

import { useUserSync } from '@/hooks/useUserSync'

export function UserSync() {
  useUserSync()
  return null // This component doesn't render anything
}
