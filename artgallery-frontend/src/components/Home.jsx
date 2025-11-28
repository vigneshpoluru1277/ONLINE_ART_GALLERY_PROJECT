import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home(){
  const featured = [
    {
      title: 'ART GALLERY',
    //   artist: 'A. Moreno',
      url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=60'
    },
    {
      title: 'Seaside Serenity',
      artist: 'L. Harper',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=60'
    },
    {
      title: 'Starfield Nocturne',
      artist: 'R. Kline',
      url: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1200&q=60'
    },
    {
      title: 'Woodland Veil',
      artist: 'S. Patel',
      url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=60'
    },
    {
      title: 'Crimson Seat',
      artist: 'M. Rossi',
      url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1000&q=60'
    },
    {
      title: 'Cosmic Bloom',
      artist: 'E. Zhang',
      url: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1000&q=60'
    }
  ];

  return (
    <div className="page-root">
      <div className="hero container">
        <div className="hero-card">
          <img className="hero-img" src={featured[0].url} alt={featured[0].title} />
          <div className="hero-overlay">
            <h2 className="hero-title">{featured[0].title}</h2>
            {/* short subtitle to convey the mission */}
            <p className="hero-sub">Original artworks, carefully curated — discover pieces that inspire and transform spaces.</p>
            <div className="hero-cta">
              <Link to="/browse" className="btn btn-primary">View Gallery</Link>
            </div>
            <p className="hero-caption">Browse modern paintings, photography and limited-edition prints from emerging and established artists. New works are added weekly.</p>
          </div>
        </div>
      </div>

      <div className="page-inner container">
        <h2 className="site-title" style={{textAlign:'center',marginTop:40}}>Featured Artworks</h2>

        <p className="muted home-featured-intro">Our hand-picked featured artworks showcase the diversity of styles on the platform — click any piece to learn more or make an offer.</p>

        <div className="featured-grid featured-grid--home">
          {featured.map((f, i) => (
            <article className="feature-card" key={i} aria-label={`Featured artwork ${i + 1}`}>
              <img src={f.url} alt={f.title} className="feature-img" />
              {/* Image names removed as requested; alt text preserved for accessibility */}
            </article>
          ))}
        </div>

        <div style={{textAlign:'center', marginTop:30}}>
          <Link to="/browse" className="btn btn-outline">Browse all artworks</Link>
        </div>
      </div>
    </div>
  );
}
