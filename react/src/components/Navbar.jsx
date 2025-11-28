import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';

export default function Navbar() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/login');
  };

  useEffect(() => {
    const onDocClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <header className="site-nav">
      <div className="nav-inner container">
        <div className="nav-brand">
          <Link to="/" className="brand-link">🎨 <span>Art Gallery</span></Link>
        </div>

        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/browse" className="nav-link">Browse</Link>
          {/* <Link to="/collections" className="nav-link">Collections</Link> */}
          {(role === 'SELLER' || role === 'ADMIN') && <Link to="/sell" className="nav-link">Sell</Link>}
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          {role === 'ADMIN' && <Link to="/admin" className="nav-link">Admin</Link>}
        </nav>

        <div className="nav-actions">
          {(role === 'BUYER' || role === 'ADMIN' || role === 'SELLER') ? (
            <>
              <button
                className="btn btn-ghost cart-btn"
                onClick={() => {
                  if (role) navigate('/cart');
                  else navigate('/login');
                }}
                aria-label="Open cart"
                title="Cart"
              >
                <span className="cart-emoji">🛒</span>
                <span className="cart-count">{cart?.length || 0}</span>
              </button>

              <div className="profile-wrap" ref={profileRef}>
                <button
                  className="profile-btn"
                  onClick={() => setShowProfileMenu(s => !s)}
                  aria-haspopup="true"
                  aria-expanded={showProfileMenu}
                >
                  <div className="avatar">{username ? username.charAt(0).toUpperCase() : 'U'}</div>
                  <span className="profile-name">{username}</span>
                </button>

                {showProfileMenu && (
                  <div className="profile-menu">
                    <Link to="/profile" className="profile-item" onClick={() => setShowProfileMenu(false)}>Profile</Link>
                    <div className="profile-sep" />
                    <button className="profile-item" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary">Login</Link>
              <Link to="/register" className="btn btn-outline">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
