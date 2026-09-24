'use client';
import Link from 'next/link';

export default function MovieCard({ film }) {
  return (
    <Link href={`/watch/${film.id}`} style={{ display: 'block' }}>
      <div
        style={{ borderRadius: 12, overflow: 'hidden', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)', cursor: 'pointer' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'; e.currentTarget.style.border = '1px solid rgba(255,255,255,0.15)'; e.currentTarget.style.boxShadow = '0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)'; e.currentTarget.style.boxShadow = 'none'; }}>
        <div style={{ position: 'relative', aspectRatio: '2/3', overflow: 'hidden', background: '#111' }}>
          {film.poster
            ? <img src={film.poster} alt={film.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
            : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#222' }}>🎬</div>
          }
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
          <div style={{
            position: 'absolute', top: 8, right: 8,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 6, padding: '3px 8px',
            fontSize: 11, fontWeight: 600, color: '#fff',
          }}>★ {film.rating?.toFixed(1)}</div>
          {film.type === 'tv' && (
            <div style={{
              position: 'absolute', top: 8, left: 8,
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 6, padding: '2px 8px',
              fontSize: 10, fontWeight: 600, color: '#fff', letterSpacing: '0.5px',
            }}>TV</div>
          )}
        </div>
        <div style={{ padding: '10px 12px 13px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#f5f5f7', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{film.title}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>{film.release_date?.slice(0, 4)}</div>
        </div>
      </div>
    </Link>
  );
}
