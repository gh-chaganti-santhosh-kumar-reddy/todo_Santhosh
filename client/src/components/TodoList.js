import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from './ConfirmDialog';
function TodoList({ todos, onToggle, onDelete, onEdit, showDetailsLink }) {
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Sort todos by priority (higher value = higher priority)
  const sortedTodos = [...todos].sort((a, b) => b.priority - a.priority);

  // Progress bar calculation
  const completedCount = todos.filter(t => t.isCompleted).length;
  const totalCount = todos.length;
  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  // Status icon helper
  const getStatusIcon = (todo) => {
    if (todo.isCompleted) return <span title="Completed" style={{color: 'green', fontSize: '1.2em'}}>✅</span>;
    const dueDate = new Date(todo.dueDate);
    const now = new Date();
    if (dueDate < now) return <span title="Overdue" style={{color: 'red', fontSize: '1.2em'}}>⏰</span>;
    return <span title="Pending" style={{color: '#f59e42', fontSize: '1.2em'}}>🕒</span>;
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };
  const handleConfirm = () => {
    onDelete(deleteId);
    setConfirmOpen(false);
    setDeleteId(null);
  };
  const handleCancel = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };

  return (
    <>
      {/* Progress Bar */}
      <div style={{ margin: '16px 0', padding: '4px 0' }}>
        <div style={{ fontSize: '0.95em', marginBottom: 4 }}>Progress: {progress}%</div>
        <div style={{ background: '#e5e7eb', borderRadius: 6, height: 12, width: '100%' }}>
          <div style={{ width: `${progress}%`, background: '#6366f1', height: '100%', borderRadius: 6, transition: 'width 0.3s' }}></div>
        </div>
      </div>
      <ul>
        {sortedTodos.map(todo => (
          <li key={todo.id} className={todo.isCompleted ? 'completed' : ''} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            {/* Status Icon */}
            <span style={{ marginRight: 8 }}>{getStatusIcon(todo)}</span>
            <div style={{ flex: 1 }}>
              {showDetailsLink ? (
                <span style={{cursor:'pointer',color:'#6366f1',textDecoration:'underline'}} onClick={() => navigate(`/task/${todo.id}`)}>
                  <strong>{todo.title}</strong>
                </span>
              ) : (
                <strong>{todo.title}</strong>
              )}
              {' '} (Priority: {todo.priority})
            </div>
            <div>
              <button onClick={() => onToggle(todo)}>{todo.isCompleted ? 'Undo' : 'Complete'}</button>
              <button onClick={() => onEdit(todo)}>Edit</button>
              <button onClick={() => handleDeleteClick(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <ConfirmDialog
        open={confirmOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message="Are you sure you want to delete this task?"
      />
    </>
  );
}
export default TodoList;