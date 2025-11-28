import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { username, password })
      .then(res => {
        const user = res.data;
        localStorage.setItem('username', user.username);
        localStorage.setItem('role', user.role);
        window.location.assign('/');
      })
      .catch(err => {
        if (err.response) {
          if (typeof err.response.data === "object" && err.response.data.message) {
            setError(err.response.data.message);
          } else {
            setError("Invalid username or password!");
          }
        } else {
          setError("Server unreachable!");
        }
      });
  };

  return (
    <div className="form-viewport">
      <div className="form-card">
        <div className="auth-hero">
          <div className="auth-illustration">🔒</div>
          <h2 className="form-title">Welcome back</h2>
          <p className="auth-sub">Sign in to access your account, manage listings, view orders, and purchase original artworks.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" aria-label="login-form">
          <label className="label">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          {error && <div className="alert alert-danger">{error}</div>}

          <button className="btn btn-primary w-100" type="submit">Sign in</button>

          <p className="muted centered">
            Don't have an account? <a href="/register">Register</a>
          </p>

          <p className="auth-tip centered">Tip: Use your registered username. Sellers and admins will see additional options after signing in.</p>
        </form>
      </div>
    </div>
  );
}
