'use client';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function DashboardNavbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <nav style={{ padding: '1rem', backgroundColor: '#eaeaea', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ fontWeight: 'bold' }}>CareBuddy Dashboard</div>
      <button onClick={handleLogout} style={{ padding: '0.5rem 1rem' }}>
        Logout
      </button>
    </nav>
  );
}
