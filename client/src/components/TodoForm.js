import React, { useState, useEffect } from 'react';
import ConfirmDialogForm from './ConfirmDialogForm';
function formatDateTimeLocal(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  // Pad month, day, hour, minute
  const pad = n => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function TodoForm({ onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [dueDate, setDueDate] = useState(formatDateTimeLocal(initialData?.dueDate));
  const [priority, setPriority] = useState(initialData?.priority || 3);
  const [dateError, setDateError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingData, setPendingData] = useState(null);

  useEffect(() => {
    setTitle(initialData?.title || '');
    setDescription(initialData?.description || '');
    setDueDate(formatDateTimeLocal(initialData?.dueDate));
    setPriority(initialData?.priority || 3);
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    if (!title.trim()) {
      setTitleError('Title is required.');
      valid = false;
    } else {
      setTitleError('');
    }
    if (!dueDate) {
      setDateError('Due date and time are required.');
      valid = false;
    } else {
      const selected = new Date(dueDate);
      const now = new Date();
      if (selected <= now) {
        setDateError('Due date and time must be in the future.');
        valid = false;
      } else {
        setDateError('');
      }
    }
    if (!valid) return;
    setPendingData({ ...initialData, title, description, dueDate, priority });
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    onSubmit(pendingData);
    setConfirmOpen(false);
    setPendingData(null);
    if (!initialData) {
      setTitle(''); setDescription(''); setDueDate(''); setPriority(3);
    }
  };
  const handleCancelConfirm = () => {
    setConfirmOpen(false);
    setPendingData(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Title" />
        {titleError && <div style={{color:'#dc2626', marginBottom:'6px'}}>{titleError}</div>}
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={2} />
        <div style={{position:'relative',marginBottom:'8px'}}>
          <input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required placeholder="YYYY-MM-DDThh:mm" style={{width:'100%',padding:'8px',border:'1px solid #c7d2fe',boxSizing:'border-box',background:'#f1f5f9',borderRadius:'6px'}} />
          <span style={{position:'absolute',right:'44px',top:'50%',transform:'translateY(-50%)',color:'#6366f1',fontWeight:500,fontSize:'0.97em',pointerEvents:'none',background:'#f1f5f9',padding:'0 4px'}}>Due Date</span>
        </div>
        {dateError && <div style={{color:'#dc2626', marginBottom:'6px'}}>{dateError}</div>}
        <select value={priority} onChange={(e) => setPriority(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map(p => <option key={p} value={p}>Priority {p}</option>)}
        </select>
        <button type="submit">{initialData ? 'Save Changes' : 'Add Task'}</button>
        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              marginLeft: '10px',
              background: '#fff',
              color: '#dc2626',
              border: '1.5px solid #dc2626',
              borderRadius: 6,
              padding: '10px 22px',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseOver={e => {
              e.target.style.background = '#fee2e2';
              e.target.style.color = '#b91c1c';
            }}
            onMouseOut={e => {
              e.target.style.background = '#fff';
              e.target.style.color = '#dc2626';
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <ConfirmDialogForm
        open={confirmOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancelConfirm}
        message={initialData ? 'Are you sure you want to save changes to this task?' : 'Are you sure you want to add this task?'}
      />
    </>
  );
}
export default TodoForm;