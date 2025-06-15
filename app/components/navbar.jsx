import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Brand */}
      <div className="font-bold text-xl text-gray-800">
        CareBuddy
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6 items-center">
        <a href="#home" className="text-gray-700 font-medium hover:text-blue-600 transition">Home</a>
        <a href="#features" className="text-gray-700 font-medium hover:text-blue-600 transition">Features</a>
        <a href="#about" className="text-gray-700 font-medium hover:text-blue-600 transition">About</a>
        <a href="#contact" className="text-gray-700 font-medium hover:text-blue-600 transition">Contact</a>
      </div>

      {/* Auth Buttons */}
      <div className="flex gap-3">
        <a href="/auth" className="px-4 py-2 border border-gray-800 rounded-md text-gray-800 font-medium hover:bg-gray-100 transition">
          Login
        </a>
        <a href="/auth" className="px-4 py-2 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-700 transition">
          Signup
        </a>
      </div>
    </nav>
  );
};

export default Navbar;