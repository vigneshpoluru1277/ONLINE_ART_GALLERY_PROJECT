import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();

  // Read common registration/login fields from localStorage as a best-effort
  const initial = {
    username: localStorage.getItem('username') || '',
    role: localStorage.getItem('role') || '',
    email: localStorage.getItem('email') || '',
    name: localStorage.getItem('name') || '',
    id: localStorage.getItem('id') || '',
    token: localStorage.getItem('token') || '',
    createdAt: localStorage.getItem('createdAt') || ''
  };

  const [user, setUser] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const logout = () => {
    // remove commonly used keys
    ['username', 'role', 'email', 'name', 'id', 'token', 'createdAt'].forEach(k => localStorage.removeItem(k));
    setMessage('Logged out. Redirecting to login...');
    setTimeout(() => navigate('/login'), 700);
  };

  const refreshFromServer = async () => {
    setError('');
    setMessage('');
    if (!user.username) {
      setError('No username found locally. Please login to refresh.');
      return;
    }

    setLoading(true);
    try {
      // Best-effort fetch: try common user endpoints. If your backend exposes a different
      // endpoint, update the URL accordingly.
      const base = import.meta.env.VITE_API_URL;
      // Try /api/auth/users/{username}
      const url = `${base}/api/auth/users/${encodeURIComponent(user.username)}`;
      const res = await axios.get(url);
      if (res && res.data) {
        // store a few values locally for faster display next time
        const data = res.data;
        const updated = {
          username: data.username || data.userName || user.username,
          role: data.role || user.role,
          email: data.email || user.email || '',
          name: data.name || data.fullName || user.name || '',
          id: data.id || data.userId || user.id || '',
          createdAt: data.createdAt || user.createdAt || ''
        };
        setUser(prev => ({ ...prev, ...updated }));
        // persist what we can
        Object.entries(updated).forEach(([k, v]) => { if (v) localStorage.setItem(k, v); });
        setMessage('Profile refreshed from server.');
      } else {
        setError('No profile data returned from server.');
      }
    } catch (err) {
      setError('Could not fetch profile from server.');
    } finally {
      setLoading(false);
    }
  };

  const mask = (val) => {
    if (!val) return '';
    if (val.length <= 6) return '•••••';
    return val.slice(0, 3) + '•••' + val.slice(-2);
  };

  return (
    <div className="page-root">
      <div className="page-inner container">
        <h2 className="site-title">Profile</h2>
        <p className="muted">View the details you provided during registration.</p>

        <div className="form-card profile-card">
          <div className="profile-header">
            <div className="profile-avatar">{user.username ? user.username.charAt(0).toUpperCase() : 'U'}</div>

            <div className="profile-info">
              <h3 className="profile-name">{user.name || user.username || 'User'}</h3>
              <p className="muted">Username: <strong>{user.username || '-'}</strong></p>
              <p className="muted">Role: <strong>{user.role || 'N/A'}</strong></p>
            </div>

            <div className="profile-actions">
              <button className="btn btn-outline" onClick={refreshFromServer} disabled={loading}>{loading ? 'Refreshing...' : 'Refresh'}</button>
              <button className="btn btn-danger" onClick={logout}>Logout</button>
            </div>
          </div>

          <hr />

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="profile-session">
            <h4>Session</h4>
            <p className="muted">Token (masked)</p>
            <p className="mono">{mask(user.token)}</p>
            {user.createdAt && <p className="muted profile-created">Created: {user.createdAt}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
