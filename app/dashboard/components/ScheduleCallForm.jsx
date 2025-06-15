'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';

export default function ScheduleCallForm({ onScheduled }) {
  const { user } = useAuth();
  const [receivers, setReceivers] = useState([]);
  const [receiverId, setReceiverId] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      supabase
        .from('care_receivers')
        .select('id, name')
        .eq('user_id', user.id)
        .then(({ data }) => setReceivers(data || []));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !receiverId || !scheduledTime) return;

    const { error } = await supabase.from('scheduled_calls').insert([
      {
        user_id: user.id,
        receiver_id: receiverId,
        scheduled_time: new Date(scheduledTime).toISOString()
      }
    ]);

    if (error) {
      setMessage('Error: ' + error.message);
    } else {
      setMessage('Call scheduled successfully!');
      setReceiverId('');
      setScheduledTime('');
      onScheduled?.(); // trigger refresh if needed
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <h3>📞 Schedule a Call</h3>

      <label>Care Receiver:</label><br />
      <select
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
        required
      >
        <option value="">Select someone</option>
        {receivers.map(r => (
          <option key={r.id} value={r.id}>{r.name}</option>
        ))}
      </select><br /><br />

      <label>Call Time:</label><br />
      <input
        type="datetime-local"
        value={scheduledTime}
        onChange={(e) => setScheduledTime(e.target.value)}
        required
      /><br /><br />

      <button type="submit">Schedule</button>
      <p>{message}</p>
    </form>
  );
}