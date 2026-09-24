'use client';
import { useState } from 'react';

const KEY = '3a3f8986432b380633bf9670f5fff60a';
const IMG = 'https://image.tmdb.org/t/p/w500';

export default function SearchPage() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const search = async (query) => {
    if (!query.trim()) return;
    setLoading(true); setDone(false);
    const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${KEY}&language=id-ID&query=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data.results?.filter(r => r.poster_path && (r.media_type === 'movie' || r.media_type === 'tv')) || []);
    setLoading(false); setDone(true);
  };

  return (
    <main style={{ minHeight: '100vh', background: '#f2f2f7', paddingBottom: 100 }}>

      {/* Search Header */}
      <div style={{ padding: '60px 16px 20px', background: '#fff', borderRadius: '0 0 24px 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: 16 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1c1c1e', marginBottom: 16, letterSpacing: '-0.5px' }}>Cari</h1>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: '#f2f2f7', borderRadius: 14,
          padding: '12px 16px', border: '1px solid rgba(0,0,0,0.06)',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            value={q}
            onChange={e => { setQ(e.target.value); search(e.target.value); }}
            placeholder="Film, series, aktor..."
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontSize: 15, color: '#1c1c1e', fontFamily: 'Inter, sans-serif',
            }}
          />
          {q && (
            <button onClick={() => { setQ(''); setResults([]); setDone(false); }} style={{ background: 'none', border: 'none', color: '#8e8e93', fontSize: 18, cursor: 'pointer', padding: 0 }}>✕</button>
          )}
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#8e8e93' }}>Mencari...</div>
        )}

        {!loading && done && results.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p style={{ color: '#8e8e93', fontSize: 14 }}>Tidak ditemukan untuk "{q}"</p>
          </div>
        )}

        {results.length > 0 && (
          <>
            <p style={{ fontSize: 13, color: '#8e8e93', marginBottom: 14 }}>{results.length} hasil untuk "<strong style={{ color: '#1c1c1e' }}>{q}</strong>"</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
              {results.map(f => (
                <a key={f.id} href={`/watch/${f.id}?type=${f.media_type}`} style={{ display: 'block' }}>
                  <div style={{ borderRadius: 14, overflow: 'hidden', background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                    <div style={{ position: 'relative', aspectRatio: '2/3', overflow: 'hidden', background: '#e5e5ea' }}>
                      <img src={`${IMG}${f.poster_path}`} alt={f.title || f.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(255,255,255,0.9)', borderRadius: 8, padding: '3px 8px', fontSize: 11, fontWeight: 700, color: '#1c1c1e' }}>★ {f.vote_average?.toFixed(1)}</div>
                      {f.media_type === 'tv' && (
                        <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.75)', borderRadius: 6, padding: '2px 8px', fontSize: 9, fontWeight: 700, color: '#fff' }}>SERIES</div>
                      )}
                    </div>
                    <div style={{ padding: '10px 12px 13px', background: '#fff' }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#1c1c1e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.title || f.name}</div>
                      <div style={{ fontSize: 11, color: '#8e8e93', marginTop: 2 }}>{(f.release_date || f.first_air_date)?.slice(0, 4)}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
