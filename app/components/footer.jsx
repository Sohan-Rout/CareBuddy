const contact = [
  "Email: support@carebuddy.ai", "Phone: +91 98765 XXXX", "Location: New Delhi, India",
];

const linkSection = [
  {
    title: "Connect",
    links: [
      { linkName: "Instagram", link: "#instagram" },
      { linkName: "Facebook", link: "#facebook" },
      { linkName: "LinkedIn", link: "#linkedin" },
    ],
  },

  {
    title : "Legal",
    links : [
      { linkName : "Terms Of Services", link : "#terms" },
      { linkName : "Privacy Policy", link : "#privacy" },
      { linkName : "Cookie policy", link : "#cookies"},
      { linkName : "Documentation", link : "#documentation"},
    ]
  },

  {
    title : "Quick Links",
    links : [
      { linkName : "Features", link : "#features" },
      { linkName : "About Us", link : "#aboutus" },
      { linkName : "Contact Us", link : "#contact"},
      { linkName : "Reviews", link : "#reviews"},
    ]
  },
];

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-6 px-4 font-poppins">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-y-10">
        {/* Logo + Description + Contact */}
        <div className="md:w-1/2 pr-10">
          <h3 className="text-3xl font-bold mb-2 tracking-tight">
            <span className="text-white">Care</span>
            <span className="text-secondary">Buddy</span>
          </h3>

          <p className="mb-5 leading-relaxed text-gray-400">
            Your AI-powered mental wellness<br />
            companion. Supporting emotional<br />
            well-being with compassionate<br />
            voice technology.
          </p>

          <div className="space-y-1">
            <h4 className="text-white text-xl mb-2 font-semibold">Contact</h4>
            <ul className="text-gray-400">
              {contact.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

          {linkSection.map((section, index) => (
            <div key={index}>
              <h4 className="text-white mb-2 font-semibold text-xl">{section.title}</h4>
              <ul className="space-y-1">
                {section.links.map((linkItem, i) => (
                  <li key={i}>
                    <a href={linkItem.link} className="hover:text-primary text-gray-400">{linkItem.linkName}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm text-gray-500 border border-t-gray-700 border-transparent mt-8">
        <div className="mt-4">
        <span>© 2025 CareBuddy. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
