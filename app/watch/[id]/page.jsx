'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const KEY = '3a3f8986432b380633bf9670f5fff60a';
const IMG = 'https://image.tmdb.org/t/p/w500';
const IMG_BIG = 'https://image.tmdb.org/t/p/original';

const SERVERS = [
  { label: 'Server 1', url: (id, type, s, e) => type === 'tv' ? `https://vidsrc.to/embed/tv/${id}/${s}/${e}` : `https://vidsrc.to/embed/movie/${id}` },
  { label: 'Server 2', url: (id, type, s, e) => type === 'tv' ? `https://vidsrc.me/embed/tv?tmdb=${id}&season=${s}&episode=${e}` : `https://vidsrc.me/embed/movie?tmdb=${id}` },
  { label: 'Server 3', url: (id, type, s, e) => type === 'tv' ? `https://embed.su/embed/tv/${id}/${s}/${e}` : `https://embed.su/embed/movie/${id}` },
  { label: 'Server 4', url: (id, type, s, e) => type === 'tv' ? `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${s}&e=${e}` : `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1` },
];

export default function WatchPage({ params }) {
  const { id } = params;
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');

  const [film, setFilm] = useState(null);
  const [server, setServer] = useState(0);
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [isTV, setIsTV] = useState(false);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      let type = typeParam;

      if (!type) {
        const r = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=id-ID`);
        const d = await r.json();
        type = d.success === false ? 'tv' : 'movie';
      }

      const isShow = type === 'tv';
      setIsTV(isShow);

      const endpoint = isShow
        ? `https://api.themoviedb.org/3/tv/${id}?api_key=${KEY}&language=id-ID&append_to_response=credits,similar`
        : `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=id-ID&append_to_response=credits,similar`;

      const res = await fetch(endpoint);
      const data = await res.json();
      setFilm({ ...data, _type: type });
      setSimilar(data.similar?.results?.slice(0, 8) || []);
      setLoading(false);
    }
    load();
  }, [id, typeParam]);

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#dce8f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #1565c0', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ color: '#1565c0', fontWeight: 600 }}>Memuat film...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!film) return null;

  const title = film.title || film.name;
  const date = film.release_date || film.first_air_date;
  const runtime = film.runtime || 0;
  const epCount = film.seasons?.find(s => s.season_number === season)?.episode_count || 20;

  const selectStyle = {
    padding: '8px 14px', borderRadius: 10, border: '1.5px solid rgba(21,101,192,0.2)',
    background: '#fff', color: '#1a237e', fontWeight: 600, fontSize: 13,
    outline: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
  };

  return (
    <main style={{ minHeight: '100vh', background: '#dce8f5', paddingBottom: 100 }}>

      {/* Backdrop blur bg */}
      {film.backdrop_path && (
        <div style={{
          position: 'fixed', inset: 0,
          backgroundImage: `url(${IMG_BIG}${film.backdrop_path})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.06, zIndex: 0, pointerEvents: 'none',
        }} />
      )}

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '16px 16px 80px', position: 'relative', zIndex: 1 }}>

        {/* Back button */}
        <a href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '8px 16px', borderRadius: 100,
          background: 'rgba(255,255,255,0.8)',
          border: '1px solid rgba(255,255,255,0.9)',
          backdropFilter: 'blur(12px)',
          color: '#1565c0', fontSize: 13, fontWeight: 600,
          marginBottom: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Kembali
        </a>

        {/* Player */}
        <div style={{
          borderRadius: 20, overflow: 'hidden',
          marginBottom: 12,
          aspectRatio: '16/9',
          background: '#000',
          boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
          border: '1px solid rgba(255,255,255,0.5)',
        }}>
          <iframe
            key={`${server}-${season}-${episode}`}
            src={SERVERS[server].url(id, film._type, season, episode)}
            title="Player"
            allowFullScreen
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          />
        </div>

        {/* Server tabs */}
        <div style={{
          background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(12px)',
          borderRadius: 16, padding: '12px 14px',
          border: '1px solid rgba(255,255,255,0.9)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          marginBottom: 12,
          display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center',
        }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#78909c', marginRight: 4 }}>Server:</span>
          {SERVERS.map((s, i) => (
            <button key={i} onClick={() => setServer(i)} style={{
              padding: '7px 16px', borderRadius: 100, cursor: 'pointer',
              fontWeight: 600, fontSize: 12,
              background: server === i ? '#1565c0' : 'rgba(21,101,192,0.08)',
              color: server === i ? '#fff' : '#1565c0',
              border: server === i ? '1.5px solid #1565c0' : '1.5px solid rgba(21,101,192,0.2)',
              transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
            }}>{s.label}</button>
          ))}
        </div>

        {/* Season & Episode (TV only) */}
        {isTV && (
          <div style={{
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(12px)',
            borderRadius: 16, padding: '12px 14px',
            border: '1px solid rgba(255,255,255,0.9)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            marginBottom: 12,
            display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center',
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#78909c' }}>Pilih:</span>
            <select value={season} onChange={e => { setSeason(Number(e.target.value)); setEpisode(1); }} style={selectStyle}>
              {(film.seasons || []).filter(s => s.season_number > 0).map(s => (
                <option key={s.season_number} value={s.season_number}>Season {s.season_number}</option>
              ))}
            </select>
            <select value={episode} onChange={e => setEpisode(Number(e.target.value))} style={selectStyle}>
              {Array.from({ length: epCount }, (_, i) => i + 1).map(n => (
                <option key={n} value={n}>Episode {n}</option>
              ))}
            </select>
          </div>
        )}

        {/* Film Info */}
        <div style={{
          background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(12px)',
          borderRadius: 20, padding: '20px',
          border: '1px solid rgba(255,255,255,0.9)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          marginBottom: 14,
        }}>
          <h1 style={{ fontSize: 'clamp(18px,3vw,28px)', fontWeight: 800, color: '#1a237e', marginBottom: 10, letterSpacing: '-0.3px' }}>{title}</h1>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
            {date && <span style={{ background: 'rgba(21,101,192,0.1)', border: '1px solid rgba(21,101,192,0.2)', borderRadius: 100, padding: '3px 12px', fontSize: 12, color: '#1565c0', fontWeight: 600 }}>{date.slice(0, 4)}</span>}
            <span style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 100, padding: '3px 12px', fontSize: 12, color: '#b45309', fontWeight: 600 }}>★ {film.vote_average?.toFixed(1)}</span>
            {runtime > 0 && <span style={{ background: 'rgba(0,0,0,0.05)', borderRadius: 100, padding: '3px 12px', fontSize: 12, color: '#546e7a', fontWeight: 500 }}>{Math.floor(runtime / 60)}j {runtime % 60}m</span>}
            {isTV && <span style={{ background: 'rgba(13,71,161,0.1)', borderRadius: 100, padding: '3px 12px', fontSize: 12, color: '#0d47a1', fontWeight: 600 }}>SERIES</span>}
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
            {film.genres?.map(g => (
              <span key={g.id} style={{ background: 'rgba(21,101,192,0.06)', border: '1px solid rgba(21,101,192,0.15)', borderRadius: 100, padding: '3px 12px', fontSize: 11, color: '#1565c0', fontWeight: 500 }}>{g.name}</span>
            ))}
          </div>

          <p style={{ fontSize: 13, lineHeight: 1.8, color: '#546e7a' }}>{film.overview || 'Sinopsis tidak tersedia.'}</p>
        </div>

        {/* Cast */}
        {film.credits?.cast?.length > 0 && (
          <div style={{
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(12px)',
            borderRadius: 20, padding: '20px',
            border: '1px solid rgba(255,255,255,0.9)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            marginBottom: 14,
          }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#1a237e', marginBottom: 14, letterSpacing: '-0.2px' }}>Pemeran</h3>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {film.credits.cast.slice(0, 8).map(a => (
                <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'rgba(21,101,192,0.05)', border: '1px solid rgba(21,101,192,0.1)', borderRadius: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', background: '#cfd8dc', flexShrink: 0 }}>
                    {a.profile_path && <img src={`${IMG}${a.profile_path}`} alt={a.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#1a237e' }}>{a.name}</div>
                    <div style={{ fontSize: 11, color: '#78909c' }}>{a.character}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar */}
        {similar.length > 0 && (
          <div style={{
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(12px)',
            borderRadius: 20, padding: '20px',
            border: '1px solid rgba(255,255,255,0.9)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1a237e', marginBottom: 14 }}>{isTV ? 'Series Serupa' : 'Film Serupa'}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 10 }}>
              {similar.map(f => (
                <a key={f.id} href={`/watch/${f.id}?type=${isTV ? 'tv' : 'movie'}`} style={{ display: 'block', borderRadius: 12, overflow: 'hidden', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  {f.poster_path && <img src={`${IMG}${f.poster_path}`} alt={f.title || f.name} style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover', display: 'block' }} />}
                  <div style={{ padding: '8px 10px' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#1a237e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.title || f.name}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
