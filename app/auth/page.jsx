'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

const handleLogin = async () => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) setMessage(error.message);
  else {
    setMessage('Logged in!');
    router.push('/dashboard'); // Redirect after login
  }
};

const handleSignup = async () => {
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) setMessage(error.message);
  else {
    setMessage('Signup successful! Redirecting...');
    setTimeout(() => {
      router.push('/dashboard'); // Redirect after signup
    }, 1500); // wait a bit so user can read message
  }
};
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login / Signup</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={{ margin: '0.5rem' }}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: '0.5rem' }}
      />
      <br />
      <button onClick={handleLogin} style={{ marginRight: '1rem' }}>Login</button>
      <button onClick={handleSignup}>Signup</button>
      <p>{message}</p>
    </div>
  );
}