'use client';
import Link from 'next/link';

export default function MovieCard({ film }) {
  return (
    <Link href={`/watch/${film.id}`} style={{ display: 'block' }}>
      <div style={{ borderRadius: 8, overflow: 'hidden', background: '#1a1a1a', transition: 'all 0.25s', cursor: 'pointer' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.6)'; e.currentTarget.style.zIndex = '10'; e.currentTarget.style.position = 'relative'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}>
        <div style={{ position: 'relative', aspectRatio: '2/3', overflow: 'hidden', background: '#111' }}>
          {film.poster
            ? <img src={film.poster} alt={film.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
            : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: '#333' }}>🎬</div>
          }
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 50%)', opacity: 0, transition: 'opacity 0.25s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0'} />
          <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(229,9,20,0.9)', borderRadius: 4, padding: '2px 7px', fontSize: 10, fontWeight: 700, color: 'white', letterSpacing: '0.5px' }}>
            {film.type === 'tv' ? 'SERIES' : 'FILM'}
          </div>
          <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', borderRadius: 4, padding: '2px 7px', fontSize: 11, fontWeight: 600, color: '#fbbf24' }}>
            ★ {film.rating?.toFixed(1)}
          </div>
        </div>
        <div style={{ padding: '10px 10px 12px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{film.title}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>{film.release_date?.slice(0, 4)}</div>
        </div>
      </div>
    </Link>
  );
}
