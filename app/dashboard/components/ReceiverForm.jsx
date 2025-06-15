'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';

export default function ReceiverForm({ onAdded }) {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: '', phone: '', relationship: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase.from('care_receivers').insert([{
      user_id: user.id,
      name: form.name,
      phone: form.phone,
      relationship: form.relationship
    }]);

    if (error) {
      setMessage('Error adding receiver: ' + error.message);
    } else {
      setMessage('Receiver added successfully!');
      setForm({ name: '', phone: '', relationship: '' });
      onAdded(); // refresh the list
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h3>Add Someone You Care About</h3>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required /><br />
      <input name="phone" placeholder="Phone (+91...)" value={form.phone} onChange={handleChange} required /><br />
      <input name="relationship" placeholder="Relationship" value={form.relationship} onChange={handleChange} /><br />
      <button type="submit">Add Receiver</button>
      <p>{message}</p>
    </form>
  );
}