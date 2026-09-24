'use client';
import { useState, useEffect } from 'react';

export default function HeroSlider({ films }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(p => (p + 1) % films.length);
    }, 4000);
    return () => clearInterval(t);
  }, [films.length]);

  if (!films.length) return null;

  return (
    <div style={{ overflowX: 'auto', display: 'flex', gap: 12, padding: '0 16px 4px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {films.map((film, i) => (
        <a key={film.id} href={`/watch/${film.id}`} style={{
          flex: '0 0 140px',
          borderRadius: 16,
          overflow: 'hidden',
          position: 'relative',
          aspectRatio: '2/3',
          display: 'block',
          boxShadow: i === current ? '0 8px 24px rgba(0,0,0,0.35)' : '0 4px 12px rgba(0,0,0,0.2)',
          transform: i === current ? 'scale(1.04)' : 'scale(1)',
          transition: 'all 0.3s ease',
          border: i === current ? '2px solid rgba(255,255,255,0.6)' : '2px solid transparent',
        }}>
          <img
            src={film.poster || film.backdrop}
            alt={film.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%)' }} />
          <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{film.title}</p>
          </div>
          {i === current && (
            <div style={{ position: 'absolute', top: 8, right: 8, background: '#1565c0', borderRadius: 100, width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 9, fontWeight: 800, color: '#fff' }}>{i + 1}</span>
            </div>
          )}
        </a>
      ))}
    </div>
  );
}
