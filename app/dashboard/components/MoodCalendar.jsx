'use client';
import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isToday,
  isPast,
  isFuture,
  parseISO,
} from 'date-fns';

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function MoodCalendar() {
  const { user } = useAuth();
  const [moodLogs, setMoodLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const fetchMoods = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from('mood_logs')
          .select('created_at, sentiment, care_receivers(name)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true });

        if (fetchError) {
          throw fetchError;
        }
        setMoodLogs(data);
      } catch (err) {
        console.error('Failed to fetch mood logs:', err.message);
        setError('Failed to load mood data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMoods();

    const moodLogChannel = supabase
      .channel('mood_logs_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'mood_logs' },
        (payload) => {
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            fetchMoods();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(moodLogChannel);
    };
  }, [user]);

  // Memoize the processed mood data for calendar display
  const moodsByDate = useMemo(() => {
    const moodsMap = new Map();
    moodLogs.forEach(log => {
      const date = format(parseISO(log.created_at), 'yyyy-MM-dd');
      moodsMap.set(date, log.sentiment);
    });
    return moodsMap;
  }, [moodLogs]);

  // Generate calendar days for the current month
  const daysInMonth = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });

    // Add leading empty days for calendar alignment
    const firstDayIndex = getDay(start); // 0 for Sunday, 1 for Monday, etc.
    for (let i = 0; i < firstDayIndex; i++) {
      days.unshift(null); // Add null placeholders for days before the 1st
    }

    return days;
  }, [currentMonth]);

  // Mood emoji and color mapping
  const moodMap = {
    positive: { emoji: '😊', color: 'bg-green-200 text-green-800' },
    neutral: { emoji: '😐', color: 'bg-yellow-200 text-yellow-800' },
    negative: { emoji: '😟', color: 'bg-red-200 text-red-800' },
    unknown: { emoji: '❓', color: 'bg-gray-200 text-gray-600' },
  };

  const getDayClassNames = (day) => {
    let classes = 'rounded-md h-10 w-full flex items-center justify-center text-xs font-medium';

    if (!day) {
      return classes + ' bg-transparent';
    }

    const dateString = format(day, 'yyyy-MM-dd');
    const mood = moodsByDate.get(dateString);
    const { color } = mood ? moodMap[mood] : moodMap.unknown;

    classes += ` ${color}`;

    return classes;
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Mood Calendar</h3>
        <p className="text-gray-600">Please log in to view your mood calendar.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto p-0">
      <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-xl p-6">
        <h3 className="text-xl text-center font-medium mb-4 text-black">Daily Mood Logs</h3>
        <div className="space-y-2">
          {moodLogs.length === 0 ? (
            <p className="text-gray-500">No mood entries available.</p>
          ) : (
            moodLogs.map((log, idx) => (
              <div key={idx} className="p-4 bg-white border border-transparent border-b-black/25">
                <p className="text-sm text-gray-700">
                  <span className='font-semibold'>Receiver:</span> {log.care_receivers?.name || 'Unknown'}
                </p>
                <p className="text-sm text-gray-700">
                  <span className='font-semibold'>Sentiment:</span> {log.sentiment}
                </p>
                <p className="text-sm text-secondary">
                  <span className='font-semibold'>Time:</span> {format(parseISO(log.created_at), 'PPpp')}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-xl p-6">
        <h3 className="text-xl text-center font-medium mb-4 text-black">Mood Calender</h3>
        <div className="flex justify-between bg-primary border border-black rounded-xl items-center mb-4">
          <button
            onClick={() => setCurrentMonth(prev => startOfMonth(new Date(prev.getFullYear(), prev.getMonth() - 1, 1)))}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            &lt;
          </button>
          <h4 className="text-lg font-medium text-gray-700">
            {format(currentMonth, 'MMMM yyyy')}
          </h4>
          <button
            onClick={() => setCurrentMonth(prev => startOfMonth(new Date(prev.getFullYear(), prev.getMonth() + 1, 1)))}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            &gt;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center font-bold text-gray-600 mb-2 text-xs">
          {WEEK_DAYS.map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {daysInMonth.map((day, index) => {
            return (
              <div key={index} className={getDayClassNames(day)}>
                {day ? format(day, 'd') : ''}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
