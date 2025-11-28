import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import './CheckoutModal.css';

export default function CheckoutModal({ onClose }) {
  const { cart, clearCart } = useContext(CartContext);
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handlePayment = (e) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setStep(3);
      clearCart();
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget && step !== 3 && !processing) {
          onClose();
        }
      }}
      className="overlay"
    >
      <div className="modal">
        {/** Full code continues EXACTLY AS YOUR ORIGINAL */}
                {!processing && step !== 3 && (
          <button
            onClick={onClose}
            className="close-btn"
          >
            ×
          </button>
        )}

        {step === 1 && (
          <div className="content-padding">
            <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Your Cart</h2>
            {cart.length === 0 ? (
              <div>
                <p className="cart-empty">Your cart is empty</p>
                <button
                  onClick={onClose}
                  className="btn btn-block btn-secondary"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div>
                      <h4 style={{ margin: '0 0 5px 0' }}>{item.title}</h4>
                      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>by {item.artist}</p>
                    </div>
                    <div className="cart-price">₹{item.price}</div>
                  </div>
                ))}

                <div className="cart-total">
                  <span>Total:</span>
                  <span className="amount">₹{totalAmount}</span>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="btn btn-block btn-primary"
                >
                  Proceed to Payment
                </button>
              </>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="content-padding">
            <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Payment Details</h2>

            <div className="summary-box">
              <p>Total Amount</p>
              <h3>₹{totalAmount}</h3>
            </div>

            <form onSubmit={handlePayment}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  value={paymentForm.cardNumber}
                  onChange={(e) =>
                    setPaymentForm({
                      ...paymentForm,
                      cardNumber: formatCardNumber(e.target.value.replace(/\s/g, '').slice(0, 16))
                    })
                  }
                  required
                  disabled={processing}
                  className="form-input"
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={paymentForm.cardName}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, cardName: e.target.value })}
                  required
                  disabled={processing}
                  className="form-input"
                />
              </div>

              <div className="form-grid">
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength="5"
                    value={paymentForm.expiryDate}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length >= 2) {
                        value = value.slice(0, 2) + '/' + value.slice(2, 4);
                      }
                      setPaymentForm({ ...paymentForm, expiryDate: value });
                    }}
                    required
                    disabled={processing}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength="3"
                    value={paymentForm.cvv}
                    onChange={(e) =>
                      setPaymentForm({ ...paymentForm, cvv: e.target.value.replace(/\D/g, '') })}
                    required
                    disabled={processing}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={processing}
                  className="btn flex-1 btn-secondary"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={processing}
                  className="btn flex-2 btn-primary"
                >
                  {processing ? 'Processing...' : `Pay ₹${totalAmount}`}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div style={{ padding: '60px 30px', textAlign: 'center' }}>
            <div style={{
              fontSize: '72px',
              marginBottom: '20px',
              color: '#28a745'
            }}>
              ✓
            </div>
            <h2 style={{ color: '#28a745', marginBottom: '10px', fontSize: '28px' }}>
              Payment Successful!
            </h2>
            <p style={{ color: '#666', fontSize: '18px' }}>
              Thank you for your purchase of ₹{totalAmount}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
