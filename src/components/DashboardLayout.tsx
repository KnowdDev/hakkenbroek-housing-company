'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Enquiries' },
  { href: '/dashboard/listings', label: 'Listings' },
  { href: '/dashboard/mcp', label: 'MCP Server' },
  { href: '/dashboard/vault', label: 'Vault' },
  { href: '/', label: 'Back to Website' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'dashboard_token=; path=/; max-age=0';
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-charcoal text-white transition-all duration-300 z-50 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src="/logo.svg"
              alt="Hakkenbroek"
              width="168"
              height="92"
              className="h-10 w-auto brightness-0 invert"
            />
          </div>
        </div>

        <nav className="p-4 flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-brass text-white'
                      : 'text-stone-300 hover:bg-stone-50/10'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-current opacity-60 flex-shrink-0" />
                  {sidebarOpen && (
                    <span className="font-body text-sm uppercase tracking-wider">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors text-stone-300 hover:bg-red-500/20 hover:text-red-300 ${
              sidebarOpen ? '' : 'justify-center'
            }`}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {sidebarOpen && (
              <span className="font-body text-xs uppercase tracking-wider">Logout</span>
            )}
          </button>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-stone-400 hover:text-white transition-colors font-body text-xs uppercase tracking-wider"
        >
          {sidebarOpen ? 'Collapse' : 'Expand'}
        </button>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {children}
      </main>
    </div>
  );
}
