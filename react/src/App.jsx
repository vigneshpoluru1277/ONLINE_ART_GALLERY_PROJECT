import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import ArtList from './components/ArtList.jsx';
import AddArtForm from './components/AddArtForm.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import CartBadge from './components/CartBadge.jsx';
import Navbar from './components/Navbar.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import Browse from './components/Browse.jsx';
import Collections from './components/Collections.jsx';
import Sell from './components/Sell.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import AdminPage from './components/AdminPage.jsx';
import Profile from './components/Profile.jsx';
import CartPage from './components/CartPage.jsx';
import Home from './components/Home.jsx';
import { CartProvider } from './context/CartContext.jsx';

function RequireAuth({ children }) {
  const isLoggedIn = !!localStorage.getItem('role');
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function App() {
  const userRole = localStorage.getItem('role');

  return (
    <CartProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home/>} />

          <Route
            path="/gallery"
            element={
              <RequireAuth>
                <main className="page-root">
                  <div className="page-inner container">
                    <h1 className="site-title">Art Gallery</h1>

                    <AddArtForm onArtAdded={() => window.location.reload()} />
                    <ArtList />

                    {userRole === 'ADMIN' && <AdminDashboard />}
                  </div>
                </main>
              </RequireAuth>
            }
          />

          <Route path="/browse" element={<Browse/>} />
          <Route path="/collections" element={<Collections/>} />

          <Route
            path="/sell"
            element={
              <RequireAuth>
                <Sell />
              </RequireAuth>
            }
          />

          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />

          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminPage />
              </RequireAuth>
            }
          />

          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />

          <Route
            path="/cart"
            element={
              <RequireAuth>
                <CartPage />
              </RequireAuth>
            }
          />

          <Route
            path="/login"
            element={
              <div className="page-root">
                <div className="page-inner container">
                  <h1 className="site-title">Art Gallery</h1>
                  <Login />
                </div>
              </div>
            }
          />

          <Route
            path="/register"
            element={
              <div className="page-root">
                <div className="page-inner container">
                  <h1 className="site-title">Art Gallery</h1>
                  <Register />
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
