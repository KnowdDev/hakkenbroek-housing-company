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
      document.cookie = `dashboard_token=${password}; path=/; max-age=86400; SameSite=Strict`;
      router.push('/dashboard');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="bg-white p-12 rounded-lg shadow-sm max-w-md w-full">
        <div className="text-center mb-8">
          <img
            src="/logo.svg"
            alt="Hakkenbroek Housing Company"
            className="h-16 mx-auto mb-6"
          />
          <h1 className="font-display text-3xl text-charcoal mb-2">Dashboard</h1>
          <p className="text-stone-600 text-sm tracking-wide uppercase">Secure Access</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-body uppercase tracking-wider text-stone-700 mb-3">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass transition-all duration-300 text-sm"
              placeholder="Enter your password"
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-charcoal text-white px-6 py-4 font-body text-xs uppercase tracking-widest hover:bg-brass transition-colors duration-300 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
