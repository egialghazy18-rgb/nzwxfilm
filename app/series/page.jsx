'use client';
import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const KEY = '3a3f8986432b380633bf9670f5fff60a';
const IMG = 'https://image.tmdb.org/t/p/w500';

const SORTS = [
  { label: 'Popularitas', val: 'popularity.desc', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
  { label: 'Rating', val: 'vote_average.desc', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  { label: 'Terbaru', val: 'first_air_date.desc', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { label: 'Terlama', val: 'first_air_date.asc', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
];

export default function SeriesPage() {
  const { dark } = useTheme();
  const [genres, setGenres] = useState([]);
  const [items, setItems] = useState([]);
  const [genre, setGenre] = useState('');
  const [sort, setSort] = useState('popularity.desc');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${KEY}&language=id-ID`).then(r=>r.json()).then(d=>setGenres(d.genres||[]));
  }, []);

  useEffect(() => { setItems([]); setPage(1); setHasMore(true); }, [genre, sort]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ api_key:KEY, language:'id-ID', sort_by:sort, page, 'vote_count.gte':'20', ...(genre&&{with_genres:genre}) });
    fetch(`https://api.themoviedb.org/3/discover/tv?${params}`).then(r=>r.json()).then(d=>{
      setItems(prev=>page===1?d.results:[...prev,...d.results]);
      setHasMore(page<(d.total_pages||1));
    }).finally(()=>setLoading(false));
  }, [genre, sort, page]);

  const bg = dark?'linear-gradient(180deg,#0a0a1a 0%,#0d1b3e 100%)':'linear-gradient(180deg,#dff0fc 0%,#a8d4f5 30%,#0b3270 100%)';
  const txt = dark?'#fff':'#1a237e';
  const chip = (active) => ({ padding:'7px 14px',borderRadius:100,cursor:'pointer',fontWeight:600,fontSize:12,border:'none',fontFamily:'Inter,sans-serif',background:active?'#1565c0':dark?'rgba(255,255,255,0.1)':'rgba(255,255,255,0.7)',color:active?'#fff':dark?'rgba(255,255,255,0.8)':'#1565c0',transition:'all 0.2s',whiteSpace:'nowrap',display:'flex',alignItems:'center',gap:5 });

  return (
    <main style={{ minHeight:'100vh',background:bg,paddingBottom:100 }}>
      <div style={{ maxWidth:900,margin:'0 auto',padding:'60px 16px 80px' }}>
        <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:20 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={dark?'#4fc3f7':'#1a237e'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>
          <h1 style={{ fontSize:22,fontWeight:800,color:txt }}>Series</h1>
        </div>
        <div style={{ marginBottom:14 }}>
          <p style={{ fontSize:11,fontWeight:700,color:dark?'rgba(255,255,255,0.4)':'#90a4ae',letterSpacing:'0.5px',marginBottom:8 }}>URUTKAN</p>
          <div style={{ display:'flex',gap:8,overflowX:'auto',paddingBottom:4 }}>
            {SORTS.map(s=><button key={s.val} onClick={()=>setSort(s.val)} style={chip(sort===s.val)}>{s.icon}{s.label}</button>)}
          </div>
        </div>
        <div style={{ marginBottom:20 }}>
          <p style={{ fontSize:11,fontWeight:700,color:dark?'rgba(255,255,255,0.4)':'#90a4ae',letterSpacing:'0.5px',marginBottom:8 }}>GENRE</p>
          <div style={{ display:'flex',gap:8,overflowX:'auto',paddingBottom:4 }}>
            <button onClick={()=>setGenre('')} style={chip(!genre)}>Semua</button>
            {genres.map(g=><button key={g.id} onClick={()=>setGenre(String(g.id))} style={chip(genre===String(g.id))}>{g.name}</button>)}
          </div>
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(130px, 1fr))',gap:12 }}>
          {items.map(f=>(
            <a key={f.id} href={`/watch/${f.id}`} style={{ display:'block',textDecoration:'none' }}>
              <div style={{ borderRadius:14,overflow:'hidden',position:'relative',aspectRatio:'2/3',background:dark?'#1a2744':'#1a3a5c' }}>
                {f.poster_path&&<img src={`${IMG}${f.poster_path}`} alt={f.name} style={{ width:'100%',height:'100%',objectFit:'cover',display:'block' }} loading="lazy" />}
                <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 50%)' }} />
                <div style={{ position:'absolute',top:8,right:8,background:'rgba(0,0,0,0.55)',backdropFilter:'blur(4px)',borderRadius:6,padding:'2px 7px',fontSize:10,fontWeight:700,color:'#fff' }}>★ {f.vote_average?.toFixed(1)}</div>
                <div style={{ position:'absolute',bottom:8,left:8,right:8 }}>
                  <p style={{ fontSize:11,fontWeight:700,color:'#fff',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{f.name}</p>
                  <p style={{ fontSize:10,color:'rgba(255,255,255,0.6)' }}>{f.first_air_date?.slice(0,4)}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
        {loading&&<div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(130px, 1fr))',gap:12,marginTop:12 }}>{Array.from({length:8}).map((_,i)=><div key={i} style={{ borderRadius:14,aspectRatio:'2/3',background:dark?'rgba(255,255,255,0.07)':'rgba(0,0,0,0.08)',animation:'pulse 1.5s infinite' }} />)}</div>}
        {!loading&&hasMore&&<button onClick={()=>setPage(p=>p+1)} style={{ display:'block',width:'100%',marginTop:20,padding:12,borderRadius:14,border:'none',background:dark?'rgba(255,255,255,0.1)':'rgba(255,255,255,0.7)',color:dark?'#fff':'#1565c0',fontWeight:700,fontSize:14,cursor:'pointer',fontFamily:'Inter,sans-serif' }}>Muat Lebih Banyak</button>}
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:0.5}50%{opacity:1}}`}</style>
    </main>
  );
}
