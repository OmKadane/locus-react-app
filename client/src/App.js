// client/src/App.js
import React, { useEffect, useState } from 'react';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error("Locus API Error:", err));
  }, []);

  return (
    <div style={{ background: '#0B0C10', minHeight: '100vh', color: '#C5C6C7', fontFamily: 'Inter, sans-serif', padding: '50px', textAlign: 'center' }}>

      {/* Navigation Header */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '60px', borderBottom: '1px solid #1F2833', paddingBottom: '20px' }}>
        <h1 style={{ margin: 0, color: '#66FCF1', letterSpacing: '2px' }}>LOCUS</h1>
        <span style={{ fontSize: '0.9rem', alignSelf: 'center' }}>Virtual Book Hub</span>
      </nav>

      {/* Hero Section */}
      <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Find your place in the story.</h2>
      <p style={{ marginBottom: '40px', color: '#8892b0' }}>A spatial library hosted on Google Cloud Platform.</p>

      {/* Database Content Area */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {books.length > 0 ? books.map((book, i) => (
          <div key={i} style={{ background: '#1F2833', padding: '30px', borderRadius: '15px', border: '1px solid #45A29E', width: '250px' }}>
            <div style={{ width: '40px', height: '40px', background: '#45A29E', borderRadius: '50%', marginBottom: '15px', margin: '0 auto' }}></div>
            <h3 style={{ color: '#fff' }}>{book.title}</h3>
            <p style={{ fontSize: '0.9rem' }}>{book.author}</p>
          </div>
        )) : <p style={{ color: '#45A29E' }}>Connecting to Locus Cloud SQL...</p>}
      </div>

    </div>
  );
}

export default App;