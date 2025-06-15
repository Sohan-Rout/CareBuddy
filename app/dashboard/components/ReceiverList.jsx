'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';

export default function ReceiverList({ refresh }) {
  const { user } = useAuth();
  const [receivers, setReceivers] = useState([]);

  useEffect(() => {
    if (user) {
      supabase
        .from('care_receivers')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .then(({ data }) => setReceivers(data));
    }
  }, [user, refresh]);

  return (
    <div>
      <h3>Your Care Receivers</h3>
      {receivers.map((r) => (
        <div key={r.id} style={{ padding: '0.5rem', border: '1px solid #ccc', marginBottom: '1rem' }}>
          <strong>{r.name}</strong> <br />
          {r.relationship} | {r.phone}
        </div>
      ))}
    </div>
  );
}