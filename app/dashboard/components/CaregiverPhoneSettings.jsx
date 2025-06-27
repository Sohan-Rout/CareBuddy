'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Adjust path if necessary
import { useAuth } from '@/context/AuthContext'; // Adjust path if necessary

export default function CaregiverPhoneSettings() {
  const { user } = useAuth();
  const [currentPhone, setCurrentPhone] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isUpdatingPhone, setIsUpdatingPhone] = useState(false);

  // 1. Fetch the current phone number on load
  useEffect(() => {
    const fetchPhoneSettings = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setMessage('');
      try {
        const { data, error } = await supabase
          .from('caregiver_contacts')
          .select('id, caregiver_phone')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        if (data) {
          setCurrentPhone(data.caregiver_phone || '');
          if (data.caregiver_phone.startsWith('+')) {
            const matched = data.caregiver_phone.match(/^(\+\d{1,3})(.*)$/);
            if (matched) {
              setCountryCode(matched[1]);
              setNewPhone(matched[2]);
            } else {
              setCountryCode('+91');
              setNewPhone(data.caregiver_phone);
            }
          } else {
            setCountryCode('+91');
            setNewPhone(data.caregiver_phone || '');
          }
        } else {
          setCurrentPhone('');
          setNewPhone('');
          setCountryCode('+91');
        }
      } catch (err) {
        console.error('Error fetching caregiver phone:', err);
        setMessage('Failed to load caregiver phone. ' + (err?.message || JSON.stringify(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchPhoneSettings();
  }, [user]);

  // 2. Handle insert into caregiver_contacts and log SMS alert
  const handleUpdatePhone = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!user) {
      setMessage('You must be logged in to update your phone number.');
      return;
    }
    if (!newPhone) {
      setMessage('Phone number cannot be empty.');
      return;
    }

    setIsUpdatingPhone(true);
    try {
      // Insert new caregiver phone contact
      const { data: insertData, error: insertError } = await supabase
        .from('caregiver_contacts')
        .insert({
          user_id: user.id,
          caregiver_phone: countryCode + newPhone,
        })
        .select('id')
        .single();

      if (insertError) {
        throw insertError;
      }

      setCurrentPhone(countryCode + newPhone);
      setMessage('Phone number registered. Alerts will be sent to this number.');

      // Log the SMS alert registration in caregiver_sms_logs
      const logMessage = 'Phone number registered. Alerts will be sent to this number.';
      const { error: logError } = await supabase
        .from('caregiver_sms_logs')
        .insert({
          user_id: user.id,
          caregiver_contact_id: insertData.id,
          message: logMessage,
          status: 'pending',
        });

      if (logError) {
        console.error('Error logging SMS alert:', logError.message);
      }
    } catch (err) {
      console.error('Error inserting caregiver phone:', err);
      setMessage('Failed to register caregiver phone: ' + (err?.message || JSON.stringify(err)));
    } finally {
      setIsUpdatingPhone(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Phone Settings</h2>
        <p className="text-gray-600">Please log in to manage your phone number.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-xl mt-8 mb-6">
      <h2 className="text-xl text-center font-medium mb-4 text-gray-800">Your Phone Settings</h2>

      {loading && <p className="text-center text-gray-600">Loading phone settings...</p>}
      {message && <p className="text-sm mb-4 p-2 rounded bg-blue-100 text-blue-700">{message}</p>}

      {!loading && (
        <form onSubmit={handleUpdatePhone} className="space-y-4">
          <div>
            <label htmlFor="newPhone" className="block text-sm font-medium text-gray-700">
              Your Phone Number
            </label>
            <div className="mt-1 flex rounded-lg shadow-sm">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="inline-flex items-center px-2 py-2 border border-gray-300 rounded-l-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              >
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+61">+61</option>
                <option value="+81">+81</option>
                <option value="+49">+49</option>
              </select>
              <input
                type="text"
                id="newPhone"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="flex-1 min-w-0 block w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="9876543210"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Please enter your phone number without country code; it will be added automatically.</p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-700">Current Registered Phone:</span>
            <span className="font-medium">{currentPhone || 'Not set'}</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-700">SMS Delivery:</span>
            <span className="font-semibold text-blue-600">Will send alerts to this number</span>
          </div>

          <button
            type="submit"
            disabled={isUpdatingPhone}
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-black text-base font-medium rounded-lg shadow-sm text-black bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdatingPhone ? 'Updating...' : 'Update Phone Number'}
          </button>
        </form>
      )}
    </div>
  );
}
