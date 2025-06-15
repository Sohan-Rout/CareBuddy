'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from "@/app/components/dasboardNavbar";
import ReceiverForm from '@/app/dashboard/components/ReceiverForm';
import ReceiverList from '@/app/dashboard/components/ReceiverList';
import ScheduleCallForm from '@/app/dashboard/components/ScheduleCallForm';
import ScheduledCallList from '@/app/dashboard/components/ScheduledCallList';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);

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
        <ReceiverForm onAdded={() => setRefresh(!refresh)} />
      <ReceiverList refresh={refresh} />
      <ScheduleCallForm onScheduled={() => setRefresh(!refresh)} />
        <ScheduledCallList refresh={refresh} />
      </div>
    </>
  );
}