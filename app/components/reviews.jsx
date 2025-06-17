"use client";
import React from "react";

const reviews = [
  {
    name: "Aarav Mehta",
    username: "@aaravm",
    feedback: "CareBuddy has completely changed the way I manage my emotions. The daily check-ins are a blessing!",
    stars: "5.0",
  },
  {
    name: "Diya Patel",
    username: "@diyap",
    feedback: "I love how soothing the voice assistant is. It helps me feel calm during anxious moments.",
    stars: "4.8",
  },
  {
    name: "Rohan Kumar",
    username: "@rohan_k",
    feedback: "The UI is clean and the features are easy to use. Would love to see mood tracking graphs too!",
    stars: "4.2",
  },
  {
    name: "Sneha Roy",
    username: "@snehar",
    feedback: "Helpful app with thoughtful prompts. It’s like a personal emotional journal. ❤️",
    stars: "4.9",
  },
  {
    name: "Kabir Singh",
    username: "@kabir_s",
    feedback: "Sometimes it lags a little, but overall it's a solid app for mental well-being.",
    stars: "3.9",
  },
  {
    name: "Tanya Verma",
    username: "@tanyav",
    feedback: "The calming background sounds and reflection features are amazing. Great work team!",
    stars: "4.7",
  },
  {
    name: "Aditya Nair",
    username: "@adi.nair",
    feedback: "It keeps me grounded when days get overwhelming. I recommend it to my friends often.",
    stars: "5.0",
  },
  {
    name: "Isha Malhotra",
    username: "@isha_mentalpeace",
    feedback: "Not just a mental health app it feels like a quiet companion. Love the design too!",
    stars: "4.6",
  },
  {
    name: "Nikhil Desai",
    username: "@nik.d",
    feedback: "Would like to see integration with fitness data, but otherwise it’s a brilliant tool.",
    stars: "4.3",
  }
];

const Reviews = () => {
  const [visibleCount, setVisibleCount] = React.useState(3);
  const [expandedIndex, setExpandedIndex] = React.useState(null);


  return (
    <section className="py-16 px-4 bg-white flex justify-center items-center text-black font-poppin relative overflow-hidden max-w-6xl mx-auto">
      <main className="justify-center w-full">
        {/* Logo in bottom-left with deeper overlap and blend */}
        <div className="absolute -bottom-32 left-0 z-5 hidden md:block">
          <img
            src="/logo.png"
            alt="CareBuddy Logo"
            className="w-80 h-auto opacity-90 mix-blend-multiply pointer-events-none"
          />
        </div>

        {/* Header */}
        <div className="max-w-6xl font-poppins mx-auto text-center mb-10 relative z-20">
          <h2 className="text-3xl font-poppins font-medium mb-2">Reviews</h2>
          <p className="text-gray-600 text-lg">What Users Think About us</p>
        </div>

        <div className="relative z-1 flex justify-center">
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mb-14 mx-auto">
              {reviews.slice(0, visibleCount).map((item, index) => (
                <div
                  key={index}
                  className="border bg-white border-black/15 p-5 shadow-xl rounded-xl cursor-pointer transition-all duration-300"
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                >
                  <div className="flex flex-row gap-2">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-center mx-auto">{item.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="">{item.name}</span>
                      <span className="text-secondary">{item.username}</span>
                    </div>
                  </div>
                  <div className="h-[1px] w-full mt-2 mb-2 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300"></div>
                  <div className="text-gray-600">
                    <p>
                      {(typeof window !== "undefined" && window.innerWidth < 768
                        ? expandedIndex === index
                        : visibleCount === 3 || expandedIndex === index)
                        ? item.feedback
                        : `${item.feedback.slice(0, 80)}...`}
                    </p>
                  </div>
                  <div className="h-[1px] w-full mt-2 mb-2 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300"></div>
                  <div>
                    {true && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedIndex(expandedIndex === index ? null : index);
                        }}
                        className="text-sm text-secondary"
                      >
                        {expandedIndex === index ? "Show less" : "Show more"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-5 mb-10 relative z-1">
          <button
            onClick={() =>
              setVisibleCount(
                visibleCount === reviews.length ? 3 : reviews.length
              )
            }
            className="bg-primary shadow-lg text-black py-2 px-6 rounded-2xl font-medium border border-black hover:scale-105 transition-transform"
          >
            {visibleCount === reviews.length ? "Show Less" : "Load More"}
          </button>
        </div>
      </main>
    </section>
  );
};

export default Reviews;
