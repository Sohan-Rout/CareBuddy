'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function DashboardNavbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <main className="bg-none px-[3%] pt-6">
      <nav className="flex justify-between items-center px-6 md:px-12 py-3 bg-white sticky top-0 z-50 rounded-2xl border border-none shadow-[0_12px_24px_rgba(0,0,0,0.25)] backdrop-blur-md">
        {/* Brand */}
        <div className="flex flex-row font-extrabold items-center text-2xl text-gray-900 tracking-tight">
          <img src="/logo.png" style={{ height: '2.5rem' }} alt="Logo" />
          <span className="text-2xl"
            style={{
              textShadow: '0 2px 8px rgba(16,16,32,0.10), 0 1px 2px rgba(0,0,0,0.18)'
            }}
          >
            Care
            <span className="text-secondary">Buddy</span>
          </span>
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {/* Hamburger icon */}
          <span>{isOpen ? <>&#x2715;</> : <>&#9776;</>}</span>
        </button>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="px-6 py-1 text-lg border border-gray-800 rounded-full text-black font-[550] bg-primary hover:opacity-90 transition shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
          >
            Logout
          </button>
        </div>
      </nav>
    </main>
  );
}
