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
    <div style={{ marginBottom: 8, position: 'relative', padding: '8px 0 16px' }}>
      {/* Blur ngikutin poster - terisolasi */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `url(${films[active]?.poster})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'blur(50px) saturate(3) brightness(1.1)',
        opacity: 0.45,
        transition: 'opacity 0.5s ease',
        maskImage: 'radial-gradient(ellipse 110% 95% at 50% 50%, black 0%, transparent 65%)',
        WebkitMaskImage: 'radial-gradient(ellipse 110% 95% at 50% 50%, black 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', marginBottom: 14 }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, color: '#1a237e', paddingLeft: 12, borderLeft: '4px solid #1565c0' }}>Now Playing</h2>
        </div>
        <div ref={ref} style={{ overflowX: 'auto', display: 'flex', alignItems: 'center', gap: 12, padding: '8px 80px 16px', scrollbarWidth: 'none', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', msOverflowStyle: 'none' }}>
          {films.map((film, i) => (
            <a key={film.id} href={`/watch/${film.id}`} style={{
              flex: '0 0 52vw', maxWidth: 200,
              borderRadius: 20, overflow: 'hidden',
              position: 'relative', aspectRatio: '2/3',
              display: 'block', textDecoration: 'none',
              flexShrink: 0, scrollSnapAlign: 'center',
              transform: i === active ? 'scale(1.06) translateY(-4px)' : 'scale(0.88)',
              transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease',
              boxShadow: i === active ? '0 20px 60px rgba(0,0,0,0.5), 0 0 0 2px rgba(255,255,255,0.3)' : '0 4px 16px rgba(0,0,0,0.2)',
              zIndex: i === active ? 2 : 1,
            }}>
              <img src={film.poster} alt={film.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: i === active ? 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.1) 55%)' : 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)' }} />
              {i === active && (
                <div style={{ position: 'absolute', bottom: 14, left: 12, right: 12 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: 6, textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>{film.title}</p>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>★ {film.rating?.toFixed(1)}</span>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{film.release_date?.slice(0,4)}</span>
                    <span style={{ background: 'linear-gradient(135deg,#e21221,#c0392b)', color: '#fff', fontSize: 9, fontWeight: 800, padding: '2px 8px', borderRadius: 4, letterSpacing: '0.5px' }}>HD</span>
                  </div>
                </div>
              )}
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 5 }}>
          {films.map((_, i) => (
            <div key={i} style={{ width: i === active ? 20 : 5, height: 5, borderRadius: 3, background: i === active ? '#1565c0' : 'rgba(0,0,0,0.2)', transition: 'all 0.35s ease' }} />
          ))}
        </div>
      </div>
    </div>
  );
}