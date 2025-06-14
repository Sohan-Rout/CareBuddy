import React from 'react';

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#eaeaea' }}>
      <div style={{ fontWeight: 'bold' }}>CareBuddy</div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <a href="#home" style={{ textDecoration: 'none' }}>Home</a>
        <a href="#features" style={{ textDecoration: 'none' }}>Features</a>
        <a href="#contact" style={{ textDecoration: 'none' }}>Contact</a>
        <a href="/auth" style={{ textDecoration: 'none' }}>Login</a>
        <a href="/auth" style={{ textDecoration: 'none' }}>Signup</a>
      </div>
    </nav>
  );
};

export default Navbar;