'use server'

import { query } from '@/lib/db';

export type SubscribeState = {
  success: boolean;
  message: string;
} | null;

export async function subscribe(
  prevState: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  const email = formData.get('email') as string;

  if (!email || !email.includes('@')) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  try {
    await query(
      'INSERT INTO submissions (email, subscribed) VALUES ($1, true)',
      [email]
    );
    return { success: true, message: 'Thanks for subscribing!' };
  } catch (error) {
    console.error('Subscribe error:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
}
