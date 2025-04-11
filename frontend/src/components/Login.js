// Updated Login.js with Bootstrap styling and form layout
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        username,
        password,
      });
      sessionStorage.setItem('token', response.data.access_token);
      navigate('/dashboard');
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container d-flex vh-100 align-items-center justify-content-center bg-light">
      <div className="card shadow p-4 w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        {message && <div className="alert alert-danger text-center">{message}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Login
          </button>
          <p className="text-center">
            Don't have an account?{' '}
            <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;