import React, { useState } from 'react';
import './Contact.css';

export default function Contact(){
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('');
    // For now we simulate a successful submit. Replace with API call if available.
    setTimeout(() => {
      setStatus('Thank you — your message has been received. We will respond within 2 business days.');
      setForm({ name: '', email: '', message: '' });
    }, 700);
  };

  return (
    <div className="page-root">
      <div className="page-inner container">
        <h2 className="site-title">Contact</h2>
        <p className="muted">Have questions? Reach out to our support team using the form below or via email/phone.</p>

        <div className="contact-grid">
          <div className="contact-card">
            <h3>Send us a message</h3>
            <form className="auth-form" onSubmit={handleSubmit}>
              <label className="label">Name</label>
              <input className="form-control" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />

              <label className="label">Email</label>
              <input type="email" className="form-control" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />

              <label className="label">Message</label>
              <textarea className="form-control" rows={6} value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />

              {status && <div className="alert alert-success">{status}</div>}

              <div className="form-actions">
                <button className="btn btn-primary" type="submit">Send message</button>
                <button type="button" className="btn btn-outline" onClick={() => setForm({name:'',email:'',message:''})}>Reset</button>
              </div>
            </form>
          </div>

          <aside className="contact-card contact-info">
            <h3>Contact details</h3>
            <p className="muted">Email</p>
            <p><a href="mailto:vigneshpoluru1277@gmail.com">vigneshpoluru1277@gmail.com</a></p>

            <p className="muted">Phone</p>
            <p>+91 98495 71429</p>

            <p className="muted">Address</p>
            <p>123 Art Street, Creativity City, Country</p>

            <p className="muted">Support hours</p>
            <p>Mon–Fri 9:00 — 18:00 (local time)</p>

            <div className="contact-faq" style={{marginTop:12}}>
              <h4>Quick FAQ</h4>
              <p className="muted" style={{margin:6}}>Order status & returns — Visit the Orders page in your profile.</p>
              <p className="muted" style={{margin:6}}>Seller inquiries — Use the Sell page to list artworks or contact partnerships.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
