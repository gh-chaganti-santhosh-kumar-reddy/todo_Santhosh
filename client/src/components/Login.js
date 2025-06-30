import React, { useState } from 'react';
import PasswordInput from './PasswordInput';
import { useAuth } from '../AuthContext';

function Login({ onSuccess, onShowRegister }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      login(data.token);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <div>
        <label>Username</label>
        <input value={username} onChange={e => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <PasswordInput value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" name="password" required />
      </div>
      <button type="submit">Login</button>
      <div style={{marginTop:8, textAlign:'center'}}>
        <span>Don't have an account? </span>
        <button type="button" style={{background:'#fff', color:'#2563eb', border:'none', textDecoration:'underline', width:'auto', marginLeft:4}} onClick={onShowRegister}>Register</button>
      </div>
    </form>
  );
}

export default Login;
