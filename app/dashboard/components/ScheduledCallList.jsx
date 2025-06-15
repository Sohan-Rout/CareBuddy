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
    <div style={{ marginTop: '2rem' }}>
      <h3>📋 Scheduled Calls</h3>
      {calls.length === 0 && <p>No calls scheduled yet.</p>}

      {calls.map(call => (
        <div key={call.id} style={{
          padding: '1rem',
          marginBottom: '1rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <strong>{call.care_receivers?.name || 'Unknown Receiver'}</strong><br />
          📱 {call.care_receivers?.phone}<br />
          🕒 {new Date(call.scheduled_time).toLocaleString()}<br />
          📌 Status: <span style={{ fontWeight: 'bold' }}>{call.status}</span>
        </div>
      ))}
    </div>
  );
}