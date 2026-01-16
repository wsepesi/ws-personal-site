'use server'

import { query } from '@/lib/db';

export type ContactState = {
  success: boolean;
  message: string;
} | null;

export async function contact(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;
  const subscribed = formData.get('subscribed') === 'on';

  if (!email || !email.includes('@')) {
    return { success: false, message: 'Please enter a valid email address.' };
  }
  if (!message || message.trim().length === 0) {
    return { success: false, message: 'Please enter a message.' };
  }

  try {
    await query(
      'INSERT INTO submissions (email, message, subscribed) VALUES ($1, $2, $3)',
      [email, message, subscribed]
    );
    return { success: true, message: "Message sent! I'll get back to you soon." };
  } catch (error) {
    console.error('Contact error:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
}
