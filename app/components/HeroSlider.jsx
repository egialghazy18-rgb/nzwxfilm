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
    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
      <img
        src={hero.backdrop}
        alt={hero.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: fade ? 1 : 0, transition: 'opacity 0.3s ease' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)' }} />
      <div style={{ position: 'absolute', bottom: 20, left: 18, right: 18 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px', marginBottom: 10, opacity: fade ? 1 : 0, transition: 'opacity 0.3s ease' }}>{hero.title}</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href={`/watch/${hero.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '8px 20px', background: '#fff', borderRadius: 100, color: '#000', fontWeight: 700, fontSize: 13 }}>▶ Tonton</a>
          <div style={{ display: 'flex', gap: 5 }}>
            {films.map((_, i) => (
              <div key={i} onClick={() => { setFade(false); setTimeout(() => { setCurrent(i); setFade(true); }, 200); }} style={{
                width: i === current ? 20 : 6, height: 6,
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
