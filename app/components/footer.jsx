const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-6 px-4 font-poppins">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-y-10">
        {/* Logo + Description + Contact */}
        <div className="md:w-1/2 pr-10">
          <h3 className="text-xl font-bold mb-2 tracking-tight">
            <span className="text-white">Care</span>
            <span className="text-secondary">Buddy</span>
          </h3>

          <p className="mb-3 leading-relaxed text-sm tracking-tight">
            Your AI-powered mental wellness<br />
            companion. Supporting emotional<br />
            well-being with compassionate<br />
            voice technology.
          </p>

          <div className="text-sm space-y-1">
            <h4 className="text-white mb-2 font-medium tracking-tight">Contact</h4>
            <p>Email: support@carebuddy.ai</p>
            <p>Phone: +91 98765 xxxxx</p>
            <p>Location: New Delhi, India</p>
          </div>
        </div>

        {/* Link Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-12 md:w-1/2">
          {/* Connect */}
          <div>
            <h4 className="text-white mb-2 font-medium tracking-tight">Connect</h4>
            <ul className="space-y-1 text-sm tracking-tight">
              <li><a href="#instagram" className="hover:underline">Instagram</a></li>
              <li><a href="#facebook" className="hover:underline">Facebook</a></li>
              <li><a href="#linkedin" className="hover:underline">LinkedIn</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white mb-2 font-medium tracking-tight">Legal</h4>
            <ul className="space-y-1 text-sm tracking-tight">
              <li><a href="#terms" className="hover:underline">Terms Of Services</a></li>
              <li><a href="#privacy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#cookies" className="hover:underline">Cookies</a></li>
              <li><a href="#docs" className="hover:underline">Documentation</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-2 font-medium tracking-tight">Quick Links</h4>
            <ul className="space-y-1 text-sm tracking-tight">
              <li><a href="#features" className="hover:underline">Features</a></li>
              <li><a href="#about" className="hover:underline">About Us</a></li>
              <li><a href="#contact" className="hover:underline">Contact Us</a></li>
              <li><a href="#reviews" className="hover:underline">Reviews</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm text-gray-500 mt-8">
        © 2025 CareBuddy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
