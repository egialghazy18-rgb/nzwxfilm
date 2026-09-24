'use client';
import { useState, useEffect } from 'react';

export default function HeroSlider({ films }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % films.length);
        setAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(timer);
  }, [films.length]);

  const goTo = (i) => {
    setAnimating(true);
    setTimeout(() => { setCurrent(i); setAnimating(false); }, 300);
  };

  if (!films.length) return null;
  const hero = films[current];

  return (
    <div style={{ position: 'relative', height: '56vh', minHeight: 340, overflow: 'hidden', borderRadius: '0 0 28px 28px' }}>
      {/* Background Image */}
      <img
        key={hero.id}
        src={hero.backdrop}
        alt={hero.title}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center 20%',
          opacity: animating ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.15) 100%)' }} />

      {/* Content */}
      <div style={{
        position: 'absolute', bottom: 24, left: 20, right: 20,
        opacity: animating ? 0 : 1,
        transition: 'opacity 0.4s ease',
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100, padding: '4px 12px', fontSize: 11, fontWeight: 600, color: '#fff', marginBottom: 10 }}>
          🔥 Trending #{current + 1}
        </div>
        <h1 style={{ fontSize: 'clamp(24px,6vw,44px)', fontWeight: 800, color: '#fff', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 8 }}>{hero.title}</h1>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{hero.overview}</p>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <a href={`/watch/${hero.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 22px', background: '#fff', borderRadius: 100, color: '#000', fontWeight: 700, fontSize: 13, boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>▶ Tonton</a>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '10px 14px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100, color: '#fff', fontSize: 13 }}>★ {hero.rating?.toFixed(1)}</div>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 5, marginLeft: 'auto' }}>
            {films.map((_, i) => (
              <div key={i} onClick={() => goTo(i)} style={{
                width: i === current ? 18 : 5, height: 5,
                borderRadius: 3,
                background: i === current ? '#fff' : 'rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease', cursor: 'pointer',
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
