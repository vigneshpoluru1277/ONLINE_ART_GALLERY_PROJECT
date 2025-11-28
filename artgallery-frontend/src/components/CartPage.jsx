import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import CheckoutModal from './CheckoutModal.jsx';

export default function CartPage(){
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);

  const total = (cart || []).reduce((s, it) => s + (it.price || 0), 0);

  return (
    <div className="page-root">
      <div className="page-inner container">
        <h2 className="site-title">Your Cart</h2>
        <p className="muted">Items you've added to your cart.</p>

        <section style={{marginTop:20}}>
          {(!cart || cart.length === 0) ? (
            <div style={{padding:24,background:'var(--card)',borderRadius:10,boxShadow:'var(--shadow)'}}>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:20,alignItems:'start'}}>
              <div>
                {(cart || []).map((it, idx) => (
                  <div key={idx} style={{display:'flex',gap:12,alignItems:'center',padding:12,background:'var(--card)',borderRadius:10,marginBottom:12,boxShadow:'0 6px 18px rgba(16,24,40,0.04)'}}>
                    <img src={it.imageUrl || 'https://via.placeholder.com/120x90'} alt={it.title} style={{width:120,height:90,objectFit:'cover',borderRadius:6}} />
                    <div style={{flex:1}}>
                      <h4 style={{margin:0}}>{it.title}</h4>
                      <p className="muted" style={{margin:'6px 0'}}>{it.artist}</p>
                      <div style={{fontWeight:'700'}}>₹{it.price}</div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:8}}>
                      <button onClick={() => removeFromCart(it.id)} className="btn btn-outline">Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              <aside style={{background:'var(--card)',padding:18,borderRadius:12,boxShadow:'var(--shadow)'}}>
                <h3 style={{marginTop:0}}>Summary</h3>
                <div style={{display:'flex',justifyContent:'space-between',marginTop:12,fontWeight:700,fontSize:18}}>
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                <div style={{marginTop:18,display:'flex',flexDirection:'column',gap:10}}>
                  <button className="btn btn-primary" onClick={() => setShowCheckout(true)}>Proceed to Checkout</button>
                  <button className="btn btn-outline" onClick={() => clearCart()}>Clear Cart</button>
                </div>
              </aside>
            </div>
          )}
        </section>

        {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
      </div>
    </div>
  );
}
