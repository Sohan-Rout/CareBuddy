'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';

export default function ReceiverList({ refresh }) {
  const { user } = useAuth();
  const [receivers, setReceivers] = useState([]);

  useEffect(() => {
    if (!user) return;
    const fetchReceivers = async () => {
      const { data, error } = await supabase
        .from('care_receivers')
        .select('*')
        .eq('user_id', user.id);
      if (!error) {
        setReceivers(data);
      }
    };
    fetchReceivers();
  }, [user, refresh]);

  const handleDelete = async (id) => {
    await supabase.from('care_receivers').delete().eq('id', id);
    setReceivers(receivers.filter((r) => r.id !== id));
  };

  return (
    <div className="bg-white rounded-xl max-h-[385px] h-[385px] shadow-lg p-6">
      <h3 className="text-xl text-center font-medium mb-4">Your Care Receivers</h3>
      {receivers.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500 text-sm">No receivers added yet.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {receivers.map((receiver) => (
            <li
              key={receiver.id}
              className="flex items-center justify-between border p-3 rounded-lg"
            >
              <div>
                <p className="font-medium">{receiver.name}</p>
                <p className="text-sm text-gray-500">{receiver.relationship}</p>
                <p className="text-sm text-gray-600">{receiver.phone}</p>
              </div>
              <button
                onClick={() => handleDelete(receiver.id)}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}