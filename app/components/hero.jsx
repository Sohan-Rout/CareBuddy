const Hero = () => {
  return (
    <section className="max-w-6xl mx-auto flex flex-col justify-center items-center">
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-white">
        {/* LEFT SIDE */}
        <div className="md:w-1/2 text-center md:text-left space-y-6 pl-12">
          <h1 className="text-4xl font-medium text-black">
            "Talk to CareBuddy – Your Voice Companion for Better Mental Health"
          </h1>

          <div className="flex justify-center md:justify-start gap-4">
            <button className="bg-[#eef26c] text-lg px-6 py-3 rounded-3xl font-medium shadow-xl hover:shadow-lg hover:scale-105 transition duration-200 ease-in-out">
              Get Started
            </button>
            <button className="bg-white text-lg px-6 py-3 rounded-3xl font-medium shadow-xl hover:shadow-lg hover:scale-105 transition duration-200 ease-in-out">
              Features
            </button>
          </div>

          <div className="text-gray-600">
            <div className="text-amber-400 text-2xl">★★★★</div>
            <p className="font-medium">Rated 4.5 stars</p>
            <p className="text-sm">Over 1000+ Users</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="/logo.png"
            alt="CareBuddy Logo"
            className="w-auto h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
