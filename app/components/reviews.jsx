import React from "react";

const reviews = [
  {
    name: "Name",
    username: "@namme123",
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel justo aliquet, semper neque id, aliquet tortor.",
  },
  {
    name: "Name",
    username: "@name",
    feedback:
      "Great app! Helped me manage stress better. The voice interaction is super calming.",
  },
  {
    name: "Name",
    username: "@name_22",
    feedback:
      "Clean interface and simple to use. Perfect for people who need regular emotional check-ins.",
  },
  
];

const Reviews = () => {
  return (
    <section className="py-16 px-4 bg-white text-black font-poppins relative overflow-hidden">
      {/* ✅ Logo in bottom-left with deeper overlap and blend */}
      <div className="absolute -bottom-32 left-0 z-10">
        <img
          src="/logo.png"
          alt="CareBuddy Logo"
          className="w-80 h-auto opacity-90 mix-blend-multiply pointer-events-none"
        />
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12 relative z-20">
        <h2 className="text-3xl font-semibold mb-2">Reviews</h2>
        <p className="text-gray-600">What Users Think About us</p>
      </div>

      {/* Review Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-12 max-w-4xl mx-auto relative z-20">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="bg-white border border-black/80 shadow-[0_4px_12px_rgba(0,0,0,0.7)] rounded-xl p-7 h-45 flex flex-col justify-start items-start transition duration-300 hover:shadow-lg"
          >
            {/* Avatar */}
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold text-sm mb-2">
              {r.name.charAt(0).toUpperCase()}
            </div>

            {/* Name and Username */}
            <h4 className="text-sm font-semibold">{r.name}</h4>
            <p className="text-xs text-gray-500 mb-2">{r.username}</p>

            {/* Feedback */}
            <p className="text-sm text-gray-700 leading-relaxed overflow-hidden">
              {r.feedback}
            </p>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-10 relative z-20">
        <button className="bg-primary text-black py-2 px-6 rounded-2xl font-medium border border-black shadow hover:scale-105 transition-transform">
          Load More
        </button>
      </div>
    </section>
  );
};

export default Reviews;
