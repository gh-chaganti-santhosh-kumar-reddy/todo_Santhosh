import axios from 'axios';
import { getToken } from './authToken';

// Use .env for API base URL so mobile and desktop both work
const API = process.env.REACT_APP_API_URL || (window.location.protocol === 'https:'
  ? 'https://localhost:7081/api/todos'
  : 'http://localhost:5031/api/todos');

const authHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getTodos = () => axios.get(API, { headers: authHeader() });
export const addTodo = (todo) => axios.post(API, todo, { headers: authHeader() });
export const updateTodo = (id, todo) => axios.put(`${API}/${id}`, todo, { headers: authHeader() });
export const deleteTodo = (id) => axios.delete(`${API}/${id}`, { headers: authHeader() });