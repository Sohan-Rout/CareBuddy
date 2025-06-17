'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';

export default function ScheduledCallList({ refresh }) {
  const { user } = useAuth();
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    if (user) {
      supabase
        .from('scheduled_calls')
        .select(`
          id,
          scheduled_time,
          status,
          care_receivers (
            name,
            phone
          )
        `)
        .eq('user_id', user.id)
        .order('scheduled_time', { ascending: true })
        .then(({ data }) => setCalls(data || []));
    }
  }, [user, refresh]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
      <h3 className="text-xl font-medium mb-4 text-center">Scheduled Calls</h3>

      {calls.length === 0 ? (
        <p className="text-gray-500 text-center">No calls scheduled yet.</p>
      ) : (
        <div className="space-y-2">
          <div className="grid grid-cols-5 gap-4 font-semibold text-sm border p-2 rounded-lg">
            <div>Date</div>
            <div className="col-span-1">Name</div>
            <div>Number</div>
            <div>Time</div>
            <div>Status</div>
          </div>

          {calls.map(call => {
            const datetime = new Date(call.scheduled_time);
            const date = datetime.toLocaleDateString();
            const time = datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            return (
              <div key={call.id} className="grid grid-cols-5 gap-4 text-sm border p-2 rounded-lg">
                <div>{date}</div>
                <div className="col-span-1">{call.care_receivers?.name || 'Unknown'}</div>
                <div>{call.care_receivers?.phone || '-'}</div>
                <div>{time}</div>
                <div className="font-medium">{call.status}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}