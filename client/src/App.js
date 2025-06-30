import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import { getTodos, addTodo, updateTodo, deleteTodo } from './api';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { AuthProvider, useAuth } from './AuthContext';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import TodoDetail from './components/TodoDetail';

function Home({ todos, setTodos }) {
  const { token, logout } = useAuth();
  const [error, setError] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dueDateFilter, setDueDateFilter] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const location = window.location;

  useEffect(() => {
    if (token) {
      getTodos()
        .then(res => {
          setTodos(res.data);
          setError(null);
        })
        .catch(() => setError('Failed to load todos. Please check your connection or try again later.'));
    } else {
      setTodos([]);
    }
  }, [token, setTodos]);

  const handleAdd = (todo) => {
    if (!token) {
      setError('You must be logged in to add a todo.');
      return;
    }
    addTodo(todo)
      .then(res => {
        setTodos([...todos, res.data]);
        setError(null);
      })
      .catch(() => setError('Failed to add todo.'));
  };

  const handleEdit = (todo) => setEditingTodo(todo);
  const handleEditSave = (updatedTodo) => {
    if (!token) {
      setError('You must be logged in to edit a todo.');
      return;
    }
    updateTodo(updatedTodo.id, updatedTodo)
      .then(() => {
        setTodos(todos.map(t => t.id === updatedTodo.id ? updatedTodo : t));
        setEditingTodo(null);
        setError(null);
      })
      .catch(() => setError('Failed to update todo.'));
  };
  const handleEditCancel = () => setEditingTodo(null);
  const handleToggle = (todo) => {
    if (!token) {
      setError('You must be logged in to complete a todo.');
      return;
    }
    const updated = { ...todo, isCompleted: !todo.isCompleted };
    updateTodo(todo.id, updated)
      .then(() => {
        setTodos(todos.map(t => t.id === todo.id ? updated : t));
        setError(null);
      })
      .catch(() => setError('Failed to update todo.'));
  };
  const handleDelete = (id) => {
    if (!token) {
      setError('You must be logged in to delete a todo.');
      return;
    }
    deleteTodo(id)
      .then(() => {
        setTodos(todos.filter(t => t.id !== id));
        setError(null);
      })
      .catch(() => setError('Failed to delete todo.'));
  };
  const filteredTodos = todos.filter(todo => {
    let statusMatch = statusFilter === 'all' ? true : statusFilter === 'completed' ? todo.isCompleted : !todo.isCompleted;
    let dueDateMatch = dueDateFilter ? (todo.dueDate && todo.dueDate.slice(0, 10) === dueDateFilter) : true;
    return statusMatch && dueDateMatch;
  });

  // Redirect /register to /
  if (location.pathname === '/register') {
    window.history.replaceState({}, '', '/');
  }

  return (
    <div className="app-container">
      <h1>Todo App</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
        {token ? <button onClick={logout} style={{padding:'8px 18px',fontWeight:600,marginRight:8}}>Logout</button> :
          <button onClick={()=>{setShowLogin(true);setShowRegister(false);}} style={{padding:'8px 18px',fontWeight:600,marginRight:8,cursor:'pointer'}}>Login</button>
        }
      </div>
      {error && <div style={{color: '#dc2626', background: '#fee2e2', padding: '10px', borderRadius: '6px', marginBottom: '16px'}}>{error}</div>}
      <div style={{display:'flex', gap:'10px', marginBottom:'18px', flexWrap:'wrap'}}>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
        <input type="date" value={dueDateFilter} onChange={e => setDueDateFilter(e.target.value)} placeholder="Filter by due date" />
      </div>
      {editingTodo ? (
        <TodoForm initialData={editingTodo} onSubmit={handleEditSave} onCancel={handleEditCancel} />
      ) : (
        <TodoForm onSubmit={handleAdd} />
      )}
      <TodoList todos={filteredTodos} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} showDetailsLink />
      {showLogin && (
        <div className="auth-modal-bg" onClick={()=>setShowLogin(false)}>
          <div className="auth-modal-content" onClick={e=>e.stopPropagation()}>
            <button className="auth-modal-close" onClick={()=>setShowLogin(false)} title="Close">×</button>
            <Login onSuccess={()=>setShowLogin(false)} onShowRegister={() => {setShowLogin(false);setShowRegister(true);}} />
          </div>
        </div>
      )}
      {showRegister && (
        <div className="auth-modal-bg" onClick={()=>setShowRegister(false)}>
          <div className="auth-modal-content" onClick={e=>e.stopPropagation()}>
            <button className="auth-modal-close" onClick={()=>setShowRegister(false)} title="Close">×</button>
            <Register onSuccess={()=>{setShowRegister(false);setShowLogin(true);}} />
          </div>
        </div>
      )}
    </div>
  );
}

function TodoDetailWrapper({ todos }) {
  const { id } = useParams();
  const [todo, setTodo] = useState(() => todos.find(t => String(t.id) === String(id)));
  const [loading, setLoading] = useState(!todo);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!todo) {
      fetch(`/api/todos/${id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
        .then(res => {
          if (!res.ok) throw new Error('Not found');
          return res.json();
        })
        .then(data => {
          setTodo(data);
          setLoading(false);
        })
        .catch(() => {
          setError('Task not found.');
          setLoading(false);
        });
    }
  }, [id, todo]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return <TodoDetail todo={todo} />;
}

export default function App() {
  const [todos, setTodos] = useState([]);
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home todos={todos} setTodos={setTodos} />} />
          <Route path="/task/:id" element={<TodoDetailWrapper todos={todos} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}