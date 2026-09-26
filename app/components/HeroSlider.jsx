'use client';
import { useState, useEffect, useRef } from 'react';

export default function HeroSlider({ films }) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const touchStartX = useRef(null);

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
    <div
      style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', aspectRatio: '16/7', boxShadow: '0 12px 48px rgba(0,0,0,0.5)', isolation: 'isolate' }}
      onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) setCurrent(p => (p + 1) % films.length);
          else setCurrent(p => (p - 1 + films.length) % films.length);
        }
        touchStartX.current = null;
      }}
    >
      {/* Background Image */}
      <img
        src={hero.backdrop}
        alt={hero.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: fade ? 1 : 0, transition: 'opacity 0.4s ease', display: 'block', position: 'absolute', inset: 0 }}
      />

      {/* Cinematic gradient — bottom + left */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.05) 100%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 60%)', zIndex: 1 }} />

      {/* Counter */}
      <div style={{ position: 'absolute', top: 10, right: 12, zIndex: 3, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', borderRadius: 8, padding: '3px 10px', fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.5px' }}>
        {current + 1}/{films.length}
      </div>

      {/* Content */}
      <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, zIndex: 2, opacity: fade ? 1 : 0, transition: 'opacity 0.4s ease' }}>

        {/* Genre label */}
        <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 4 }}>
          🎬 Featured
        </div>

        {/* Title — lebih besar & bold */}
        <h2 style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.5px', marginBottom: 6, lineHeight: 1.1, textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>
          {hero.title}
        </h2>

        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 12, color: '#FFD700', fontWeight: 700 }}>★ {hero.rating?.toFixed(1)}</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', display: 'inline-block' }} />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{hero.release_date?.slice(0,4)}</span>
          <span style={{ fontSize: 9, fontWeight: 800, background: 'linear-gradient(135deg, #e50914, #b00710)', color: '#fff', padding: '2px 7px', borderRadius: 4, letterSpacing: '0.5px' }}>HD</span>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href={`/watch/${hero.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 20px', background: '#fff', borderRadius: 100, color: '#000', fontWeight: 800, fontSize: 12, letterSpacing: '0.2px', boxShadow: '0 4px 16px rgba(255,255,255,0.25)' }}>
            ▶ Tonton
          </a>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {films.map((_, i) => (
              <div
                key={i}
                onClick={() => { setFade(false); setTimeout(() => { setCurrent(i); setFade(true); }, 200); }}
                style={{ width: i === current ? 18 : 5, height: 5, borderRadius: 3, background: i === current ? '#fff' : 'rgba(255,255,255,0.35)', transition: 'all 0.3s', cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
