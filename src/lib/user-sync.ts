import { prisma } from './prisma';
import { currentUser } from '@clerk/nextjs/server';

export async function syncUserWithDatabase() {
  try {
    const user = await currentUser();
    
    if (!user) {
      return null;
    }

    // Check if user already exists in database
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (existingUser) {
      // Update user info in case it changed in Clerk
      const updatedUser = await prisma.user.update({
        where: {
          clerkId: user.id,
        },
        data: {
          email: user.emailAddresses[0]?.emailAddress || existingUser.email,
          firstName: user.firstName || null,
          lastName: user.lastName || null,
        },
      });
      return updatedUser;
    }

    // Create new user if doesn't exist
    const newUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || '',
        firstName: user.firstName || null,
        lastName: user.lastName || null,
      },
    });

    console.log(`New user created in database: ${newUser.email}`);
    return newUser;
  } catch (error) {
    console.error('Error syncing user with database:', error);
    return null;
  }
}

export async function getUserFromDatabase() {
  try {
    const user = await currentUser();
    
    if (!user) {
      return null;
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    return dbUser;
  } catch (error) {
    console.error('Error getting user from database:', error);
    return null;
  }
}
