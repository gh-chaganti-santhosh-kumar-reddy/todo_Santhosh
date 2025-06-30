import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ onSuccess }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorList, setErrorList] = useState([]);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrorList([]);
    setSuccess(false);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      if (!res.ok) {
        let msg = 'Registration failed';
        let errors = [];
        try {
          const data = await res.json();
          if (Array.isArray(data)) {
            errors = data.map(e => e.description || JSON.stringify(e));
            msg = errors[0] || msg;
          } else if (data && data.description) {
            msg = data.description;
            errors = [msg];
          }
        } catch {}
        setErrorList(errors);
        throw new Error(msg);
      }
      setSuccess(true);
      setTimeout(() => navigate('/'), 1200);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form-container">
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      {errorList.length > 1 && (
        <ul className="error" style={{marginBottom:8}}>
          {errorList.map((e, i) => <li key={i}>{e}</li>)}
        </ul>
      )}
      {success && <div className="success">Registration successful! Redirecting to login...</div>}
      <div>
        <label>Username</label>
        <input value={username} onChange={e => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Register</button>
      <div style={{marginTop:8, textAlign:'center'}}>
        <span>Already have an account? </span>
        <button type="button" style={{background:'#fff', color:'#2563eb', border:'none', textDecoration:'underline', width:'auto', marginLeft:4, cursor:'pointer'}} onClick={() => { onSuccess && onSuccess(); }}>Login</button>
      </div>
    </form>
  );
}

export default Register;
