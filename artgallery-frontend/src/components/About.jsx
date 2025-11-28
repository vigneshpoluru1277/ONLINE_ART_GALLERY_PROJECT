import React from 'react';
import { Link } from 'react-router-dom';

export default function About(){
  return (
    <div className="page-root">
      <div className="about-hero">
        <div className="container">
          <div className="about-hero-inner">
            <h1 className="about-title">We bring art and people together</h1>
            <p className="about-lead">Discover original artworks from emerging and established artists — curated for collectors and enthusiasts worldwide.</p>
            <div style={{marginTop:18}}>
              <Link to="/browse" className="btn btn-primary">Explore artworks</Link>
              <Link to="/contact" className="btn btn-outline" style={{marginLeft:12}}>Contact us</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="page-inner container">
        <section className="about-section">
          <h2 className="site-title" style={{textAlign:'left'}}>Our mission</h2>
          <p className="muted">Art Gallery is dedicated to making art discovery simple, trustworthy, and delightful. We empower artists with a platform to share their work and provide collectors with transparent pricing and secure purchases.</p>

          <div className="about-grid">
            <div className="about-card">
              <h4>Authenticity</h4>
              <p className="muted">We verify artists and provenance to ensure every listing is genuine.</p>
            </div>

            <div className="about-card">
              <h4>Transparency</h4>
              <p className="muted">Clear pricing, easy returns, and straightforward purchase flow.</p>
            </div>

            <div className="about-card">
              <h4>Community</h4>
              <p className="muted">We support artists through promotion, fair fees, and curated collections.</p>
            </div>
          </div>
        </section>

        <section className="team-section" style={{marginTop:28}}>
          <h2 className="site-title" style={{textAlign:'left'}}>Team</h2>
          <p className="muted">A small, passionate team working to make art accessible online.</p>

          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">PV</div>
              <h4>Poluru Vignesh</h4>
              <p className="muted">Team Leader</p>
            </div>

            <div className="team-card">
              <div className="team-avatar">AC</div>
              <h4>Ayeka Naga Chaitanya</h4>
              <p className="muted">Team Member</p>
            </div>

            <div className="team-card">
              <div className="team-avatar">UK</div>
              <h4>Uday Kumar</h4>
              <p className="muted">Team Member</p>
            </div>
          </div>
        </section>

        <section style={{marginTop:28}}>
          <h3>Contact</h3>
          <p className="muted">Have questions? Email <a href="mailto:vigneshpoluru1277@gmail.com">vigneshpoluru1277@gmail.com</a> or visit our <Link to="/contact">contact page</Link>.</p>
        </section>
      </div>
    </div>
  );
}
