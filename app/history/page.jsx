'use client';
import { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTheme } from '../context/ThemeContext';

const KEY = '3a3f8986432b380633bf9670f5fff60a';

export default function HistoryPage() {
  const { dark } = useTheme();
  const [recent, setRecent] = useLocalStorage('recently_viewed', []);
  const [cont, setCont] = useLocalStorage('continue_watching', []);
  const [tab, setTab] = useState('riwayat');
  const [newFilms, setNewFilms] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(false);

  const bg = dark
    ? 'linear-gradient(180deg,#0a0a1a 0%,#0d1b3e 50%,#0a0a1a 100%)'
    : 'linear-gradient(180deg,#dff0fc 0%,#a8d4f5 30%,#1a6bb5 80%,#0b3270 100%)';
  const txt = dark ? '#fff' : '#1a237e';
  const sub = dark ? 'rgba(255,255,255,0.5)' : '#78909c';
  const ic = dark ? '#4fc3f7' : '#1565c0';
  const card = dark ? '#1a2744' : '#1a3a5c';

  useEffect(() => {
    if (tab !== 'baru') return;
    setLoading(true);
    Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${KEY}&language=id-ID&page=1`).then(r => r.json()),
      fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${KEY}&language=id-ID&page=1`).then(r => r.json()),
    ]).then(([movies, series]) => {
      const all = [
        ...(movies.results || []).map(f => ({ ...f, _type: 'movie' })),
        ...(series.results || []).map(f => ({ ...f, _type: 'tv' })),
      ].sort((a, b) => new Date(b.release_date || b.first_air_date) - new Date(a.release_date || a.first_air_date));
      setNewFilms(all.slice(0, 30));
      setLoading(false);
    });
  }, [tab]);

  useEffect(() => {
    if (tab !== 'jadwal') return;
    setLoading(true);
    Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${KEY}&language=id-ID&page=1`).then(r => r.json()),
      fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${KEY}&language=id-ID&page=2`).then(r => r.json()),
      fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${KEY}&language=id-ID&page=1`).then(r => r.json()),
    ]).then(([m1, m2, tv]) => {
      const all = [
        ...(m1.results || []).map(f => ({ ...f, _type: 'movie' })),
        ...(m2.results || []).map(f => ({ ...f, _type: 'movie' })),
        ...(tv.results || []).map(f => ({ ...f, _type: 'tv' })),
      ].sort((a, b) => new Date(a.release_date || a.first_air_date) - new Date(b.release_date || b.first_air_date));
      setUpcoming(all.slice(0, 40));
      setLoading(false);
    });
  }, [tab]);

  const tabs = [
    { id: 'riwayat', label: 'Riwayat', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
    { id: 'baru', label: 'Film Baru', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
    { id: 'jadwal', label: 'Jadwal Rilis', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="12" y1="14" x2="12" y2="18"/><line x1="10" y1="16" x2="14" y2="16"/></svg> },
  ];

  const FilmRow = ({ f }) => {
    const date = f.release_date || f.first_air_date;
    const poster = f.poster_path ? `https://image.tmdb.org/t/p/w185${f.poster_path}` : null;
    const title = f.title || f.name;
    const isNew = date && (new Date() - new Date(date)) < 7 * 24 * 60 * 60 * 1000;
    const isToday = date === new Date().toISOString().slice(0,10);
    const isFuture = date && new Date(date) > new Date();

    return (
      <a href={`/watch/${f.id}`} style={{ display:'flex', gap:12, textDecoration:'none', background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)', backdropFilter:'blur(12px)', borderRadius:16, padding:12, border: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.8)' }}>
        <div style={{ width:60, height:90, borderRadius:10, overflow:'hidden', background:card, flexShrink:0, position:'relative' }}>
          {poster && <img src={poster} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />}
          {isFuture && (
            <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
          )}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4, flexWrap:'wrap' }}>
            <p style={{ fontSize:13, fontWeight:700, color:txt, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flex:1 }}>{title}</p>
            {isToday && <span style={{ background:'#22c55e', color:'#fff', fontSize:9, fontWeight:800, padding:'2px 6px', borderRadius:4, flexShrink:0 }}>HARI INI</span>}
            {isNew && !isToday && <span style={{ background:'#e53935', color:'#fff', fontSize:9, fontWeight:800, padding:'2px 6px', borderRadius:4, flexShrink:0 }}>BARU</span>}
            {isFuture && <span style={{ background:'#f59e0b', color:'#fff', fontSize:9, fontWeight:800, padding:'2px 6px', borderRadius:4, flexShrink:0 }}>SOON</span>}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={sub} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span style={{ fontSize:11, color:sub }}>{date ? new Date(date).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' }) : '-'}</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:11, color: f._type === 'tv' ? '#8e24aa' : '#e53935', fontWeight:700, background: f._type === 'tv' ? 'rgba(142,36,170,0.1)' : 'rgba(229,57,53,0.1)', padding:'2px 8px', borderRadius:6 }}>{f._type === 'tv' ? 'SERIES' : 'FILM'}</span>
            <div style={{ display:'flex', alignItems:'center', gap:3 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span style={{ fontSize:11, color:sub, fontWeight:600 }}>{f.vote_average?.toFixed(1)}</span>
            </div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={sub} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </a>
    );
  };

  // Group upcoming by month
  const groupByMonth = (films) => {
    const groups = {};
    films.forEach(f => {
      const date = f.release_date || f.first_air_date;
      if (!date) return;
      const key = new Date(date).toLocaleDateString('id-ID', { month:'long', year:'numeric' });
      if (!groups[key]) groups[key] = [];
      groups[key].push(f);
    });
    return groups;
  };

  return (
    <main style={{ minHeight:'100vh', background:bg, paddingBottom:100 }}>
      <div style={{ maxWidth:900, margin:'0 auto', padding:'60px 16px 80px' }}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ic} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <h1 style={{ fontSize:22, fontWeight:800, color:txt }}>Riwayat</h1>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:6, marginBottom:24, background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)', borderRadius:14, padding:4 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:5,
              padding:'10px 4px', borderRadius:10, border:'none', cursor:'pointer',
              background: tab === t.id ? '#1565c0' : 'transparent',
              color: tab === t.id ? '#fff' : sub,
              fontWeight: tab === t.id ? 700 : 500,
              fontSize:12, transition:'all 0.2s',
            }}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        {/* Tab Riwayat */}
        {tab === 'riwayat' && (
          <>
            {cont.length > 0 && (
              <div style={{ marginBottom:32 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                  <h2 style={{ fontSize:16, fontWeight:700, color:txt, paddingLeft:12, borderLeft:'4px solid #4fc3f7', display:'flex', alignItems:'center', gap:8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={ic}><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    Lanjut Nonton
                  </h2>
                  <button onClick={() => setCont([])} style={{ fontSize:12, color:'#e53935', background:'none', border:'none', cursor:'pointer', fontWeight:600 }}>Hapus Semua</button>
                </div>
                <div style={{ display:'flex', gap:12, overflowX:'auto', paddingBottom:8, scrollbarWidth:'none' }}>
                  {cont.map(f => (
                    <a key={f.id} href={`/watch/${f.id}`} style={{ textDecoration:'none', flexShrink:0, width:120 }}>
                      <div style={{ borderRadius:12, overflow:'hidden', aspectRatio:'2/3', background:card, position:'relative' }}>
                        {f.poster && <img src={f.poster} alt={f.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />}
                        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 50%)' }} />
                        <div style={{ position:'absolute', bottom:6, left:6, right:6 }}>
                          <p style={{ fontSize:10, fontWeight:700, color:'#fff', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{f.title}</p>
                          {f.season && <p style={{ fontSize:9, color:'rgba(255,255,255,0.7)' }}>S{f.season} E{f.episode}</p>}
                        </div>
                        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:32, height:32, borderRadius:'50%', background:'rgba(255,255,255,0.85)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="#1565c0"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                <h2 style={{ fontSize:16, fontWeight:700, color:txt, paddingLeft:12, borderLeft:'4px solid #4fc3f7', display:'flex', alignItems:'center', gap:8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ic} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Terakhir Dilihat
                </h2>
                {recent.length > 0 && <button onClick={() => setRecent([])} style={{ fontSize:12, color:'#e53935', background:'none', border:'none', cursor:'pointer', fontWeight:600 }}>Hapus Semua</button>}
              </div>
              {recent.length === 0 ? (
                <div style={{ textAlign:'center', padding:'40px 0', color:sub }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={sub} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom:10 }}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <p style={{ fontWeight:600 }}>Belum ada riwayat</p>
                </div>
              ) : (
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(130px, 1fr))', gap:12 }}>
                  {recent.map(f => (
                    <a key={f.id} href={`/watch/${f.id}`} style={{ display:'block', textDecoration:'none' }}>
                      <div style={{ borderRadius:14, overflow:'hidden', aspectRatio:'2/3', background:card, position:'relative' }}>
                        {f.poster && <img src={f.poster} alt={f.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />}
                        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 50%)' }} />
                        <div style={{ position:'absolute', bottom:8, left:8, right:8 }}>
                          <p style={{ fontSize:11, fontWeight:700, color:'#fff', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{f.title}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Tab Film Baru */}
        {tab === 'baru' && (
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
              <h2 style={{ fontSize:16, fontWeight:700, color:txt, paddingLeft:12, borderLeft:'4px solid #4fc3f7' }}>Baru Masuk</h2>
              <span style={{ fontSize:11, color:sub }}>Update hari ini</span>
            </div>
            {loading ? (
              <div style={{ textAlign:'center', padding:'40px 0', color:sub }}>
                <div style={{ width:32, height:32, border:`3px solid ${ic}`, borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 12px' }} />
                <p>Memuat...</p>
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {newFilms.map(f => <FilmRow key={f.id} f={f} />)}
              </div>
            )}
          </div>
        )}

        {/* Tab Jadwal Rilis */}
        {tab === 'jadwal' && (
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
              <h2 style={{ fontSize:16, fontWeight:700, color:txt, paddingLeft:12, borderLeft:'4px solid #f59e0b' }}>Jadwal Rilis</h2>
              <span style={{ fontSize:11, color:sub }}>Film & Series mendatang</span>
            </div>
            {loading ? (
              <div style={{ textAlign:'center', padding:'40px 0', color:sub }}>
                <div style={{ width:32, height:32, border:`3px solid ${ic}`, borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 12px' }} />
                <p>Memuat jadwal...</p>
              </div>
            ) : (
              Object.entries(groupByMonth(upcoming)).map(([month, films]) => (
                <div key={month} style={{ marginBottom:24 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                    <div style={{ height:1, flex:1, background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(21,101,192,0.15)' }} />
                    <span style={{ fontSize:12, fontWeight:700, color:'#f59e0b', background: dark ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.1)', padding:'4px 12px', borderRadius:20, border:'1px solid rgba(245,158,11,0.3)' }}>{month}</span>
                    <div style={{ height:1, flex:1, background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(21,101,192,0.15)' }} />
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                    {films.map(f => <FilmRow key={f.id} f={f} />)}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </main>
  );
}
