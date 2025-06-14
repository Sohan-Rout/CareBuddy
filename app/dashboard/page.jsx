'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from "@/app/components/dasboardNavbar";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth');
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div style={{
        padding: '2rem',
        maxWidth: '800px',
        margin: '2rem auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>Welcome, {user?.email}</h2>
        <p>This is your dashboard. Here you can trigger voice calls, review your mood logs, and manage caregiver alerts.</p>
      </div>
    </>
  );
}