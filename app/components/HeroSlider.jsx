'use client';
import { useState, useEffect } from 'react';

export default function HeroSlider({ films }) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => { setCurrent(p => (p + 1) % films.length); setFade(true); }, 300);
    }, 5000);
    return () => clearInterval(t);
  }, [films.length]);

  if (!films.length) return null;
  const hero = films[current];

  return (
    <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', aspectRatio: '16/7', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
      <img
        src={hero.backdrop}
        alt={hero.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: fade ? 1 : 0, transition: 'opacity 0.3s ease' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%)' }} />

      <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14 }}>
        <h2 style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px', marginBottom: 8, opacity: fade ? 1 : 0, transition: 'opacity 0.3s ease' }}>{hero.title}</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href={`/watch/${hero.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '7px 16px', background: '#fff', borderRadius: 100, color: '#000', fontWeight: 700, fontSize: 12 }}>▶ Tonton</a>
          <div style={{ display: 'flex', gap: 5 }}>
            {films.map((_, i) => (
              <div key={i} onClick={() => { setFade(false); setTimeout(() => { setCurrent(i); setFade(true); }, 200); }} style={{
                width: i === current ? 16 : 5, height: 5,
                borderRadius: 3,
                background: i === current ? '#fff' : 'rgba(255,255,255,0.4)',
                transition: 'all 0.3s', cursor: 'pointer',
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
