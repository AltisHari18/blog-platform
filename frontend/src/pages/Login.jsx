import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

export default function Login() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await API.post('/auth/login', form);
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email}
              onChange={handleChange} required placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={form.password}
              onChange={handleChange} required placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-primary btn-full">Login</button>
        </form>
        <p className="auth-footer">No account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}