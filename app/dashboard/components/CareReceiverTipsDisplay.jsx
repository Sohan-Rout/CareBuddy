'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Adjust path if necessary
import { useAuth } from '@/context/AuthContext'; // Adjust path if necessary
import { format, parseISO } from 'date-fns'; // For date formatting
import { FaLightbulb, FaCheckCircle } from 'react-icons/fa'; // Added FaCheckCircle for the button icon
import toast from 'react-hot-toast';

export default function CareReceiverTipsDisplay() {
  const { user } = useAuth();
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null); // State to track which tip is being deleted

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchTips = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from('care_receiver_tips')
          .select(`
            id,
            tip_content,
            tip_date,
            generated_at,
            care_receivers ( name )
          `)
          .eq('user_id', user.id)
          .order('tip_date', { ascending: false })
          .order('generated_at', { ascending: false });

        if (fetchError) {
          throw fetchError;
        }
        setTips(data);
      } catch (err) {
        console.error('Failed to fetch care receiver tips:', err.message);
        setError('Failed to load tips. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTips();

    const tipsChannel = supabase
      .channel('care_receiver_tips_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'care_receiver_tips' },
        (payload) => {
          // For simplicity, refetch all tips on any change.
          // For larger apps, you might want to update state more granularly based on payload.
          fetchTips();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(tipsChannel);
    };
  }, [user]);

  const handleMarkAsDone = async (tipId) => {
    if (!user) {
      alert('You must be logged in to mark tips as done.');
      return;
    }

    setDeletingId(tipId); // Set the ID of the tip being deleted
    try {
      const { error: deleteError } = await supabase
        .from('care_receiver_tips')
        .delete()
        .eq('id', tipId)
        .eq('user_id', user.id); // Ensure only the user's own tips can be deleted

      if (deleteError) {
        throw deleteError;
      }

      // Optimistically update the UI: remove the tip from the local state
      setTips(prevTips => prevTips.filter(tip => tip.id !== tipId));
      console.log(`Tip ${tipId} marked as done and deleted.`);
      toast.success('Tip marked as done and removed.');

    } catch (err) {
      console.error('Error marking tip as done:', err.message);
      setError(`Failed to mark tip as done: ${err.message}`);
      alert(`Failed to mark tip as done: ${err.message}`); // Provide user feedback
    } finally {
      setDeletingId(null); // Reset deleting state
    }
  };

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Care Receiver Tips</h3>
        <p className="text-gray-600">Please log in to view your personalized tips.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-xl mt-8">
      <h3 className="text-2xl font-medium text-center mb-6 text-black">Care Receiver Tips</h3>

      {loading && <p className="text-black/25 text-center">Loading personalized tips...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && (
        <>
          {tips.length === 0 ? (
            <p className="text-center text-gray-500">No tips generated yet. Tips will appear here after calls.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips.map((tip) => (
                <div
                  key={tip.id}
                  className={`bg-white p-6 rounded-lg shadow-lg transition-all duration-300 border border-gray-400
                    ${deletingId === tip.id ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}`}
                >
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3"><FaLightbulb className='text-amber-500'/></span>
                    <h4 className="text-xl font-medium text-black">
                      Tip for {tip.care_receivers?.name || 'Unknown Receiver'}
                    </h4>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">{tip.tip_content}</p>
                  <div className="text-sm text-gray-500 mb-4">
                    <p>For: {format(parseISO(tip.tip_date), 'PPP')}</p>
                    <p>Generated: {format(parseISO(tip.generated_at), 'MMM d, yyyy h:mm a')}</p>
                  </div>
                  <button
                    onClick={() => handleMarkAsDone(tip.id)}
                    disabled={deletingId === tip.id} // Disable button while deleting
                    className={`w-full flex items-center justify-center px-4 py-2 border border-black text-base font-medium rounded-md shadow-sm text-black
                      ${deletingId === tip.id ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary'}`}
                  >
                    {deletingId === tip.id ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Marking Done...
                      </>
                     ) : (
                      <>
                        <FaCheckCircle className="mr-2" /> Mark as Done
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
