'use client'

import { useState } from 'react';
import { contact, type ContactState } from '@/app/actions/contact';

export function ContactForm() {
  const [state, setState] = useState<ContactState>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.currentTarget);
    const result = await contact(null, formData);
    setState(result);
    setPending(false);
  }

  if (state?.success) {
    return (
      <div className="p-4 border border-black">
        <p className="text-stone-600">{state.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-3 py-2 border border-black bg-transparent font-text focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full px-3 py-2 border border-black bg-transparent font-text resize-y focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="subscribed"
          name="subscribed"
          className="w-4 h-4 border border-black bg-transparent accent-black"
        />
        <label htmlFor="subscribed" className="text-sm">
          Subscribe to future posts
        </label>
      </div>

      {state?.success === false && (
        <p className="text-sm text-red-700">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="px-6 py-2 border border-black bg-transparent text-black font-text hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
