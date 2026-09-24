'use client';
import Link from 'next/link';

export default function MovieCard({ film }) {
  return (
    <Link href={`/watch/${film.id}`} style={{ display: 'block' }}>
      <div style={{
        borderRadius: 16, overflow: 'hidden',
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.9)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        transition: 'all 0.25s ease', cursor: 'pointer',
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; }}>
        <div style={{ position: 'relative', aspectRatio: '2/3', overflow: 'hidden', background: '#cfd8dc' }}>
          {film.poster
            ? <img src={film.poster} alt={film.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
            : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>🎬</div>
          }
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
          <div style={{
            position: 'absolute', top: 8, right: 8,
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(8px)',
            borderRadius: 8, padding: '3px 8px',
            fontSize: 11, fontWeight: 700, color: '#1a1a2e',
          }}>★ {film.rating?.toFixed(1)}</div>
          {film.type === 'tv' && (
            <div style={{
              position: 'absolute', top: 8, left: 8,
              background: 'rgba(13,71,161,0.85)',
              borderRadius: 6, padding: '2px 8px',
              fontSize: 9, fontWeight: 700, color: '#fff',
            }}>SERIES</div>
          )}
        </div>
        <div style={{ padding: '10px 12px 13px', background: 'transparent' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#1a1a2e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{film.title}</div>
          <div style={{ fontSize: 11, color: '#78909c', marginTop: 2 }}>{film.release_date?.slice(0, 4)}</div>
        </div>
      </div>
    </Link>
  );
}
