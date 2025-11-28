import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '', role: 'BUYER' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, form)
      .then(() => {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => window.location.assign('/login'), 2000);
      })
      .catch(err => {
        if (err.response && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Registration failed!");
        }
      });
  };

  return (
    <div className="form-viewport">
      <div className="form-card">
        <div className="auth-hero">
          <div className="auth-illustration">✨</div>
          <h2 className="form-title">Create account</h2>
          <p className="auth-sub">Create a free account to buy and sell original artworks. Choose 'Seller' to list works or 'Buyer' to shop.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" aria-label="register-form">
          <label className="label">Username</label>
          <input
            className="form-control"
            placeholder="Username"
            value={form.username}
            onChange={e => setForm({...form, username: e.target.value})}
            required
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
            required
          />

          <label className="label">Account type</label>
          <select
            className="form-control"
            value={form.role}
            onChange={e => setForm({...form, role: e.target.value})}
          >
            <option value="BUYER">Buyer</option>
            <option value="SELLER">Seller</option>
            {/* <option value="ADMIN">Admin</option> */}
          </select>

          <div className="auth-roles">Roles: <span className="muted">Buyer</span> — browse & purchase; <b>Seller</b> — create listings and manage your art; <span className="muted">Admin</span> — site management.</div>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <button className="btn btn-success w-100" type="submit">Create account</button>

          <p className="muted centered">
            Already have an account? <a href="/login">Login</a>
          </p>

          <p className="auth-note centered">By creating an account you agree to our Terms and Privacy Policy.</p>
        </form>
      </div>
    </div>
  );
}
