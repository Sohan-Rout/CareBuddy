'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';

export default function ScheduledCallList({ refresh }) {
  const { user } = useAuth();
  const [calls, setCalls] = useState([]);
  const [filter, setFilter] = useState('today');

  const handleDelete = async (id) => {
    await supabase.from('scheduled_calls').delete().eq('id', id);
    setCalls(calls.filter(call => call.id !== id));
  };

  useEffect(() => {
    if (user) {
      const fetchCalls = async () => {
        let query = supabase
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
          .order('scheduled_time', { ascending: false });

        const today = new Date();
        let fromDate;

        if (filter === 'today') {
          fromDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        } else if (filter === 'week') {
          fromDate = new Date(today);
          fromDate.setDate(today.getDate() - 7);
        } else if (filter === 'month') {
          fromDate = new Date(today);
          fromDate.setMonth(today.getMonth() - 1);
        }

        if (fromDate) {
          query = query.gte('scheduled_time', fromDate.toISOString());
        }

        const { data } = await query;
        setCalls(data || []);
      };

      fetchCalls();
    }
  }, [user, refresh, filter]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
      <h3 className="text-xl font-medium mb-4 text-center">Scheduled Calls</h3>

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setFilter('today')}
          className={`px-3 py-1 rounded ${filter === 'today' ? 'bg-primary text-black border border-black' : 'bg-gray-200 text-gray-700'}`}
        >
          Today
        </button>
        <button
          onClick={() => setFilter('week')}
          className={`px-3 py-1 rounded ${filter === 'week' ? 'bg-primary text-black border border-black' : 'bg-gray-200 text-gray-700'}`}
        >
          Past Week
        </button>
        <button
          onClick={() => setFilter('month')}
          className={`px-3 py-1 rounded ${filter === 'month' ? 'bg-primary text-black border border-black' : 'bg-gray-200 text-gray-700'}`}
        >
          Past Month
        </button>
      </div>

      {calls.length === 0 ? (
        <p className="text-gray-500 text-center">No calls scheduled yet.</p>
      ) : (
        <div className="space-y-2">
          <div className="grid grid-cols-6 gap-4 font-semibold text-sm border p-2 rounded-lg">
            <div>Date</div>
            <div className="col-span-1">Name</div>
            <div>Number</div>
            <div>Time</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {calls.map(call => {
            const datetime = new Date(call.scheduled_time);
            const date = datetime.toLocaleDateString();
            const time = datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            return (
              <div key={call.id} className="grid grid-cols-6 gap-4 text-sm border p-2 rounded-lg">
                <div>{date}</div>
                <div className="col-span-1">{call.care_receivers?.name || 'Unknown'}</div>
                <div>{call.care_receivers?.phone || '-'}</div>
                <div>{time}</div>
                <div className="font-medium">{call.status}</div>
                <div className="flex gap-2">
                  <button onClick={() => handleDelete(call.id)} className="text-red-500 hover:underline">Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}