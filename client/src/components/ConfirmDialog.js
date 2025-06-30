import React from 'react';

export default function ConfirmDialog({ open, onConfirm, onCancel, message }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
      cursor: 'pointer'
    }}>
      <div style={{background:'#fff',padding:32,borderRadius:12,boxShadow:'0 2px 16px #6366f1',minWidth:320, cursor: 'default'}} onClick={e => e.stopPropagation()}>
        <div style={{marginBottom:20, fontSize:'1.1rem'}}>{message || 'Are you sure?'}</div>
        <div style={{display:'flex',justifyContent:'flex-end',gap:12}}>
          <button onClick={onCancel} style={{background:'#e5e7eb',color:'#1e293b',padding:'8px 18px',borderRadius:6,border:'none', cursor:'pointer'}}>Cancel</button>
          <button onClick={onConfirm} style={{background:'#dc2626',color:'#fff',padding:'8px 18px',borderRadius:6,border:'none', cursor:'pointer'}}>Delete</button>
        </div>
      </div>
    </div>
  );
}
