'use client';
import { useState, useEffect, useRef } from 'react';

export default function NowPlaying({ films }) {
  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => {
      setActive(p => (p + 1) % Math.min(films.length, 10));
    }, 4000);
    return () => clearInterval(t);
  }, [films.length]);

  useEffect(() => {
    if (scrollRef.current) {
      const card = scrollRef.current.children[active];
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [active]);

  return (
    <section style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', marginBottom: 14 }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: '#1a237e', paddingLeft: 12, borderLeft: '4px solid #1565c0', borderRadius: 2 }}>Now Playing</h2>
        <a href="/trending" style={{ fontSize: 12, color: '#1565c0', fontWeight: 600 }}>Lihat Semua →</a>
      </div>

      <div
        ref={scrollRef}
        style={{ overflowX: 'auto', display: 'flex', gap: 12, padding: '8px 16px 16px', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', alignItems: 'center' }}
        className="hide-scrollbar"
      >
        {films.slice(0, 10).map((f, i) => {
          const isActive = i === active;
          return (
            <a
              key={f.id}
              href={`/watch/${f.id}`}
              onClick={() => setActive(i)}
              style={{
                flexShrink: 0,
                scrollSnapAlign: 'center',
                textDecoration: 'none',
                display: 'block',
                width: isActive ? 220 : 140,
                transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
              }}
            >
              <div style={{
                borderRadius: isActive ? 20 : 14,
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '2/3',
                boxShadow: isActive
                  ? '0 16px 48px rgba(21,101,192,0.4), 0 0 0 3px #1565c0'
                  : '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                opacity: isActive ? 1 : 0.65,
                transform: isActive ? 'scale(1)' : 'scale(0.92)',
              }}>
                {f.poster && <img src={f.poster} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />}
                <div style={{ position: 'absolute', inset: 0, background: isActive ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)' : 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)' }} />

                {/* HD Badge */}
                <div style={{ position: 'absolute', top: 10, left: 10, background: '#e21221', borderRadius: 5, padding: '2px 8px', fontSize: 9, fontWeight: 800, color: '#fff' }}>HD</div>

                {/* Rating */}
                <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', borderRadius: 6, padding: '2px 7px', fontSize: 10, fontWeight: 700, color: '#fff' }}>★ {f.rating?.toFixed(1)}</div>

                {/* Info — hanya tampil kalau active */}
                {isActive && (
                  <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12 }}>
                    <p style={{ fontSize: 14, fontWeight: 800, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', marginBottom: 6, textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>{f.title}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>{f.release_date?.slice(0,4)}</span>
                      <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 4, padding: '1px 6px', fontSize: 10, color: '#fff' }}>{f.rating?.toFixed(1)}</span>
                    </div>
                  </div>
                )}
              </div>
            </a>
          );
        })}
        <div style={{ flexShrink: 0, width: 8 }} />
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 4 }}>
        {films.slice(0, 10).map((_, i) => (
          <div key={i} onClick={() => setActive(i)} style={{ width: i === active ? 20 : 6, height: 6, borderRadius: 3, background: i === active ? '#1565c0' : 'rgba(21,101,192,0.2)', transition: 'all 0.3s', cursor: 'pointer' }} />
        ))}
      </div>

      <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}`}</style>
    </section>
  );
}
