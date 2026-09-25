'use client';
import Link from 'next/link';

export default function MovieCard({ film }) {
  return (
    <Link href={`/watch/${film.id}`} style={{ display: 'block', textDecoration: 'none' }}>
      <div
        style={{ borderRadius: 16, overflow: 'hidden', position: 'relative', aspectRatio: '2/3', background: '#1a1a2e', transition: 'transform 0.25s ease, box-shadow 0.25s ease', cursor: 'pointer' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(21,101,192,0.45)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
      >
        {film.poster
          ? <img src={film.poster} alt={film.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>🎬</div>
        }
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 55%)' }} />
        {film.type === 'tv' && (
          <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(13,71,161,0.9)', borderRadius: 5, padding: '2px 7px', fontSize: 9, fontWeight: 700, color: '#fff' }}>SERIES</div>
        )}
        <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', borderRadius: 6, padding: '2px 7px', fontSize: 10, fontWeight: 700, color: '#fff' }}>★ {film.rating?.toFixed(1)}</div>
        <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 2 }}>{film.title}</p>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>{film.release_date?.slice(0,4)}</p>
        </div>
      </div>
    </Link>
  );
}