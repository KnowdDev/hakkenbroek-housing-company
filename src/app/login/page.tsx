'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctToken = 'hakkenbroek-admin-2024';
    
    if (password === correctToken) {
      // Set cookie for authentication
      document.cookie = `dashboard_token=${password}; path=/; max-age=86400`;
      router.push('/dashboard');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-sm max-w-md w-full">
        <h1 className="font-display text-2xl text-charcoal mb-6">Dashboard Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-transparent"
              placeholder="Enter password"
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-charcoal text-white px-6 py-3 font-body text-sm uppercase tracking-wider hover:bg-brass transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
