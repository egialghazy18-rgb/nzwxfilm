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
      style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', aspectRatio: '16/7', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', isolation: 'isolate' }}
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
      <img
        src={hero.backdrop}
        alt={hero.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: fade ? 1 : 0, transition: 'opacity 0.3s ease', display: 'block', position: 'absolute', inset: 0 }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.1) 60%)', zIndex: 1 }} />

      {/* Counter */}
      <div style={{ position: 'absolute', top: 10, right: 12, zIndex: 2, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', borderRadius: 8, padding: '3px 10px', fontSize: 11, fontWeight: 700, color: '#fff' }}>{current + 1}/{films.length}</div>

      <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14, zIndex: 2 }}>
        <h2 style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px', marginBottom: 4, opacity: fade ? 1 : 0, transition: 'opacity 0.3s ease' }}>{hero.title}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>★ {hero.rating?.toFixed(1)}</span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{hero.release_date?.slice(0,4)}</span>
          <span style={{ fontSize: 9, fontWeight: 800, background: '#e50914', color: '#fff', padding: '2px 6px', borderRadius: 4 }}>HD</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href={`/watch/${hero.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '7px 16px', background: '#fff', borderRadius: 100, color: '#000', fontWeight: 700, fontSize: 12 }}>▶ Tonton</a>
          <div style={{ display: 'flex', gap: 5 }}>
            {films.map((_, i) => (
              <div key={i} onClick={() => { setFade(false); setTimeout(() => { setCurrent(i); setFade(true); }, 200); }} style={{ width: i === current ? 16 : 5, height: 5, borderRadius: 3, background: i === current ? '#fff' : 'rgba(255,255,255,0.4)', transition: 'all 0.3s', cursor: 'pointer' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
