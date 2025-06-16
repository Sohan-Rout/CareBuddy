'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';

export default function ScheduleCallForm({ onScheduled }) {
  const { user } = useAuth();
  const [receivers, setReceivers] = useState([]);
  const [receiverId, setReceiverId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      supabase
        .from('care_receivers')
        .select('id, name')
        .eq('user_id', user.id)
        .then(({ data, error }) => {
          if (error) return;
          setReceivers(data || []);
        });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !receiverId || !date || !time) return;

    const scheduledDateTime = new Date(`${date}T${time}`);

    const { error } = await supabase.from('scheduled_calls').insert([
      {
        user_id: user.id,
        receiver_id: receiverId,
        scheduled_time: scheduledDateTime.toISOString()
      }
    ]);

    if (error) {
      setMessage('Error: ' + error.message);
    } else {
      setMessage('Call scheduled successfully!');
      setReceiverId('');
      setDate('');
      setTime('');
      onScheduled?.(); // trigger refresh if needed
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <h3 className="text-xl text-center font-medium mb-4">Schedule a Call</h3>

      <div>
        <label className="block mb-1 font-medium">Care Receiver:</label>
        <select
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-xl bg-gray-100 shadow-inner focus:outline-none"
        >
          <option value="">Select a person</option>
          {receivers.map(r => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-xl bg-gray-100 shadow-inner focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-xl bg-gray-100 shadow-inner focus:outline-none"
        />
      </div>

      <div className='flex justify-center'>
      <button
        type="submit"
        className="w-auto border border-black bg-primary text-black font-medium py-2 px-3 rounded-xl shadow-lg hover:shadow-lg transition duration-200"
      >
        Schedule Call
      </button>
      </div>

      {message && <p className="text-sm text-center text-gray-600">{message}</p>}
    </form>
  );
}