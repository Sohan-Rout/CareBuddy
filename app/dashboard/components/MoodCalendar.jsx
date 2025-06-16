'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';

export default function MoodCalendar() {
  const { user } = useAuth();
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    if (!user) return;
    const fetchMoods = async () => {
      const { data, error } = await supabase
        .from('mood_logs')
        .select('created_at, sentiment')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) console.error('Failed to fetch mood logs:', error.message);
      else setMoods(data);
    };

    fetchMoods();
  }, [user]);

  const moodEmoji = {
    positive: '😊',
    neutral: '😐',
    negative: '😟'
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Mood Calendar</h3>
      {moods.length === 0 ? (
        <p>No mood entries yet.</p>
      ) : (
        <ul>
          {moods.map((mood, index) => (
            <li key={index} style={{ marginBottom: '0.5rem' }}>
              <strong>Day {index + 1}:</strong>{' '}
              <span>{moodEmoji[mood.sentiment] || '❓'} {mood.sentiment}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}