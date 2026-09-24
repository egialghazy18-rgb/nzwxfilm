'use client';
import Link from 'next/link';

export default function MovieCard({ film }) {
  return (
    <Link href={`/watch/${film.id}`} style={{ display: 'block' }}>
      <div
        style={{
          borderRadius: 16, overflow: 'hidden',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
          transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
          e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)';
          e.currentTarget.style.boxShadow = '0 32px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)';
          e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.06)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        }}>
        <div style={{ position: 'relative', aspectRatio: '2/3', overflow: 'hidden', background: '#0a0a0a' }}>
          {film.poster
            ? <img src={film.poster} alt={film.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
            : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#1a1a1a' }}>🎬</div>
          }
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }} />

          {/* Rating badge */}
          <div style={{
            position: 'absolute', top: 8, right: 8,
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 8, padding: '3px 8px',
            fontSize: 11, fontWeight: 600, color: '#fff',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
          }}>★ {film.rating?.toFixed(1)}</div>

          {/* Type badge */}
          {film.type === 'tv' && (
            <div style={{
              position: 'absolute', top: 8, left: 8,
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 6, padding: '2px 8px',
              fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: '0.8px',
            }}>SERIES</div>
          )}
        </div>

        <div style={{
          padding: '12px 12px 14px',
          background: 'rgba(255,255,255,0.02)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#f5f5f7', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{film.title}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', marginTop: 3 }}>{film.release_date?.slice(0, 4)}</div>
        </div>
      </div>
    </Link>
  );
}
