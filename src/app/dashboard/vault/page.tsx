'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

interface VaultEntry {
  id: number; key: string; description: string | null;
  created_at: string; updated_at: string;
}

export default function VaultDashboard() {
  const [secrets, setSecrets] = useState<VaultEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [desc, setDesc] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ t: string; ok: boolean } | null>(null);

  useEffect(() => { fetchSecrets(); }, []);

  const fetchSecrets = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/vault');
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error);
      setSecrets(Array.isArray(data) ? data : []);
    } catch (err) {
      setMsg({ t: (err as Error).message, ok: false });
    } finally { setLoading(false); }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim() || !value.trim()) return;
    setSaving(true);
    try {
      const res = await fetch('/api/vault', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: key.trim(), value, description: desc.trim() || undefined }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setMsg({ t: `'${key.trim()}' stored`, ok: true });
      setKey(''); setValue(''); setDesc('');
      await fetchSecrets();
    } catch (err) {
      setMsg({ t: (err as Error).message, ok: false });
    } finally { setSaving(false); }
  };

  const remove = async (k: string) => {
    try {
      const res = await fetch(`/api/vault?key=${encodeURIComponent(k)}`, { method: 'DELETE' });
      if (!res.ok) throw new Error((await res.json()).error);
      setMsg({ t: `'${k}' deleted`, ok: true });
      await fetchSecrets();
    } catch (err) {
      setMsg({ t: (err as Error).message, ok: false });
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl">
        <h1 className="font-display text-4xl text-charcoal mb-2">Vault</h1>
        <p className="text-stone-600 mb-8">Encrypted credential store (AES-256-GCM).</p>
        {msg && <div className={`mb-6 p-4 rounded-lg text-sm ${msg.ok ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{msg.t}</div>}
        <form onSubmit={save} className="bg-stone-50 rounded-lg p-6 border border-stone-200 mb-8 space-y-4">
          <h2 className="font-display text-xl text-charcoal">Store Secret</h2>
          <input value={key} onChange={e => setKey(e.target.value)} placeholder="Key (e.g. DATABASE_URL)" className="w-full px-4 py-3 border border-stone-300 rounded-lg text-sm" />
          <textarea value={value} onChange={e => setValue(e.target.value)} rows={3} placeholder="Secret value" className="w-full px-4 py-3 border border-stone-300 rounded-lg text-sm font-mono" />
          <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description (optional)" className="w-full px-4 py-3 border border-stone-300 rounded-lg text-sm" />
          <button type="submit" disabled={saving} className="bg-charcoal text-white px-6 py-3 text-xs uppercase tracking-wider hover:bg-brass rounded-lg disabled:opacity-50">{saving ? 'Saving...' : 'Store'}</button>
        </form>
        <div className="bg-stone-50 rounded-lg p-6 border border-stone-200">
          <h2 className="font-display text-xl text-charcoal mb-4">Secrets ({secrets.length})</h2>
          {loading ? <p className="text-sm text-stone-500">Loading...</p> :
           secrets.length === 0 ? <p className="text-sm text-stone-500">None stored.</p> :
           secrets.map(s => (
            <div key={s.id} className="flex items-center justify-between border-b border-stone-200 py-3 last:border-0">
              <div><p className="font-mono text-sm font-medium text-charcoal">{s.key}</p>{s.description && <p className="text-xs text-stone-500">{s.description}</p>}</div>
              <button onClick={() => remove(s.key)} className="text-red-600 text-xs uppercase tracking-wider hover:text-red-800">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
