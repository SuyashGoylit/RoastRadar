import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// POST - Add coffee to wishlist
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ coffeeId: string }> }
) {
  try {
    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { coffeeId } = await params

    // Get user from database
    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if coffee exists
    const coffee = await prisma.coffee.findUnique({
      where: {
        id: coffeeId,
      },
    })

    if (!coffee) {
      return NextResponse.json({ error: 'Coffee not found' }, { status: 404 })
    }

    // Check if already in wishlist
    const existingWishlistItem = await prisma.user.findFirst({
      where: {
        id: dbUser.id,
        wishlist: {
          some: {
            id: coffeeId,
          },
        },
      },
    })

    if (existingWishlistItem) {
      return NextResponse.json({ error: 'Coffee already in wishlist' }, { status: 400 })
    }

    // Add to wishlist
    await prisma.user.update({
      where: {
        id: dbUser.id,
      },
      data: {
        wishlist: {
          connect: {
            id: coffeeId,
          },
        },
      },
    })

    return NextResponse.json({ success: true, message: 'Added to wishlist' })
  } catch (error) {
    console.error('Error adding to wishlist:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Remove coffee from wishlist
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ coffeeId: string }> }
) {
  try {
    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { coffeeId } = await params

    // Get user from database
    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Remove from wishlist
    await prisma.user.update({
      where: {
        id: dbUser.id,
      },
      data: {
        wishlist: {
          disconnect: {
            id: coffeeId,
          },
        },
      },
    })

    return NextResponse.json({ success: true, message: 'Removed from wishlist' })
  } catch (error) {
    console.error('Error removing from wishlist:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
