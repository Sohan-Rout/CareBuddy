import React from 'react';
import { FaMicrophoneAlt, FaSmileBeam, FaChartLine, FaBell, FaLock } from 'react-icons/fa';

const featuresData = [
  {
    icon: <FaMicrophoneAlt size={32} />,
    title: 'AI-Powered Voice Calls',
    description: 'CareBuddy makes regular voice calls to users, offering comforting conversations that feel human and supportive.',
  },
  {
    icon: <FaSmileBeam size={32} />,
    title: 'Mood Check-In System',
    description: 'Daily or scheduled check-ins with personalized questions help track emotional wellness over time.',
  },
  {
    icon: <FaChartLine size={32} />,
    title: 'Real-Time Sentiment Analysis',
    description: 'Using advanced AI, user responses are converted to text and analyzed to understand mood, stress, or loneliness levels.',
  },
  {
    icon: <FaBell size={32} />,
    title: 'Caregiver Alerts',
    description: 'If a user repeatedly expresses distress or statements like "I feel alone," CareBuddy instantly alerts a registered family member or caregiver via SMS or email.',
  },
  {
    icon: <FaLock size={32} />,
    title: 'Secure & Private',
    description: 'All conversations and user data are handled with full privacy and encrypted storage on secure servers.',
  },
  {
    icon: <FaSmileBeam size={32} />,
    title: 'Get Started Instantly',
    description: 'Try a sample call and see how CareBuddy connects and responds in real time with warmth and empathy.',
  },
];

const Features = () => {
  return (
    <section className="py-20 px-4 sm:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-semibold text-black mb-4">Why You’ll Love CareBuddy</h2>
        <p className="text-md text-gray-600 max-w-xl mx-auto font-medium">
          Everything you need to feel heard, cared for, and safe — in one adorable platform.
        </p>
      </div>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {featuresData.map(({ icon, title, description }, index) => (
          <div
            key={index}
            className="bg-white border border-black/25 rounded-3xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition duration-200 ease-in-out"
          >
            <div className="text-secondary bg-primary p-4 rounded-full mb-4 shadow-sm">
              {icon}
            </div>
            <h3 className="text-lg font-medium text-black mb-2">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;