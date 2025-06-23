import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaUserFriends } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 py-16 sm:py-24 max-w-6xl mx-auto">
      {/* LEFT CONTENT */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-smedium text-black leading-tight">
          <span className="block">"Meet CareBuddy</span>
          <span className="block">Your Voice Companion for Better Mental Health"</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-700">
          Let your emotions speak — we’re here to listen, support, and help you feel better every day.
        </p>
        <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
          <Link href='/auth' className="bg-primary text-black px-6 py-3 rounded-full border border-black font-medium hover:opacity-90 transition">
            Get Started
          </Link>
          <a
            href="./demoImg/record-1750670738995.mp3"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-6 py-3 rounded-full border border-black font-medium hover:opacity-90 transition"
          >
            Hear Demo Call
          </a>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-black font-medium pt-2">
          <div className="flex items-center gap-2">
            <FaStar className="text-amber-500" />
            <p>Rated 4.5 stars</p>
          </div>
          <div className="flex items-center gap-2">
            <FaUserFriends className="text-gray-700" />
            <p>Over 1000+ Users</p>
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src="/logo.png"
          alt="CareBuddy Logo"
          width={600}
          height={600}
          priority
          className="object-contain"
        />
      </div>
    </section>
  );
};

export default Hero;