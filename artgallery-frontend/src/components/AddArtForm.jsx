import React, { useState } from 'react';
import axios from 'axios';
import './AddArtForm.css';

export default function AddArtForm({ onArtAdded }) {
  const [form, setForm] = useState({ title: '', artist: '', price: '' });
  const [imageFile, setImageFile] = useState(null);
  const userRole = localStorage.getItem('role');
  const username = localStorage.getItem('username');

  if (userRole !== 'ADMIN' && userRole !== 'SELLER') return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('artist', userRole === 'SELLER' ? username : form.artist);
    formData.append('price', form.price);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    axios.post(
      `${import.meta.env.VITE_API_URL}/api/arts`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
      .then(() => {
        setForm({ title: '', artist: '', price: '' });
        setImageFile(null);
        document.getElementById('imageInput').value = '';
        alert('Art added successfully!');
        onArtAdded();
      })
      .catch(err => console.error('Error adding art:', err));
  };

  return (
    <div className="add-art-card">
      <h3 style={{ marginTop: 0 }}>Add New Art</h3>
      <form onSubmit={handleSubmit} className="add-art-grid">
        
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
          className="add-art-input"
        />

        {userRole === 'ADMIN' ? (
          <input
            type="text"
            placeholder="Artist"
            value={form.artist}
            onChange={e => setForm({ ...form, artist: e.target.value })}
            required
            className="add-art-input"
          />
        ) : (
          <input
            type="text"
            value={username}
            disabled
            className="add-art-input"
            disabled
          />
        )}

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          required
          className="add-art-input"
          style={{ gridColumn: 'span 2' }}
        />

        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={e => setImageFile(e.target.files[0])}
          className="add-art-input"
          style={{ gridColumn: 'span 2' }}
        />

        <button type="submit" className="add-art-btn">Add Art</button>
      </form>
    </div>
  );
}
