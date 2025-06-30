import React from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="auth-form-container">
      <h2>Logout</h2>
      <p>Are you sure you want to logout?</p>
      <button className="logout-btn" onClick={handleLogout} style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:'6px',padding:'10px 22px',fontWeight:600,fontSize:'1rem',cursor:'pointer',transition:'background 0.2s, color 0.2s'}}>Logout</button>
    </div>
  );
}

export default Logout;
