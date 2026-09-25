'use client';
import { useState } from 'react';

export default function NowPlaying({ films }) {
  const [active, setActive] = useState(0);

  return (
    <section style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', marginBottom: 14 }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: '#1a237e', paddingLeft: 12, borderLeft: '4px solid #1565c0', borderRadius: 2 }}>Now Playing</h2>
        <a href="/trending" style={{ fontSize: 12, color: '#1565c0', fontWeight: 600 }}>Lihat Semua →</a>
      </div>

      {/* Horizontal scroll cards */}
      <div style={{ overflowX: 'auto', paddingLeft: 16, paddingBottom: 12, display: 'flex', gap: 12, scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        className="hide-scrollbar">
        {films.slice(0, 10).map((f, i) => (
          <a key={f.id} href={`/watch/${f.id}`} onClick={() => setActive(i)}
            style={{ flexShrink: 0, width: 200, textDecoration: 'none', scrollSnapAlign: 'start' }}>
            <div style={{
              borderRadius: 16, overflow: 'hidden', position: 'relative',
              aspectRatio: '2/3',
              boxShadow: i === active ? '0 12px 32px rgba(21,101,192,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              border: i === active ? '2px solid #1565c0' : '2px solid transparent',
            }}>
              {f.poster && <img src={f.poster} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)' }} />

              {/* Badge */}
              <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', borderRadius: 6, padding: '2px 8px', fontSize: 10, fontWeight: 700, color: '#fff' }}>★ {f.rating?.toFixed(1)}</div>
              <div style={{ position: 'absolute', top: 10, left: 10, background: '#e21221', borderRadius: 5, padding: '2px 8px', fontSize: 9, fontWeight: 800, color: '#fff' }}>HD</div>

              {/* Number */}
              <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff' }}>{i + 1}</div>

              <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10 }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 4, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>{f.title}</p>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>{f.release_date?.slice(0,4)}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
        <div style={{ flexShrink: 0, width: 8 }} />
      </div>

      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
}
