'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  { question: 'How does CareBuddy detect mood or emotional state?', answer: 'CareBuddy uses advanced AI to analyze voice and text inputs to detect mood and emotional state.' },
  { question: 'Who gets notified if something feels wrong?', answer: 'Registered family members or caregivers receive alerts via SMS or email if distress is detected.' },
  { question: "Is the user's data private and secure?", answer: 'Yes, all data is encrypted and stored securely with full privacy protections.' },
  { question: 'How often does CareBuddy call?', answer: 'CareBuddy can make daily or scheduled calls based on user preferences.' },
  { question: 'Can it support multiple languages?', answer: 'Currently, CareBuddy supports English, with plans to add more languages soon.' },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="relative w-full flex justify-center items-center min-h-[600px] sm:min-h-[800px] py-8 sm:py-12 overflow-hidden"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <svg
        className="absolute bottom-0.5 z-0 hidden sm:block"
        width="500"
        height="390"
        viewBox="0 0 500 390"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          pointerEvents: 'none',
          left: '430',
          position: 'absolute',
        }}
      >
        <circle cx="80" cy="180" r="100" stroke="black" strokeWidth="3" fill="none" />
        <circle cx="80" cy="180" r="75" stroke="black" strokeWidth="3" fill="none" />
        <circle cx="80" cy="180" r="50" stroke="black" strokeWidth="3" fill="none" />
        <circle cx="80" cy="180" r="25" stroke="black" strokeWidth="3" fill="none" />
        <circle cx="80" cy="180" r="8" stroke="black" strokeWidth="3" fill="none" />
      </svg>

      <div className="relative flex flex-col sm:flex-row items-center justify-center w-full max-w-4xl px-4 sm:px-0" style={{minHeight: 700}}>
        <div className="relative z-10 flex items-center justify-center h-full mb-8 sm:mb-0" style={{width: 180, minWidth: 180}}>
          <div
            className="absolute top-1/2 -translate-y-1/4 overflow-hidden h-[220px] w-[350px] flex items-end"
            style={{
              clipPath: 'inset(0 0 45% 0)',
              left: '170px',
              position: 'absolute',
            }}
          >
            <Image
              src="/logo.png"
              alt="Pear Logo"
              width={220}
              height={270}
              style={{objectFit: 'contain'}}
              priority
            />
          </div>
        </div>

        <div className="relative z-20 flex-1 flex flex-col items-center">
          <h2 className="font-bold text-2xl sm:text-3xl mb-6 text-black tracking-wide text-center" style={{fontFamily: 'Poppins, sans-serif'}}>FAQ&apos;s</h2>
          <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-2xl">
            {faqData.map(({ question, answer }, index) => (
              <div
                key={index}
                className="rounded-2xl border-[2.5px] border-black p-4 sm:p-6 bg-white cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.13)] text-lg sm:text-xl transition-transform duration-200 hover:scale-[1.01] w-full"
                onClick={() => toggleIndex(index)}
                style={{fontFamily: 'Poppins, sans-serif'}}
              >
                <div className="flex justify-between items-center font-semibold">
                  <span>{question}</span>
                  <span className="text-xl sm:text-2xl">
                    {openIndex === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </span>
                </div>
                {openIndex === index && (
                  <p className="mt-2 text-gray-700 text-base sm:text-lg font-normal">{answer}</p>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-10 text-black text-base sm:text-lg font-poppins">
            <p className="mb-2">Can&apos;t Find Your Answers</p>
            <button
              className="bg-[#eaff8b] border-[2px] border-black rounded-full px-6 sm:px-8 py-2 cursor-pointer font-semibold shadow-md text-black hover:bg-[#eaff8b]/90 transition"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
