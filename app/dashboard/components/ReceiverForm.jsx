'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';

export default function ReceiverForm({ onAdded }) {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: '', phone: '', relationship: '' });
  const [countryCode, setCountryCode] = useState('+91');
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
      phone: (countryCode + form.phone.replace(/\s+/g, '')),
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
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <h3 className="text-xl text-center font-medium mb-4">Add Someone You Care About</h3>

      <div>
        <label className="block mb-1 font-medium">Name:</label>
        <input
          name="name"
          placeholder="Enter the Name of the person"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-xl bg-gray-100 placeholder-gray-400 shadow-inner focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Phone Number:</label>
        <div className="flex gap-2">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="px-3 py-2 rounded-xl bg-gray-100 shadow-inner focus:outline-none border border-gray-300"
          >
            <option value="+91">+91 (India)</option>
            <option value="+1">+1 (USA)</option>
            <option value="+44">+44 (UK)</option>
            {/* Add more country codes as needed */}
          </select>
          <input
            name="phone"
            placeholder="Enter the phone number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-xl bg-gray-100 placeholder-gray-400 shadow-inner focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Relationship:</label>
        <input
          name="relationship"
          placeholder="Your relationship with the person"
          value={form.relationship}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-xl bg-gray-100 placeholder-gray-400 shadow-inner focus:outline-none"
        />
      </div>

      <div className='flex justify-center'>
      <button
        type="submit"
        className="w-auto bg-primary text-black font-medium py-2 px-3 rounded-xl shadow-lg border border-black hover:shadow-lg transition duration-200"
      >
        Add Receiver
      </button>
      </div>

      {message && <p className="text-sm text-center text-gray-600">{message}</p>}
    </form>
  );
}