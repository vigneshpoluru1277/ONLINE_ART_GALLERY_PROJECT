import React from 'react';
import ArtList from './ArtList.jsx';

export default function Browse(){
  return (
    <div className="page-root">
      <div className="page-inner container">
        <h2 className="site-title">Browse Art</h2>
        <p className="muted">Explore featured works and curated selections.</p>

        <section style={{marginTop:20}}>
          <ArtList />
        </section>
      </div>
    </div>
  );
}
