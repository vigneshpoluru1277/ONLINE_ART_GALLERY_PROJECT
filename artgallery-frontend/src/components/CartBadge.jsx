import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import CheckoutModal from './CheckoutModal.jsx';
import './CartBadge.css';

export default function CartBadge() {
  const { cart } = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <button onClick={() => setShowCheckout(true)} className="cart-fab" aria-label="open-cart">
        <span role="img" aria-label="cart" className="emoji">🛒</span>
        <span className="count">{cart.length}</span>
      </button>

      {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
    </>
  );
}
