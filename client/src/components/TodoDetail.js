import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TodoDetail({ todo, onEdit }) {
  const navigate = useNavigate();
  if (!todo) return <div>Task not found.</div>;
  return (
    <div style={{background:'#fff',borderRadius:12,padding:24,boxShadow:'0 2px 12px #e0e7ff',maxWidth:500,margin:'40px auto'}}>
      <h2 style={{color:'#4f46e5'}}>{todo.title}</h2>
      <p><strong>Description:</strong> {todo.description || 'No description'}</p>
      <p><strong>Due Date:</strong> {todo.dueDate ? new Date(todo.dueDate).toLocaleString() : 'N/A'}</p>
      <p><strong>Priority:</strong> {todo.priority === 1 ? 'Low' : todo.priority === 2 ? 'Medium' : 'High'}</p>
      <p><strong>Status:</strong> {todo.isCompleted ? 'Completed' : 'Incomplete'}</p>
      <div style={{display:'flex',gap:12,marginTop:24}}>
        <button 
          style={{background:'#e5e7eb',color:'#1e293b',padding:'10px 22px',borderRadius:8,border:'none',fontWeight:600,cursor:'pointer',fontSize:'1rem'}} 
          onClick={() => navigate(-1)}>
          &larr; Back
        </button>
        <button 
          style={{background:'#6366f1',color:'#fff',padding:'10px 22px',borderRadius:8,border:'none',fontWeight:600,cursor:'pointer',fontSize:'1rem'}} 
          onClick={() => { if (onEdit) { onEdit(todo); navigate('/'); } }}>
          Edit
        </button>
      </div>
    </div>
  );
}
