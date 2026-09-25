'use client';
import { useRef, useState, useEffect } from 'react';

export default function NowPlaying({ films }) {
  const [active, setActive] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const center = el.scrollLeft + el.offsetWidth / 2;
      let closest = 0, minDist = Infinity;
      Array.from(el.children).forEach((child, i) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const dist = Math.abs(center - childCenter);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActive(closest);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  if (!films.length) return null;

  return (
    <div style={{ marginBottom: 8, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: '-30px', zIndex: 0,
        backgroundImage: `url(${films[active]?.poster})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'blur(80px) saturate(2)',
        opacity: 0.25,
        transition: 'background-image 0s, opacity 1s ease',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', marginBottom: 14 }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, color: '#1a237e' }}>Now Playing</h2>
        </div>
        <div ref={ref} style={{ overflowX: 'auto', display: 'flex', alignItems: 'center', gap: 12, padding: '8px 80px 16px', scrollbarWidth: 'none', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', msOverflowStyle: 'none' }}>
          {films.map((film, i) => (
            <a key={film.id} href={`/watch/${film.id}`} style={{
              flex: '0 0 52vw', maxWidth: 200,
              borderRadius: 20, overflow: 'hidden',
              position: 'relative', aspectRatio: '2/3',
              display: 'block', textDecoration: 'none',
              flexShrink: 0, scrollSnapAlign: 'center',
              transform: i === active ? 'scale(1.04)' : 'scale(0.9)',
              transition: 'transform 0.35s ease, box-shadow 0.35s ease',
              boxShadow: i === active ? '0 16px 40px rgba(0,0,0,0.4)' : '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: i === active ? 2 : 1,
            }}>
              <img src={film.poster} alt={film.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: i === active ? 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)' : 'rgba(0,0,0,0.35)' }} />
              {i === active && (
                <div style={{ position: 'absolute', bottom: 14, left: 12, right: 12 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: 4 }}>{film.title}</p>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)' }}>★ {film.rating?.toFixed(1)}</span>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)' }}>{film.release_date?.slice(0,4)}</span>
                    <span style={{ background: '#e21221', color: '#fff', fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 4 }}>HD</span>
                  </div>
                </div>
              )}
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 5 }}>
          {films.map((_, i) => (
            <div key={i} style={{ width: i === active ? 18 : 5, height: 5, borderRadius: 3, background: i === active ? '#1565c0' : 'rgba(0,0,0,0.15)', transition: 'all 0.3s' }} />
          ))}
        </div>
      </div>
    </div>
  );
}