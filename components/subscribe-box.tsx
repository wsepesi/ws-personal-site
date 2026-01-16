'use client'

import { useState } from 'react';
import { subscribe, type SubscribeState } from '@/app/actions/subscribe';

type SubscribeBoxProps = {
  compact?: boolean;
};

export function SubscribeBox({ compact = false }: SubscribeBoxProps) {
  const [state, setState] = useState<SubscribeState>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.currentTarget);
    const result = await subscribe(null, formData);
    setState(result);
    setPending(false);
  }

  if (compact) {
    if (state?.success) {
      return (
        <div className="mb-6">
          <p className="text-sm text-green-700">{state.message}</p>
        </div>
      );
    }

    return (
      <div className="mb-6">
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-stone-600">Subscribe:</span>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            className="px-2 py-1 border border-stone-400 rounded bg-white/50 font-text text-sm w-48 focus:outline-none focus:ring-2 focus:ring-stone-500"
          />
          <button
            type="submit"
            disabled={pending}
            className="px-3 py-1 bg-stone-800 text-white rounded text-sm hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? '...' : 'Subscribe'}
          </button>
        </form>
        {state?.success === false && (
          <p className="text-xs mt-1 text-red-600">{state.message}</p>
        )}
      </div>
    );
  }

  if (state?.success) {
    return (
      <div className="mt-8 pt-6 border-t border-stone-300">
        <p className="text-sm text-green-700">{state.message}</p>
      </div>
    );
  }

  return (
    <div className="mt-8 pt-6 border-t border-stone-300">
      <h3 className="text-lg font-text font-semibold mb-2">Subscribe</h3>
      <p className="text-sm text-gray-600 mb-3">Get notified when I publish new posts.</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          className="flex-1 px-3 py-2 border border-stone-400 rounded bg-white/50 font-text text-sm focus:outline-none focus:ring-2 focus:ring-stone-500"
        />
        <button
          type="submit"
          disabled={pending}
          className="px-4 py-2 bg-stone-800 text-white rounded font-text text-sm hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {state?.success === false && (
        <p className="mt-2 text-sm text-red-600">{state.message}</p>
      )}
    </div>
  );
}
