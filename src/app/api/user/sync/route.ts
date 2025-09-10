import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { syncUserWithDatabase } from '@/lib/user-sync'

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbUser = await syncUserWithDatabase()
    
    if (!dbUser) {
      return NextResponse.json({ error: 'Failed to sync user' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      user: {
        id: dbUser.id,
        email: dbUser.email,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
      }
    })
  } catch (error) {
    console.error('Error in user sync API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
