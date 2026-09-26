'use client';
import { useEffect, useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const KEY = '3a3f8986432b380633bf9670f5fff60a';
const IMG = 'https://image.tmdb.org/t/p/w500';

const GENRES = [
  { id: 28, label: 'Aksi' }, { id: 35, label: 'Komedi' }, { id: 18, label: 'Drama' },
  { id: 27, label: 'Horor' }, { id: 10749, label: 'Romantis' }, { id: 878, label: 'Sci-Fi' },
  { id: 16, label: 'Animasi' }, { id: 53, label: 'Thriller' }, { id: 12, label: 'Petualangan' },
];

const YEARS = ['2026','2025','2024','2023','2022','2021','2020'];
const RATINGS = [{ val: '8', label: '8+' }, { val: '7', label: '7+' }, { val: '6', label: '6+' }];

const IconSearch = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IconMic = ({ color }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>;
const IconFilter = ({ color }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>;
const IconFilm = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>;
const IconX = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconStar = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="#fbbf24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;

export default function SearchPage() {
  const { dark } = useTheme();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [tab, setTab] = useState('movie');
  const [showFilter, setShowFilter] = useState(false);
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const debounce = useRef(null);
  const inputRef = useRef(null);

  const hasFilter = genre || year || rating;

  useEffect(() => {
    clearTimeout(debounce.current);
    debounce.current = setTimeout(async () => {
      if (!query.trim() && !hasFilter) { setResults({}); return; }
      setLoading(true);
      try {
        const base = `https://api.themoviedb.org/3`;
        const params = new URLSearchParams({
          api_key: KEY, language: 'id-ID',
          ...(query && { query }),
          ...(genre && { with_genres: genre }),
          ...(year && { primary_release_year: year, first_air_date_year: year }),
          ...(rating && { 'vote_average.gte': rating }),
        });

        const endpoint = query ? 'search' : 'discover';
        const [rm, rt] = await Promise.all([
          fetch(`${base}/${endpoint}/movie?${params}`).then(r => r.json()),
          fetch(`${base}/${endpoint}/tv?${params}`).then(r => r.json()),
        ]);
        setResults({
          movie: (rm.results || []).map(f => ({ ...f, _type: 'movie' })),
          tv: (rt.results || []).map(f => ({ ...f, _type: 'tv' })),
        });
      } finally { setLoading(false); }
    }, 400);
  }, [query, genre, year, rating]);

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return alert('Browser kamu tidak support voice search');
    const rec = new SR();
    rec.lang = 'id-ID';
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onresult = (e) => { setQuery(e.results[0][0].transcript); inputRef.current?.focus(); };
    rec.onerror = () => setListening(false);
    rec.start();
  };

  const clearFilter = () => { setGenre(''); setYear(''); setRating(''); };

  const bg = dark ? 'linear-gradient(180deg,#0a0a1a 0%,#0d1b3e 100%)' : 'linear-gradient(180deg,#dff0fc 0%,#a8d4f5 30%,#0b3270 100%)';
  const txt = dark ? '#fff' : '#1a237e';
  const inputBg = dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.9)';
  const cardBg = dark ? '#1a2744' : '#fff';
  const list = results[tab] || [];

  return (
    <main style={{ minHeight: '100vh', background: bg, paddingBottom: 100 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 16px 80px' }}>

        {/* Header */}
        <h1 style={{ fontSize: 22, fontWeight: 900, color: txt, marginBottom: 20, letterSpacing: '-0.5px' }}>Cari Film</h1>

        {/* Search bar */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              ref={inputRef} value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Cari film atau series..."
              style={{ width: '100%', padding: '13px 16px 13px 44px', borderRadius: 14, border: dark ? '1.5px solid rgba(255,255,255,0.15)' : '1.5px solid rgba(21,101,192,0.2)', background: inputBg, color: dark ? '#fff' : '#1a237e', fontSize: 14, fontFamily: 'Inter,sans-serif', outline: 'none', boxSizing: 'border-box' }}
            />
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.4, color: dark ? '#fff' : '#1a237e' }}><IconSearch /></span>
            {query && (
              <button onClick={() => setQuery('')} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: dark ? 'rgba(255,255,255,0.5)' : '#90a4ae', display: 'flex', alignItems: 'center' }}>
                <IconX />
              </button>
            )}
          </div>

          {/* Filter button */}
          <button onClick={() => setShowFilter(v => !v)} style={{ width: 50, height: 50, borderRadius: 14, border: 'none', cursor: 'pointer', background: hasFilter ? '#1565c0' : dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', transition: 'all 0.2s' }}>
            <IconFilter color={hasFilter ? '#fff' : dark ? '#4fc3f7' : '#1565c0'} />
            {hasFilter && <div style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: '50%', background: '#4fc3f7', border: '2px solid #1565c0' }} />}
          </button>

          {/* Voice button */}
          <button onClick={startVoice} style={{ width: 50, height: 50, borderRadius: 14, border: 'none', cursor: 'pointer', background: listening ? '#e53935' : dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: listening ? '0 0 0 4px rgba(229,57,53,0.3)' : 'none', transition: 'all 0.2s' }}>
            <IconMic color={listening ? '#fff' : dark ? '#4fc3f7' : '#1565c0'} />
          </button>
        </div>

        {/* Filter panel */}
        {showFilter && (
          <div style={{ background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', borderRadius: 16, padding: '16px', marginBottom: 12, border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.9)' }}>

            {/* Genre */}
            <p style={{ fontSize: 11, fontWeight: 700, color: dark ? 'rgba(255,255,255,0.5)' : '#90a4ae', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 8 }}>Genre</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
              {GENRES.map(g => (
                <button key={g.id} onClick={() => setGenre(genre == g.id ? '' : g.id)} style={{ padding: '5px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'Inter,sans-serif', background: genre == g.id ? '#1565c0' : dark ? 'rgba(255,255,255,0.1)' : 'rgba(21,101,192,0.08)', color: genre == g.id ? '#fff' : dark ? 'rgba(255,255,255,0.7)' : '#1565c0', transition: 'all 0.15s' }}>
                  {g.label}
                </button>
              ))}
            </div>

            {/* Tahun */}
            <p style={{ fontSize: 11, fontWeight: 700, color: dark ? 'rgba(255,255,255,0.5)' : '#90a4ae', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 8 }}>Tahun</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
              {YEARS.map(y => (
                <button key={y} onClick={() => setYear(year === y ? '' : y)} style={{ padding: '5px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'Inter,sans-serif', background: year === y ? '#1565c0' : dark ? 'rgba(255,255,255,0.1)' : 'rgba(21,101,192,0.08)', color: year === y ? '#fff' : dark ? 'rgba(255,255,255,0.7)' : '#1565c0', transition: 'all 0.15s' }}>
                  {y}
                </button>
              ))}
            </div>

            {/* Rating */}
            <p style={{ fontSize: 11, fontWeight: 700, color: dark ? 'rgba(255,255,255,0.5)' : '#90a4ae', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 8 }}>Rating Minimum</p>
            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
              {RATINGS.map(r => (
                <button key={r.val} onClick={() => setRating(rating === r.val ? '' : r.val)} style={{ padding: '5px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'Inter,sans-serif', background: rating === r.val ? '#1565c0' : dark ? 'rgba(255,255,255,0.1)' : 'rgba(21,101,192,0.08)', color: rating === r.val ? '#fff' : dark ? 'rgba(255,255,255,0.7)' : '#1565c0', display: 'flex', alignItems: 'center', gap: 4, transition: 'all 0.15s' }}>
                  <IconStar />{r.label}
                </button>
              ))}
            </div>

            {hasFilter && (
              <button onClick={clearFilter} style={{ fontSize: 12, fontWeight: 700, color: '#e53935', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif', padding: '4px 0', display: 'flex', alignItems: 'center', gap: 4 }}>
                <IconX /> Reset Filter
              </button>
            )}
          </div>
        )}

        {/* Active filter chips */}
        {hasFilter && !showFilter && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
            {genre && <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#1565c0', borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 700, color: '#fff' }}>{GENRES.find(g => g.id == genre)?.label}<button onClick={() => setGenre('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex', padding: 0 }}><IconX /></button></div>}
            {year && <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#1565c0', borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 700, color: '#fff' }}>{year}<button onClick={() => setYear('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex', padding: 0 }}><IconX /></button></div>}
            {rating && <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#1565c0', borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 700, color: '#fff', display: 'flex' }}><IconStar /> {rating}+<button onClick={() => setRating('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex', padding: 0 }}><IconX /></button></div>}
          </div>
        )}

        {listening && (
          <div style={{ textAlign: 'center', padding: 12, marginBottom: 16, background: 'rgba(229,57,53,0.1)', borderRadius: 12, color: '#e53935', fontWeight: 600, fontSize: 13 }}>
            Mendengarkan... Ucapkan nama film
          </div>
        )}

        {/* Tab Film / Series */}
        {(results.movie || hasFilter) && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {[{ val: 'movie', label: `Film (${results.movie?.length || 0})` }, { val: 'tv', label: `Series (${results.tv?.length || 0})` }].map(t => (
              <button key={t.val} onClick={() => setTab(t.val)} style={{ padding: '8px 18px', borderRadius: 100, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, fontFamily: 'Inter,sans-serif', background: tab === t.val ? '#1565c0' : dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.7)', color: tab === t.val ? '#fff' : dark ? 'rgba(255,255,255,0.7)' : '#1565c0' }}>{t.label}</button>
            ))}
          </div>
        )}

        {/* Skeleton */}
        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'calc(50% - 6px) calc(50% - 6px)', gap: 12 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ borderRadius: 14, aspectRatio: '2/3', background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)', animation: 'pulse 1.5s ease-in-out infinite' }} />
            ))}
          </div>
        )}

        {/* Results */}
        {!loading && list.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'calc(50% - 6px) calc(50% - 6px)', gap: 12 }}>
            {list.map(f => (
              <a key={f.id} href={`/watch/${f.id}`} style={{ display: 'block', textDecoration: 'none' }}>
                <div style={{ borderRadius: 14, overflow: 'hidden', background: cardBg, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                  <div style={{ position: 'relative', aspectRatio: '2/3' }}>
                    {f.poster_path
                      ? <img src={`${IMG}${f.poster_path}`} alt={f.title || f.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
                      : <div style={{ width: '100%', height: '100%', background: '#1a237e', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.3 }}><IconFilm /></div>
                    }
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.75) 0%,transparent 50%)' }} />
                    <div style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', borderRadius: 6, padding: '2px 6px', fontSize: 10, fontWeight: 700, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: 3 }}>
                      <IconStar /> {f.vote_average?.toFixed(1)}
                    </div>
                  </div>
                  <div style={{ padding: '7px 8px 9px' }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: dark ? '#fff' : '#1a237e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0 }}>{f.title || f.name}</p>
                    <p style={{ fontSize: 10, color: '#90a4ae', margin: '2px 0 0' }}>{(f.release_date || f.first_air_date)?.slice(0, 4)}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {!loading && (query || hasFilter) && list.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: dark ? 'rgba(255,255,255,0.4)' : '#90a4ae' }}>
            <div style={{ marginBottom: 12, opacity: 0.4 }}><IconFilm /></div>
            <p style={{ fontWeight: 600 }}>Tidak ada hasil ditemukan</p>
          </div>
        )}

        {!query && !hasFilter && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: dark ? 'rgba(255,255,255,0.3)' : '#90a4ae' }}>
            <div style={{ marginBottom: 12, opacity: 0.4 }}><IconFilm /></div>
            <p style={{ fontWeight: 600 }}>Ketik, filter, atau ucapkan nama film</p>
          </div>
        )}
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:0.5}50%{opacity:1}}`}</style>
    </main>
  );
}
