'use client';
import { useEffect, useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const KEY = '3a3f8986432b380633bf9670f5fff60a';
const IMG = 'https://image.tmdb.org/t/p/w500';

export default function SearchPage() {
  const { dark } = useTheme();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [tab, setTab] = useState('movie');
  const debounce = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    clearTimeout(debounce.current);
    debounce.current = setTimeout(async () => {
      setLoading(true);
      try {
        const [rm, rt] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=id-ID&query=${encodeURIComponent(query)}`).then(r=>r.json()),
          fetch(`https://api.themoviedb.org/3/search/tv?api_key=${KEY}&language=id-ID&query=${encodeURIComponent(query)}`).then(r=>r.json()),
        ]);
        const movies = (rm.results||[]).map(f=>({...f,_type:'movie'}));
        const tvs = (rt.results||[]).map(f=>({...f,_type:'tv'}));
        setResults({ movie: movies, tv: tvs });
      } finally { setLoading(false); }
    }, 400);
  }, [query]);

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return alert('Browser kamu tidak support voice search');
    const rec = new SR();
    rec.lang = 'id-ID';
    rec.interimResults = false;
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setQuery(text);
      inputRef.current?.focus();
    };
    rec.onerror = () => setListening(false);
    rec.start();
  };

  const bg = dark ? 'linear-gradient(180deg,#0a0a1a 0%,#0d1b3e 100%)' : 'linear-gradient(180deg,#dff0fc 0%,#a8d4f5 30%,#0b3270 100%)';
  const txt = dark ? '#fff' : '#1a237e';
  const inputBg = dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.9)';
  const inputColor = dark ? '#fff' : '#1a237e';

  const list = results[tab] || [];

  return (
    <main style={{ minHeight: '100vh', background: bg, paddingBottom: 100 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 16px 80px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: txt, marginBottom: 20 }}>🔍 Cari Film</h1>

        {/* Search bar + voice */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Cari film atau series..."
              style={{
                width: '100%', padding: '13px 16px 13px 44px',
                borderRadius: 14, border: dark ? '1.5px solid rgba(255,255,255,0.15)' : '1.5px solid rgba(21,101,192,0.2)',
                background: inputBg, color: inputColor,
                fontSize: 14, fontFamily: 'Inter,sans-serif',
                outline: 'none', boxSizing: 'border-box',
              }}
            />
            <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={inputColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            {query && (
              <button onClick={() => setQuery('')} style={{ position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',fontSize:18,color:inputColor,opacity:0.5 }}>✕</button>
            )}
          </div>

          {/* Voice button */}
          <button onClick={startVoice} style={{
            width: 50, height: 50, borderRadius: 14, border: 'none', cursor: 'pointer',
            background: listening ? '#e53935' : dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, flexShrink: 0,
            boxShadow: listening ? '0 0 0 4px rgba(229,57,53,0.3)' : 'none',
            animation: listening ? 'pulse-red 1s ease-in-out infinite' : 'none',
            transition: 'all 0.2s',
          }}>
            🎤
          </button>
        </div>

        {listening && (
          <div style={{ textAlign: 'center', padding: '12px', marginBottom: 16, background: dark ? 'rgba(229,57,53,0.15)' : 'rgba(229,57,53,0.08)', borderRadius: 12, color: '#e53935', fontWeight: 600, fontSize: 13 }}>
            🎤 Mendengarkan... Ucapkan nama film
          </div>
        )}

        {/* Tab movie / tv */}
        {results.movie && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {[{val:'movie',label:`🎬 Film (${results.movie?.length||0})`},{val:'tv',label:`📺 Series (${results.tv?.length||0})`}].map(t => (
              <button key={t.val} onClick={() => setTab(t.val)} style={{
                padding: '8px 18px', borderRadius: 100, border: 'none', cursor: 'pointer',
                fontWeight: 700, fontSize: 13, fontFamily: 'Inter,sans-serif',
                background: tab === t.val ? '#1565c0' : dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.7)',
                color: tab === t.val ? '#fff' : dark ? 'rgba(255,255,255,0.7)' : '#1565c0',
              }}>{t.label}</button>
            ))}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(130px, 1fr))',gap:12 }}>
            {Array.from({length:8}).map((_,i) => (
              <div key={i} style={{ borderRadius:14,aspectRatio:'2/3',background:dark?'rgba(255,255,255,0.07)':'rgba(0,0,0,0.08)',animation:'pulse 1.5s ease-in-out infinite' }} />
            ))}
          </div>
        )}

        {/* Results */}
        {!loading && list.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
            {list.map(f => (
              <a key={f.id} href={`/watch/${f.id}`} style={{ display: 'block', textDecoration: 'none' }}>
                <div style={{ borderRadius: 14, overflow: 'hidden', position: 'relative', aspectRatio: '2/3', background: dark?'#1a2744':'#1a3a5c' }}>
                  {f.poster_path && <img src={`${IMG}${f.poster_path}`} alt={f.title||f.name} style={{ width:'100%',height:'100%',objectFit:'cover',display:'block' }} loading="lazy" />}
                  <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 50%)' }} />
                  <div style={{ position:'absolute',top:8,right:8,background:'rgba(0,0,0,0.55)',backdropFilter:'blur(4px)',borderRadius:6,padding:'2px 7px',fontSize:10,fontWeight:700,color:'#fff' }}>★ {f.vote_average?.toFixed(1)}</div>
                  <div style={{ position:'absolute',bottom:8,left:8,right:8 }}>
                    <p style={{ fontSize:11,fontWeight:700,color:'#fff',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{f.title||f.name}</p>
                    <p style={{ fontSize:10,color:'rgba(255,255,255,0.6)' }}>{(f.release_date||f.first_air_date)?.slice(0,4)}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && query && list.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: dark?'rgba(255,255,255,0.4)':'#90a4ae' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p style={{ fontWeight: 600 }}>Tidak ada hasil untuk "{query}"</p>
          </div>
        )}

        {/* Default state */}
        {!query && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: dark?'rgba(255,255,255,0.3)':'#90a4ae' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎬</div>
            <p style={{ fontWeight: 600 }}>Ketik atau ucapkan nama film</p>
          </div>
        )}
      </div>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes pulse-red { 0%,100%{box-shadow:0 0 0 4px rgba(229,57,53,0.3)} 50%{box-shadow:0 0 0 8px rgba(229,57,53,0.15)} }
      `}</style>
    </main>
  );
}
