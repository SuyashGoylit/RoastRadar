import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  // Get the headers
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET to .env.local');
  }

  // Get the headers
  const headerPayload = req.headers;
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name } = evt.data;

    try {
      // Create user in database
      await prisma.user.create({
        data: {
          clerkId: id,
          email: email_addresses[0].email_address,
          firstName: first_name || null,
          lastName: last_name || null,
        },
      });

      console.log(`User created: ${email_addresses[0].email_address}`);
    } catch (error) {
      console.error('Error creating user:', error);
      return new Response('Error creating user', {
        status: 500,
      });
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name } = evt.data;

    try {
      // Update user in database
      await prisma.user.update({
        where: {
          clerkId: id,
        },
        data: {
          email: email_addresses[0].email_address,
          firstName: first_name || null,
          lastName: last_name || null,
        },
      });

      console.log(`User updated: ${email_addresses[0].email_address}`);
    } catch (error) {
      console.error('Error updating user:', error);
      return new Response('Error updating user', {
        status: 500,
      });
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;

    try {
      // Delete user from database
      await prisma.user.delete({
        where: {
          clerkId: id,
        },
      });

      console.log(`User deleted: ${id}`);
    } catch (error) {
      console.error('Error deleting user:', error);
      return new Response('Error deleting user', {
        status: 500,
      });
    }
  }

  return new Response('', { status: 200 });
}
