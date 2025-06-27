'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Adjust path if necessary
import { useAuth } from '@/context/AuthContext'; // Adjust path if necessary

export default function CaregiverPhoneSettings() {
  const { user } = useAuth();
  const [currentPhone, setCurrentPhone] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91'); // Default country code
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isUpdatingPhone, setIsUpdatingPhone] = useState(false);
  const [agreed, setAgreed] = useState(false);

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
        // Fetch from user_profiles table where id matches auth.users.id
        const { data, error } = await supabase
          .from('user_profiles')
          .select('caregiver_phone') // Only select the phone number
          .eq('id', user.id) // Use 'id' as it's the primary key and linked to auth.users.id
          .single();

        // PGRST116 means "no rows found", which is expected for a new user without a profile yet
        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        if (data && data.caregiver_phone) {
          setCurrentPhone(data.caregiver_phone);
          // Attempt to parse country code and number from the stored phone
          if (data.caregiver_phone.startsWith('+')) {
            const matched = data.caregiver_phone.match(/^(\+\d{1,4})(.*)$/); // Matches + followed by 1-4 digits
            if (matched) {
              setCountryCode(matched[1]);
              setNewPhone(matched[2]);
            } else {
              // Fallback if parsing fails (e.g., unexpected format), assume default country code
              setCountryCode('+91');
              setNewPhone(data.caregiver_phone);
            }
          } else {
            // If no '+' prefix, assume default country code and full number
            setCountryCode('+91');
            setNewPhone(data.caregiver_phone);
          }
        } else {
          // No existing phone number found
          setCurrentPhone('');
          setNewPhone('');
          setCountryCode('+91'); // Default for new users
        }
      } catch (err) {
        console.error('Error fetching caregiver phone:', err);
        setMessage('Failed to load caregiver phone. ' + (err?.message || 'An unknown error occurred.'));
      } finally {
        setLoading(false);
      }
    };

    fetchPhoneSettings();
  }, [user]);

  // 2. Handle upsert into user_profiles
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
      const fullPhoneNumber = countryCode + newPhone;

      // Use upsert to either insert a new profile or update an existing one
      const { error: upsertError } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id, // This links directly to auth.users.id
          caregiver_phone: fullPhoneNumber,
        }, { onConflict: 'id' }); // Specify 'id' as the conflict target for upsert

      if (upsertError) {
        throw upsertError;
      }

      setCurrentPhone(fullPhoneNumber);
      setMessage('Phone number updated successfully. Alerts will be sent to this number.');

    } catch (err) {
      console.error('Error updating caregiver phone:', err);
      setMessage('Failed to update caregiver phone: ' + (err?.message || 'An unknown error occurred.'));
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
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-xl mt-2 mb-6">
      <h2 className="text-xl text-center font-medium mb-4 text-gray-800">Your Phone Settings</h2>

      {loading && <p className="text-center text-gray-600">Loading phone settings...</p>}
      {message && <p className="text-sm mb-4 p-2 rounded bg-blue-100 text-blue-700">{message}</p>}

      {!loading && (
        <form onSubmit={handleUpdatePhone} className="space-y-4">
          <div className="flex flex-col items-center space-x-2">
            <span className="text-gray-700">Current Registered Phone:</span>
            <span className="font-medium text-blue-500 underline underline-offset-2 text-center">{currentPhone || 'Not set'}</span>
          </div>
          <div>
            <label htmlFor="newPhone" className="block text-lg font-medium text-black">
              Your Phone Number:
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
                {/* Add more country codes as needed */}
              </select>
              <input
                type="text"
                id="newPhone"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="flex-1 min-w-0 block w-full px-3 py-2 border bg-gray-100 placeholder-gray-400 rounded-r-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="9876543210"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Please enter your phone number without country code; it will be added automatically.</p>
          </div>

          <div className="flex flex-col items-center space-x-2">
            <span className="text-gray-700">SMS Delivery:</span>
            <span className="font-medium text-center text-black">Will send alerts to this number</span>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              required
            />
            <label htmlFor="agree" className="text-sm text-gray-700">
              I agree to the{' '}
              <a href="/terms" target="_blank" className="text-blue-600 underline">Terms and Conditions</a> and{' '}
              <a href="/privacy" target="_blank" className="text-blue-600 underline">Privacy Policy</a>.
            </label>
          </div>

          <button
            type="submit"
            disabled={isUpdatingPhone || !agreed}
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-black text-base font-medium rounded-lg shadow-sm text-black bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdatingPhone ? 'Updating...' : 'Update Phone Number'}
          </button>
        </form>
      )}
    </div>
  );
}