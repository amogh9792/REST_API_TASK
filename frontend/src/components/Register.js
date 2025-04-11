// Register.js with Bootstrap styling (with username, email, and password)
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/auth/register', {
        username,
        email,
        password,
      });
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      setMessage('Registration failed. Try another username.');
    }
  };

  return (
    <div className="container d-flex vh-100 align-items-center justify-content-center bg-light">
      <div className="card shadow p-4 w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Register</h2>
        {message && <div className="alert alert-info text-center">{message}</div>}
        <form onSubmit={handleRegister}>
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
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" className="btn btn-success w-100 mb-3">
            Register
          </button>
          <p className="text-center">
            Already have an account?{' '}
            <Link to="/">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
