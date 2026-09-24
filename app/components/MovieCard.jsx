'use client';
import Link from 'next/link';

export default function MovieCard({ film }) {
  return (
    <Link href={`/watch/${film.id}`} style={{ display: 'block' }}>
      <div style={{
        borderRadius: 14, overflow: 'hidden',
        background: '#fff',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        transition: 'all 0.25s ease',
        cursor: 'pointer',
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)'; }}>
        <div style={{ position: 'relative', aspectRatio: '2/3', overflow: 'hidden', background: '#e5e5ea' }}>
          {film.poster
            ? <img src={film.poster} alt={film.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
            : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#c7c7cc' }}>🎬</div>
          }
          <div style={{
            position: 'absolute', top: 8, right: 8,
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(8px)',
            borderRadius: 8, padding: '3px 8px',
            fontSize: 11, fontWeight: 700, color: '#1c1c1e',
          }}>★ {film.rating?.toFixed(1)}</div>
          {film.type === 'tv' && (
            <div style={{
              position: 'absolute', top: 8, left: 8,
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(8px)',
              borderRadius: 6, padding: '2px 8px',
              fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: '0.5px',
            }}>SERIES</div>
          )}
        </div>
        <div style={{ padding: '10px 12px 13px', background: '#fff' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#1c1c1e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{film.title}</div>
          <div style={{ fontSize: 11, color: '#8e8e93', marginTop: 2 }}>{film.release_date?.slice(0, 4)}</div>
        </div>
      </div>
    </Link>
  );
}
