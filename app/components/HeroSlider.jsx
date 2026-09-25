'use client';
import { useState, useEffect } from 'react';

export default function HeroSlider({ films }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % films.length), 4000);
    return () => clearInterval(t);
  }, [films.length]);

  if (!films.length) return null;

  return (
    <div style={{ overflowX: 'auto', display: 'flex', gap: 10, padding: '12px 16px 4px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {films.map((film, i) => (
        <a key={film.id} href={`/watch/${film.id}`} style={{
          flex: '0 0 120px',
          borderRadius: 14,
          overflow: 'hidden',
          position: 'relative',
          aspectRatio: '2/3',
          display: 'block',
          boxShadow: i === current ? '0 8px 24px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.2)',
          transform: i === current ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 0.3s ease',
          border: i === current ? '2px solid #e21221' : '2px solid transparent',
          textDecoration: 'none',
        }}>
          <img src={film.poster || film.backdrop} alt={film.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%)' }} />
          <div style={{ position: 'absolute', bottom: 6, left: 6, right: 6 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{film.title}</p>
          </div>
        </a>
      ))}
    </div>
  );
}