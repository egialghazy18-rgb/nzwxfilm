'use client';
import { useState, useEffect, useRef } from 'react';

export default function BannerSlider({ films }) {
  const [current, setCurrent] = useState(0);
  const [offset, setOffset] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % films.length), 4000);
    return () => clearInterval(t);
  }, [films.length]);

  useEffect(() => {
    const onScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setOffset(rect.top * 0.3);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!films.length) return null;
  const f = films[current];

  return (
    <div style={{ padding: '12px 16px 0' }} ref={ref}>
      <a href={`/watch/${f.id}`} style={{ display: 'block', borderRadius: 20, overflow: 'hidden', position: 'relative', aspectRatio: '16/7', boxShadow: '0 8px 32px rgba(0,0,0,0.35)', textDecoration: 'none' }}>
        <img
          src={f.backdrop}
          alt={f.title}
          style={{ width: '100%', height: '115%', objectFit: 'cover', display: 'block', transform: `translateY(${offset}px)`, transition: 'transform 0.1s linear, opacity 0.5s', objectPosition: 'center top' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%)' }} />
        <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
          <p style={{ fontSize: 18, fontWeight: 900, color: '#fff', letterSpacing: '-0.3px', marginBottom: 4, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{f.title}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>★ {f.rating?.toFixed(1)}</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{f.release_date?.slice(0,4)}</span>
            <span style={{ background: '#e21221', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>HD</span>
          </div>
        </div>
        <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', borderRadius: 100, padding: '3px 10px', fontSize: 11, color: '#fff', fontWeight: 600 }}>{current + 1}/{films.length}</div>
      </a>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 10 }}>
        {films.map((_, i) => (
          <div key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 20 : 6, height: 6, borderRadius: 3, background: i === current ? '#1c1c1e' : 'rgba(0,0,0,0.15)', transition: 'all 0.3s', cursor: 'pointer' }} />
        ))}
      </div>
    </div>
  );
}