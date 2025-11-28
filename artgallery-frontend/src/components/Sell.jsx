import React, { useEffect, useState, useCallback } from 'react';
import AddArtForm from './AddArtForm.jsx';
import axios from 'axios';
import './Sell.css';

export default function Sell(){
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username');

  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchArts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/arts`);
      const all = res.data || [];
      if (role === 'SELLER') setArts(all.filter(a => a.artist === username));
      else setArts(all);
    } catch {
      setError('Failed to load your listings.');
    } finally {
      setLoading(false);
    }
  }, [role, username]);

  useEffect(() => { fetchArts(); }, [fetchArts]);

  const handleDelete = (id) => {
    if (!window.confirm('Delete this art?')) return;
    axios.delete(`${import.meta.env.VITE_API_URL}/api/arts/${id}`)
      .then(() => fetchArts())
      .catch(() => alert('Failed to delete'));
  };

  if (role !== 'SELLER' && role !== 'ADMIN') {
    return (
      <div className="page-root">
        <div className="page-inner container">
          <h2 className="site-title">Become a Seller</h2>
          <p className="muted">You must register as a seller to list artworks. Go to <a href="/register">Register</a> and choose "Seller" as account type.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-root">
      <div className="page-inner container">
        <h2 className="site-title">Sell Your Art</h2>
        <p className="muted">Create listings for your artwork and manage your inventory.</p>

        <AddArtForm onArtAdded={fetchArts} />

        <section className="sell-section">
          <h3 className="sell-title">Your Listings</h3>

          {loading && <p>Loading...</p>}
          {error && <p className="muted">{error}</p>}

          {!loading && arts.length === 0 && (
            <div className="sell-empty">No listings yet.</div>
          )}

          <div className="sell-grid">
            {arts.map(art => (
              <div key={art.id} className="sell-card">
                <img src={art.imageUrl || 'https://via.placeholder.com/400x250'} alt={art.title} />
                <div className="sell-card-body">
                  <h4>{art.title}</h4>
                  <p className="muted">By: {art.artist}</p>
                  <div className="sell-meta">
                    <div className="sell-price">₹{art.price}</div>
                    <div className="sell-actions">
                      <button className="btn btn-outline" onClick={() => window.alert('Edit not implemented')}>Edit</button>
                      <button className="btn btn-logout" onClick={() => handleDelete(art.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
