'use client'

import { useWishlistContext } from '@/contexts/WishlistContext'
import CoffeeCard from '@/components/CoffeeCard'
import { Button } from '@/components/ui/button'
import { Heart, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'

export default function WishlistPage() {
  const { wishlist, loading, error } = useWishlistContext()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading your wishlist...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Error Loading Wishlist</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <Button variant="outline" size="sm" className="hover:bg-amber-50 transition-colors cursor-pointer">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            <h1 className="text-4xl font-bold text-foreground">My Wishlist</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Your saved coffee collection
          </p>
        </div>

        <SignedOut>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Sign in to view your wishlist</h2>
              <p className="text-muted-foreground mb-6">
                Create an account or sign in to save your favorite coffees
              </p>
              <SignInButton>
                <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                  Sign In
                </Button>
              </SignInButton>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          {wishlist.length === 0 ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">Your wishlist is empty</h2>
                <p className="text-muted-foreground mb-6">
                  Start exploring and add some coffees to your wishlist
                </p>
                <Link href="/">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white cursor-pointer">
                    Browse Coffees
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Wishlist Stats */}
              <div className="mb-6">
                <p className="text-muted-foreground">
                  {wishlist.length} {wishlist.length === 1 ? 'coffee' : 'coffees'} in your wishlist
                </p>
              </div>

              {/* Coffee Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlist.map((coffee) => (
                  <CoffeeCard key={coffee.id} coffee={coffee} />
                ))}
              </div>
            </>
          )}
        </SignedIn>
      </div>
    </div>
  )
}
