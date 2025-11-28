import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import './ArtList.css';

export default function ArtList() {
  const [arts, setArts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const userRole = localStorage.getItem('role');
  const username = localStorage.getItem('username');

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchArts();
  }, []);

  const fetchArts = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/arts`)
      .then(res => setArts(res.data))
      .catch(err => console.error('Error fetching arts:', err));
  };

  const handleEdit = (art) => {
    setEditId(art.id);
    setEditData({ ...art });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios.put(`${import.meta.env.VITE_API_URL}/api/arts/${editId}`, editData)
      .then(() => {
        setEditId(null);
        fetchArts();
      })
      .catch(err => console.error('Error updating art:', err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this art?')) {
      axios.delete(`${import.meta.env.VITE_API_URL}/api/arts/${id}`)
        .then(() => fetchArts())
        .catch(err => console.error('Error deleting art:', err));
    }
  };

  const handleAddToCart = (art) => {
    addToCart(art);
    alert(`${art.title} added to cart!`);
  };

  const canModify = (art) => {
    if (userRole === 'ADMIN') return true;
    if (userRole === 'SELLER' && art.artist === username) return true;
    return false;
  };

  return (
    <div className="art-grid">
      {arts.map(art => (
        <div key={art.id} className="art-card">
          {editId === art.id ? (
            <div>
              <input
                name="title"
                value={editData.title}
                onChange={handleEditChange}
                className="edit-input"
              />
              <input
                name="artist"
                value={editData.artist}
                onChange={handleEditChange}
                className="edit-input"
              />
              <input
                name="price"
                type="number"
                value={editData.price}
                onChange={handleEditChange}
                className="edit-input"
              />
              <input
                name="imageUrl"
                value={editData.imageUrl}
                onChange={handleEditChange}
                className="edit-input"
              />

              <div className="card-actions">
                <button onClick={handleUpdate} className="btn-inline btn-success">Save</button>
                <button onClick={() => setEditId(null)} className="btn-inline btn-muted">Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <img
                src={art.imageUrl}
                alt={art.title}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available'; }}
                className="art-img"
              />

              <h3 style={{ margin: '10px 0' }}>{art.title}</h3>
              <p className="art-meta">By: {art.artist}</p>
              <p className="art-price">₹{art.price}</p>

              {(userRole === 'BUYER' || userRole === 'ADMIN') && (
                <button
                  onClick={() => handleAddToCart(art)}
                  className="btn-inline btn-success"
                  style={{ width: '100%', marginBottom: '10px' }}>
                  Add to Cart
                </button>
              )}

              {canModify(art) && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => handleEdit(art)} className="btn-inline btn-warning">Edit</button>
                  <button onClick={() => handleDelete(art.id)} className="btn-inline btn-danger">Delete</button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
