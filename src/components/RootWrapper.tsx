'use client';

import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function RootWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
