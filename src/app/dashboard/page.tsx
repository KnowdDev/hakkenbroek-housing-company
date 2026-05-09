'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  property_id?: number;
  created_at: string;
}

export default function Dashboard() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('dashboard_token='))
      ?.split('=')[1];
    
    if (!token || token !== 'hakkenbroek-admin-2024') {
      router.push('/login');
      return;
    }

    fetchEnquiries();
  }, [router]);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch('/api/enquiries');
      const data = await response.json();
      setEnquiries(data);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="font-display text-4xl text-charcoal mb-2">Enquiries</h1>
          <p className="text-stone-600">Manage incoming enquiries</p>
        </div>

        <div className="bg-stone-50 rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-stone-500">Loading enquiries...</div>
          ) : enquiries.length === 0 ? (
            <div className="p-8 text-center text-stone-500">No enquiries yet</div>
          ) : (
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4 text-left font-body text-xs uppercase tracking-wider text-stone-600">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left font-body text-xs uppercase tracking-wider text-stone-600">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left font-body text-xs uppercase tracking-wider text-stone-600">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left font-body text-xs uppercase tracking-wider text-stone-600">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left font-body text-xs uppercase tracking-wider text-stone-600">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {enquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-stone-50">
                    <td className="px-6 py-4 text-sm text-stone-600">
                      {new Date(enquiry.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-charcoal">
                      {enquiry.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600">
                      {enquiry.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600">
                      {enquiry.phone || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600 max-w-md">
                      {enquiry.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
