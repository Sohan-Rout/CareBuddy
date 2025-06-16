import React from 'react';

const featuresData = [
  {
    icon: '🗣️',
    title: 'AI-Powered Voice Calls',
    description: 'CareBuddy makes regular voice calls to users, offering comforting conversations that feel human and supportive.',
  },
  {
    icon: '😊',
    title: 'Mood Check-In System',
    description: 'Daily or scheduled check-ins with personalized questions help track emotional wellness over time.',
  },
  {
    icon: '📝',
    title: 'Real-Time Sentiment Analysis',
    description: 'Using advanced AI, user responses are converted to text and analyzed to understand mood, stress, or loneliness levels.',
  },
  {
    icon: '🚨',
    title: 'Caregiver Alerts',
    description: 'If a user repeatedly expresses distress or statements like "I feel alone," CareBuddy instantly alerts a registered family member or caregiver via SMS or email.',
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    description: 'All conversations and user data are handled with full privacy and encrypted storage on secure servers.',
  },
];

const Features = () => {
  return (
    <section className="relative px-8 py-16 max-w-full mx-auto overflow-hidden">
      {/* 5 Black Concentric Circles SVG - Figma style, mostly outside top left */}
      <svg
        className="absolute -top-8 -left-8 z-0"
        width="350"
        height="350"
        viewBox="0 0 350 350"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ pointerEvents: 'none' }}
      >
        <circle cx="80" cy="80" r="40" stroke="black" strokeWidth="3" fill="none" />
        <circle cx="80" cy="80" r="70" stroke="black" strokeWidth="3" fill="none" />
        <circle cx="80" cy="80" r="100" stroke="black" strokeWidth="3" fill="none" />
        <circle cx="80" cy="80" r="130" stroke="black" strokeWidth="3" fill="none" />
        <circle cx="80" cy="80" r="160" stroke="black" strokeWidth="3" fill="none" />
      </svg>
      <h2 className="text-center font-poppins font-bold text-3xl mb-2 text-black tracking-wide relative z-10">Features</h2>
      <p className="text-center mb-10 text-black text-lg font-poppins tracking-wide relative z-10">These Features Are Just the Beginning.</p>
      <div className="flex flex-col items-center relative z-10">
        <div className="flex flex-row gap-12 mb-4">
          {featuresData.slice(0, 3).map(({ icon, title, description }, index) => (
            <div
              key={index}
              className="bg-[#eaff8b] rounded-2xl p-8 w-[370px] shadow-[0_4px_24px_rgba(0,0,0,0.15)] text-center flex flex-col gap-3 border-[2.5px] border-[#222] font-poppins transition-transform duration-200 hover:scale-105"
            >
              <span className="text-4xl mb-2">{icon}</span>
              <h3 className="font-bold text-xl text-black mb-1 tracking-wide">{title}</h3>
              <p className="text-[#a1b34c] text-base font-normal leading-snug">{description}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-12">
          {featuresData.slice(3).map(({ icon, title, description }, index) => (
            <div
              key={index}
              className="bg-[#eaff8b] rounded-2xl p-8 w-[370px] shadow-[0_4px_24px_rgba(0,0,0,0.15)] text-center flex flex-col gap-3 border-[2.5px] border-[#222] font-poppins transition-transform duration-200 hover:scale-105"
            >
              <span className="text-4xl mb-2">{icon}</span>
              <h3 className="font-bold text-xl text-black mb-1 tracking-wide">{title}</h3>
              <p className="text-[#a1b34c] text-base font-normal leading-snug">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
                                                                                                                                                                                      