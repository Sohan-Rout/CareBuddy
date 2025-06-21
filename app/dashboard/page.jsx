'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from "@/app/components/dasboardNavbar";
import ReceiverForm from '@/app/dashboard/components/ReceiverForm';
import ReceiverList from '@/app/dashboard/components/ReceiverList';
import ScheduleCallForm from '@/app/dashboard/components/ScheduleCallForm';
import ScheduledCallList from '@/app/dashboard/components/ScheduledCallList';
import MoodCalendar from '@/app/dashboard/components/MoodCalendar';
import CareReceiverTipsDisplay from '@/app/dashboard/components/CareReceiverTipsDisplay';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/auth');
    }
  }, [user]);

  const name = user?.name || user?.email.split("@")[0] || "";

  return (
    <>
      <Navbar />
      <div className='mx-12'>
        <h2 className="text-xl font-medium text-left mt-6">Welcome, {name}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-6 px-4 py-6">
        <div className="order-1">
          <ReceiverForm onAdded={() => setRefresh(!refresh)} />
        </div>

        <div className="order-2">
          <ReceiverList refresh={refresh} />
        </div>

        <div className="order-3">
          <ScheduleCallForm onScheduled={() => setRefresh(!refresh)} />
        </div>

        <div className="md:col-span-3 order-4">
          <ScheduledCallList refresh={refresh} />
        </div>

        <div className="md:col-span-3 order-5">
          <MoodCalendar />
        </div>

        <div className='order-6 md:col-span-3'>
          <CareReceiverTipsDisplay />
        </div>
      </div>
    </>
  );
}