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
  isSameDay,
  parseISO,
} from 'date-fns';

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function MoodCalendar() {
  const { user } = useAuth();
  const [moodLogs, setMoodLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  const moodsByDate = useMemo(() => {
    const moodsMap = new Map();
    moodLogs.forEach(log => {
      const date = format(parseISO(log.created_at), 'yyyy-MM-dd');
      moodsMap.set(date, log.sentiment);
    });
    return moodsMap;
  }, [moodLogs]);

  // Filter mood logs to show entries for the selected date
  const logsForSelectedDate = useMemo(() => {
    return moodLogs.filter(log => isSameDay(parseISO(log.created_at), selectedDate));
  }, [moodLogs, selectedDate]);

  // Generate calendar days for the current month
  const daysInMonth = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });

    const firstDayIndex = getDay(start); 
    for (let i = 0; i < firstDayIndex; i++) {
      days.unshift(null); 
    }

    return days;
  }, [currentMonth]);

  const moodMap = {
    positive: { emoji: '😊', color: 'bg-green-200 text-green-800' },
    neutral: { emoji: '😐', color: 'bg-yellow-200 text-yellow-800' },
    negative: { emoji: '😟', color: 'bg-red-200 text-red-800' },
    unknown: { emoji: '❓', color: 'bg-gray-200 text-gray-600' },
  };

  const getDayClassNames = (day) => {
    let classes = 'rounded-md h-10 w-full flex items-center justify-center text-xs font-medium cursor-pointer'; // Added cursor-pointer

    if (!day) {
      return classes + ' bg-transparent';
    }

    const dateString = format(day, 'yyyy-MM-dd');
    const mood = moodsByDate.get(dateString);
    const { color } = mood ? moodMap[mood] : moodMap.unknown;

    classes += ` ${color}`;

    // Add styling for today's date
    if (isToday(day)) {
      classes += ' border-2 border-blue-500'; // Highlight today
    }

    // Add styling for the selected date
    if (isSameDay(day, selectedDate)) {
      classes += ' ring-2 ring-offset-2 ring-blue-700'; // Highlight selected date
    }

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
        <h3 className="text-xl text-center font-medium mb-4 text-black">
          Mood Logs for {format(selectedDate, 'PPP')} {/* Display selected date */}
        </h3>
        <div className="space-y-2">
          {logsForSelectedDate.length === 0 ? ( // Check logsForSelectedDate
            <p className="text-gray-500 text-center">No mood logs available for this date 
            <br/>
            or 
            <br/>
            Initiate the calls to begin</p>
          ) : (
            logsForSelectedDate.map((log, idx) => ( // Map logsForSelectedDate
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
        <h3 className="text-xl text-center font-medium mb-4 text-black">Mood Calendar</h3>
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
              <div
                key={index}
                className={getDayClassNames(day)}
                onClick={() => day && setSelectedDate(day)}
              >
                {day ? format(day, 'd') : ''}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
