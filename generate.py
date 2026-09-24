import os

BASE = os.path.expanduser("~/nzwxfilm/app")

files = {}

# ─── globals.css ───
files[f"{BASE}/globals.css"] = """@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;700&display=swap');

:root {
  --bg-void: #04060f;
  --accent-cyan: #00e5ff;
  --accent-violet: #7c3aed;
  --glass-bg: rgba(255,255,255,0.04);
  --glass-border: rgba(255,255,255,0.08);
  --text-primary: #e8eaf6;
  --text-muted: #6b7280;
}
* { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; }
body {
  background: var(--bg-void);
  color: var(--text-primary);
  font-family: 'Space Grotesk', sans-serif;
  overflow-x: hidden;
}
body::before {
  content:'';
  position:fixed;
  top:-30%; left:-20%;
  width:60%; height:60%;
  background:radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%);
  pointer-events:none; z-index:0;
}
body::after {
  content:'';
  position:fixed;
  bottom:-20%; right:-10%;
  width:50%; height:50%;
  background:radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%);
  pointer-events:none; z-index:0;
}
h1,h2,h3,h4 { font-family:'Outfit',sans-serif; font-weight:700; letter-spacing:-0.02em; }
a { text-decoration:none; color:inherit; }
::-webkit-scrollbar { width:4px; }
::-webkit-scrollbar-thumb { background:var(--accent-violet); border-radius:2px; }
"""

# ─── .env.local ───
files[f"{BASE}/../.env.local"] = "NEXT_PUBLIC_TMDB_KEY=3a3f8986432b380633bf9670f5fff60a\n"

# ─── layout.jsx ───
files[f"{BASE}/layout.jsx"] = """import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'NzwxFilm',
  description: 'Nonton film online gratis',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        {children}
        <footer style={{borderTop:'1px solid rgba(255,255,255,0.06)',padding:'24px',textAlign:'center',color:'#374151',fontSize:13}}>
          © 2026 NzwxFilm · Data by TMDB · Educational use only
        </footer>
      </body>
    </html>
  );
}
"""

# ─── page.jsx (homepage) ───
files[f"{BASE}/page.jsx"] = """import Link from 'next/link';

const API = '3a3f8986432b380633bf9670f5fff60a';
const IMG = 'https://image.tmdb.org/t/p/w500';
const IMG_BIG = 'https://image.tmdb.org/t/p/original';

async function getData() {
  const [t, p] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API}&language=id-ID`,{next:{revalidate:3600}}).then(r=>r.json()),
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API}&language=id-ID`,{next:{revalidate:3600}}).then(r=>r.json()),
  ]);
  return { trending: t.results || [], popular: p.results || [] };
}

export default async function Home() {
  const { trending, popular } = await getData();
  const hero = trending[0];

  return (
    <main style={{minHeight:'100vh',position:'relative',zIndex:1}}>
      {/* Hero */}
      <section style={{position:'relative',height:'90vh',minHeight:520,overflow:'hidden',display:'flex',alignItems:'flex-end',paddingBottom:60}}>
        {hero?.backdrop_path && (
          <img src={`${IMG_BIG}${hero.backdrop_path}`} alt={hero.title} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.35}} />
        )}
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to right,rgba(4,6,15,0.95) 40%,rgba(4,6,15,0.2))'}} />
        <div style={{position:'absolute',bottom:0,left:0,right:0,height:'40%',background:'linear-gradient(to top,#04060f,transparent)'}} />
        <div style={{position:'relative',maxWidth:1280,margin:'0 auto',padding:'0 24px',width:'100%'}}>
          <div style={{maxWidth:520}}>
            <div style={{display:'inline-flex',alignItems:'center',background:'rgba(0,229,255,0.08)',border:'1px solid rgba(0,229,255,0.2)',borderRadius:100,padding:'4px 12px',fontSize:11,fontWeight:500,color:'#00e5ff',letterSpacing:'0.05em',marginBottom:16}}>
              TRENDING MINGGU INI
            </div>
            <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(28px,5vw,52px)',fontWeight:700,letterSpacing:'-0.03em',lineHeight:1.1,color:'#e8eaf6',marginBottom:14}}>
              {hero?.title}
            </h1>
            <p style={{fontSize:14,color:'#9ca3af',lineHeight:1.7,marginBottom:24,maxWidth:420,display:'-webkit-box',WebkitLineClamp:3,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
              {hero?.overview}
            </p>
            <div style={{display:'flex',gap:12,alignItems:'center'}}>
              <Link href={`/watch/${hero?.id}`} style={{display:'inline-flex',alignItems:'center',gap:8,padding:'12px 28px',background:'linear-gradient(135deg,#7c3aed,#5b21b6)',border:'1px solid rgba(124,58,237,0.5)',borderRadius:100,color:'white',fontWeight:600,fontSize:14,boxShadow:'0 0 24px rgba(124,58,237,0.35)'}}>
                ▶ Tonton Sekarang
              </Link>
              <span style={{fontSize:13,color:'#9ca3af'}}>⭐ {hero?.vote_average?.toFixed(1)} · {hero?.release_date?.slice(0,4)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <div style={{maxWidth:1280,margin:'0 auto',padding:'0 24px 80px'}}>
        <Section title="🔥 Trending" href="/trending" films={trending.slice(0,10)} />
        <Section title="🎬 Film Populer" href="/movies" films={popular.slice(0,12)} />
      </div>
    </main>
  );
}

function Section({ title, href, films }) {
  return (
    <section style={{marginBottom:56}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <h2 style={{fontFamily:'Outfit,sans-serif',fontSize:20,fontWeight:700,color:'#e8eaf6'}}>{title}</h2>
        <Link href={href} style={{fontSize:13,color:'#00e5ff',fontWeight:500}}>Lihat semua →</Link>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:16}}>
        {films.map(f => <FilmCard key={f.id} film={f} />)}
      </div>
    </section>
  );
}

function FilmCard({ film }) {
  const IMG = 'https://image.tmdb.org/t/p/w500';
  return (
    <Link href={`/watch/${film.id}`}>
      <div style={{borderRadius:12,overflow:'hidden',border:'1px solid rgba(255,255,255,0.07)',background:'rgba(255,255,255,0.03)',transition:'transform 0.2s ease,border-color 0.2s ease'}}
        onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.borderColor='rgba(0,229,255,0.25)'}}
        onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'}}>
        <div style={{position:'relative',aspectRatio:'2/3',overflow:'hidden'}}>
          {film.poster_path
            ? <img src={`${IMG}${film.poster_path}`} alt={film.title} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} />
            : <div style={{width:'100%',height:'100%',background:'#1a0a2e',display:'flex',alignItems:'center',justifyContent:'center',fontSize:40}}>🎬</div>
          }
          <div style={{position:'absolute',top:8,right:8,background:'rgba(4,6,15,0.8)',backdropFilter:'blur(8px)',border:'1px solid rgba(251,191,36,0.3)',borderRadius:8,padding:'3px 8px',fontSize:11,fontWeight:600,color:'#fbbf24'}}>
            ⭐ {film.vote_average?.toFixed(1)}
          </div>
          <div style={{position:'absolute',bottom:0,left:0,right:0,height:'50%',background:'linear-gradient(to top,rgba(4,6,15,0.9),transparent)'}} />
        </div>
        <div style={{padding:'10px 12px'}}>
          <div style={{fontSize:13,fontWeight:600,color:'#e8eaf6',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',fontFamily:'Outfit,sans-serif'}}>{film.title}</div>
          <div style={{fontSize:11,color:'#6b7280',marginTop:3}}>{film.release_date?.slice(0,4)}</div>
        </div>
      </div>
    </Link>
  );
}
"""

# ─── components/Navbar.jsx ───
files[f"{BASE}/components/Navbar.jsx"] = """'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { href:'/', label:'Home' },
    { href:'/movies', label:'Movies' },
    { href:'/series', label:'Series' },
    { href:'/trending', label:'Trending' },
    { href:'/search', label:'Search' },
  ];

  return (
    <nav style={{
      position:'fixed',top:0,left:0,right:0,zIndex:100,
      padding:'12px 24px',
      display:'flex',alignItems:'center',justifyContent:'space-between',
      background: scrolled ? 'rgba(4,6,15,0.88)' : 'rgba(4,6,15,0.4)',
      backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      transition:'all 0.3s ease',
    }}>
      <Link href="/" style={{display:'flex',alignItems:'center',gap:10}}>
        <div style={{width:34,height:34,borderRadius:10,background:'linear-gradient(135deg,#7c3aed,#00e5ff)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,fontWeight:700,color:'white',boxShadow:'0 0 16px rgba(124,58,237,0.4)'}}>N</div>
        <span style={{fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:19,background:'linear-gradient(135deg,#e8eaf6,#00e5ff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',letterSpacing:'-0.03em'}}>NzwxFilm</span>
      </Link>

      <div style={{display:'flex',alignItems:'center',gap:4,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:100,padding:'4px 6px'}}>
        {links.map(l => (
          <Link key={l.href} href={l.href} style={{
            padding:'6px 14px',borderRadius:100,fontSize:13,fontWeight:500,
            color: pathname===l.href ? '#00e5ff' : '#9ca3af',
            background: pathname===l.href ? 'rgba(0,229,255,0.1)' : 'transparent',
            border: pathname===l.href ? '1px solid rgba(0,229,255,0.2)' : '1px solid transparent',
            transition:'all 0.2s ease',
          }}>{l.label}</Link>
        ))}
      </div>

      <Link href="/search" style={{width:36,height:36,borderRadius:'50%',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'center',color:'#9ca3af',fontSize:16}}>🔍</Link>
    </nav>
  );
}
"""

# ─── components/MovieCard.jsx ───
files[f"{BASE}/components/MovieCard.jsx"] = """'use client';
import Link from 'next/link';

const IMG = 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({ film }) {
  return (
    <Link href={`/watch/${film.id}`}>
      <div style={{borderRadius:12,overflow:'hidden',border:'1px solid rgba(255,255,255,0.07)',background:'rgba(255,255,255,0.03)',transition:'transform 0.2s ease,border-color 0.2s ease,box-shadow 0.2s ease'}}
        onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.borderColor='rgba(0,229,255,0.25)';e.currentTarget.style.boxShadow='0 16px 40px rgba(0,0,0,0.4)'}}
        onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.borderColor='rgba(255,255,255,0.07)';e.currentTarget.style.boxShadow='none'}}>
        <div style={{position:'relative',aspectRatio:'2/3',overflow:'hidden'}}>
          {film.poster
            ? <img src={film.poster} alt={film.title} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} />
            : <div style={{width:'100%',height:'100%',background:'#1a0a2e',display:'flex',alignItems:'center',justifyContent:'center',fontSize:36}}>🎬</div>
          }
          <div style={{position:'absolute',top:8,right:8,background:'rgba(4,6,15,0.8)',backdropFilter:'blur(8px)',border:'1px solid rgba(251,191,36,0.3)',borderRadius:8,padding:'3px 8px',fontSize:11,fontWeight:600,color:'#fbbf24'}}>
            ⭐ {film.rating?.toFixed(1)}
          </div>
          <div style={{position:'absolute',bottom:0,left:0,right:0,height:'50%',background:'linear-gradient(to top,rgba(4,6,15,0.9),transparent)'}} />
        </div>
        <div style={{padding:'10px 12px'}}>
          <div style={{fontSize:13,fontWeight:600,color:'#e8eaf6',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',fontFamily:'Outfit,sans-serif'}}>{film.title}</div>
          <div style={{fontSize:11,color:'#6b7280',marginTop:3}}>{film.release_date?.slice(0,4)}</div>
        </div>
      </div>
    </Link>
  );
}
"""

# ─── lib/tmdb.js ───
files[f"{BASE}/lib/tmdb.js"] = """const KEY = process.env.NEXT_PUBLIC_TMDB_KEY || '3a3f8986432b380633bf9670f5fff60a';
const BASE = 'https://api.themoviedb.org/3';
export const IMG = 'https://image.tmdb.org/t/p/w500';
export const IMG_BIG = 'https://image.tmdb.org/t/p/original';

async function tmdb(path, params={}) {
  const url = new URL(`${BASE}${path}`);
  url.searchParams.set('api_key', KEY);
  url.searchParams.set('language', 'id-ID');
  Object.entries(params).forEach(([k,v]) => url.searchParams.set(k,v));
  const res = await fetch(url.toString(), { next:{ revalidate:3600 } });
  return res.json();
}

export const getPopular = (page=1) => tmdb('/movie/popular',{page});
export const getTrending = () => tmdb('/trending/movie/week');
export const getTopRated = (page=1) => tmdb('/movie/top_rated',{page});
export const searchMovies = (query,page=1) => tmdb('/search/movie',{query,page});
export const getMovieDetail = (id) => tmdb(`/movie/${id}`,{append_to_response:'credits,videos,similar'});
export const getPopularSeries = (page=1) => tmdb('/tv/popular',{page});
export const getTrendingSeries = () => tmdb('/trending/tv/week');

export function fmt(f) {
  return {
    id: f.id,
    title: f.title || f.name,
    overview: f.overview,
    rating: f.vote_average,
    release_date: f.release_date || f.first_air_date,
    poster: f.poster_path ? `${IMG}${f.poster_path}` : null,
    backdrop: f.backdrop_path ? `${IMG_BIG}${f.backdrop_path}` : null,
    embed_url: f.title ? `https://vidsrc.to/embed/movie/${f.id}` : `https://vidsrc.to/embed/tv/${f.id}`,
    type: f.title ? 'movie' : 'tv',
  };
}
"""

# ─── watch/[id]/page.jsx ───
files[f"{BASE}/watch/[id]/page.jsx"] = """const KEY = '3a3f8986432b380633bf9670f5fff60a';
const IMG = 'https://image.tmdb.org/t/p/w500';
const IMG_BIG = 'https://image.tmdb.org/t/p/original';

export default async function WatchPage({ params }) {
  const { id } = params;
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=id-ID&append_to_response=credits,similar`,{next:{revalidate:3600}});
  const film = await res.json();
  const similar = film.similar?.results?.slice(0,6) || [];
  const embedUrl = `https://vidsrc.to/embed/movie/${id}`;

  return (
    <main style={{minHeight:'100vh',paddingTop:72,position:'relative',zIndex:1}}>
      {film.backdrop_path && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,backgroundImage:`url(${IMG_BIG}${film.backdrop_path})`,backgroundSize:'cover',backgroundPosition:'center',opacity:0.06,zIndex:0,pointerEvents:'none'}} />
      )}
      <div style={{maxWidth:1280,margin:'0 auto',padding:'24px 24px 80px',position:'relative',zIndex:1}}>

        {/* Player */}
        <div style={{borderRadius:16,overflow:'hidden',border:'1px solid rgba(255,255,255,0.07)',marginBottom:32,background:'#000',boxShadow:'0 24px 80px rgba(0,0,0,0.6)',aspectRatio:'16/9'}}>
          <iframe src={embedUrl} style={{width:'100%',height:'100%',border:'none',display:'block'}} allowFullScreen allow="autoplay; fullscreen" />
        </div>

        {/* Info */}
        <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(22px,3vw,36px)',fontWeight:700,letterSpacing:'-0.03em',color:'#e8eaf6',marginBottom:12}}>{film.title}</h1>

        <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:16,flexWrap:'wrap'}}>
          <span style={{background:'rgba(0,229,255,0.1)',border:'1px solid rgba(0,229,255,0.25)',borderRadius:100,padding:'3px 12px',fontSize:12,color:'#00e5ff',fontWeight:500}}>{film.release_date?.slice(0,4)}</span>
          <span style={{color:'#fbbf24',fontSize:13,fontWeight:600}}>⭐ {film.vote_average?.toFixed(1)}</span>
          {film.runtime && <span style={{color:'#6b7280',fontSize:13}}>{Math.floor(film.runtime/60)}j {film.runtime%60}m</span>}
        </div>

        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:20}}>
          {film.genres?.map(g => (
            <span key={g.id} style={{background:'rgba(124,58,237,0.1)',border:'1px solid rgba(124,58,237,0.25)',borderRadius:100,padding:'3px 12px',fontSize:12,color:'#a78bfa',fontWeight:500}}>{g.name}</span>
          ))}
        </div>

        <p style={{fontSize:14,lineHeight:1.75,color:'#9ca3af',maxWidth:680,marginBottom:40}}>{film.overview || 'Sinopsis tidak tersedia.'}</p>

        {/* Cast */}
        {film.credits?.cast?.length > 0 && (
          <div style={{marginBottom:40}}>
            <h3 style={{fontSize:11,fontWeight:600,color:'#6b7280',letterSpacing:'0.05em',textTransform:'uppercase',marginBottom:14}}>PEMERAN</h3>
            <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
              {film.credits.cast.slice(0,8).map(a => (
                <div key={a.id} style={{display:'flex',alignItems:'center',gap:8,padding:'8px 12px',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:10}}>
                  <div style={{width:30,height:30,borderRadius:'50%',overflow:'hidden',background:'#1a0a2e',flexShrink:0}}>
                    {a.profile_path && <img src={`${IMG}${a.profile_path}`} alt={a.name} style={{width:'100%',height:'100%',objectFit:'cover'}} />}
                  </div>
                  <div>
                    <div style={{fontSize:12,fontWeight:500,color:'#e8eaf6'}}>{a.name}</div>
                    <div style={{fontSize:11,color:'#6b7280'}}>{a.character}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar */}
        {similar.length > 0 && (
          <div>
            <h2 style={{fontFamily:'Outfit,sans-serif',fontSize:18,fontWeight:700,color:'#e8eaf6',marginBottom:16}}>Film Serupa</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:14}}>
              {similar.map(f => (
                <a key={f.id} href={`/watch/${f.id}`}>
                  <div style={{borderRadius:10,overflow:'hidden',border:'1px solid rgba(255,255,255,0.07)'}}>
                    {f.poster_path && <img src={`${IMG}${f.poster_path}`} alt={f.title} style={{width:'100%',aspectRatio:'2/3',objectFit:'cover',display:'block'}} />}
                    <div style={{padding:'8px 10px',background:'rgba(255,255,255,0.03)'}}>
                      <div style={{fontSize:12,fontWeight:500,color:'#e8eaf6',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{f.title}</div>
                    </div>
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
"""

# ─── search/page.jsx ───
files[f"{BASE}/search/page.jsx"] = """"use client";
import { useState } from 'react';

const KEY = '3a3f8986432b380633bf9670f5fff60a';
const IMG = 'https://image.tmdb.org/t/p/w500';

export default function SearchPage() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const search = async (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    setLoading(true); setDone(true);
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=id-ID&query=${encodeURIComponent(q)}`);
    const data = await res.json();
    setResults(data.results || []);
    setLoading(false);
  };

  return (
    <main style={{minHeight:'100vh',paddingTop:100,position:'relative',zIndex:1}}>
      <div style={{maxWidth:1280,margin:'0 auto',padding:'0 24px 80px'}}>
        <div style={{textAlign:'center',marginBottom:40}}>
          <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(28px,4vw,48px)',fontWeight:700,letterSpacing:'-0.03em',background:'linear-gradient(135deg,#e8eaf6,#00e5ff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',marginBottom:8}}>Cari Film</h1>
          <p style={{color:'#6b7280',fontSize:14}}>Temukan film favoritmu dari jutaan judul</p>
        </div>

        <form onSubmit={search} style={{maxWidth:560,margin:'0 auto 48px',display:'flex',gap:10}}>
          <div style={{flex:1,display:'flex',alignItems:'center',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:100,padding:'0 16px',backdropFilter:'blur(16px)'}}>
            <span style={{color:'#6b7280',marginRight:10}}>🔍</span>
            <input type="text" value={q} onChange={e=>setQ(e.target.value)} placeholder="Judul film, aktor..."
              style={{flex:1,background:'transparent',border:'none',outline:'none',color:'#e8eaf6',fontSize:14,padding:'14px 0',fontFamily:'Space Grotesk,sans-serif'}} />
          </div>
          <button type="submit" style={{padding:'0 24px',background:'linear-gradient(135deg,#7c3aed,#5b21b6)',border:'none',borderRadius:100,color:'white',fontWeight:600,fontSize:14,cursor:'pointer',fontFamily:'Space Grotesk,sans-serif',boxShadow:'0 0 20px rgba(124,58,237,0.35)',whiteSpace:'nowrap'}}>Cari</button>
        </form>

        {loading && <div style={{textAlign:'center',color:'#6b7280',padding:'40px 0'}}>Mencari...</div>}

        {!loading && done && results.length === 0 && (
          <div style={{textAlign:'center',color:'#6b7280',padding:'40px 0'}}>
            <div style={{fontSize:40,marginBottom:12}}>🎬</div>
            <p>Film tidak ditemukan.</p>
          </div>
        )}

        {results.length > 0 && (
          <>
            <p style={{color:'#6b7280',fontSize:13,marginBottom:20}}>{results.length} hasil untuk <span style={{color:'#e8eaf6'}}>"{q}"</span></p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:16}}>
              {results.map(f => (
                <a key={f.id} href={`/watch/${f.id}`}>
                  <div style={{borderRadius:12,overflow:'hidden',border:'1px solid rgba(255,255,255,0.07)',background:'rgba(255,255,255,0.03)'}}>
                    <div style={{position:'relative',aspectRatio:'2/3'}}>
                      {f.poster_path
                        ? <img src={`${IMG}${f.poster_path}`} alt={f.title} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} />
                        : <div style={{width:'100%',height:'100%',background:'#1a0a2e',display:'flex',alignItems:'center',justifyContent:'center',fontSize:36}}>🎬</div>
                      }
                      <div style={{position:'absolute',top:8,right:8,background:'rgba(4,6,15,0.8)',backdropFilter:'blur(8px)',border:'1px solid rgba(251,191,36,0.3)',borderRadius:8,padding:'3px 8px',fontSize:11,fontWeight:600,color:'#fbbf24'}}>⭐ {f.vote_average?.toFixed(1)}</div>
                    </div>
                    <div style={{padding:'10px 12px'}}>
                      <div style={{fontSize:13,fontWeight:600,color:'#e8eaf6',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',fontFamily:'Outfit,sans-serif'}}>{f.title}</div>
                      <div style={{fontSize:11,color:'#6b7280',marginTop:3}}>{f.release_date?.slice(0,4)}</div>
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
"""

# ─── movies/page.jsx ───
files[f"{BASE}/movies/page.jsx"] = """const KEY = '3a3f8986432b380633bf9670f5fff60a';
const IMG = 'https://image.tmdb.org/t/p/w500';

export default async function MoviesPage() {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=id-ID&page=1`,{next:{revalidate:3600}});
  const data = await res.json();
  const films = data.results || [];

  return (
    <main style={{minHeight:'100vh',paddingTop:100,position:'relative',zIndex:1}}>
      <div style={{maxWidth:1280,margin:'0 auto',padding:'0 24px 80px'}}>
        <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(28px,4vw,44px)',fontWeight:700,letterSpacing:'-0.03em',color:'#e8eaf6',marginBottom:8}}>🎬 Film Populer</h1>
        <p style={{color:'#6b7280',fontSize:14,marginBottom:32}}>Film terpopuler minggu ini</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:16}}>
          {films.map(f => (
            <a key={f.id} href={`/watch/${f.id}`}>
              <div style={{borderRadius:12,overflow:'hidden',border:'1px solid rgba(255,255,255,0.07)',background:'rgba(255,255,255,0.03)'}}>
                <div style={{position:'relative',aspectRatio:'2/3'}}>
                  {f.poster_path ? <img src={`${IMG}${f.poster_path}`} alt={f.title} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} /> : <div style={{width:'100%',height:'100%',background:'#1a0a2e',display:'flex',alignItems:'center',justifyContent:'center',fontSize:36}}>🎬</div>}
                  <div style={{position:'absolute',top:8,right:8,background:'rgba(4,6,15,0.8)',backdropFilter:'blur(8px)',border:'1px solid rgba(251,191,36,0.3)',borderRadius:8,padding:'3px 8px',fontSize:11,fontWeight:600,color:'#fbbf24'}}>⭐ {f.vote_average?.toFixed(1)}</div>
                </div>
                <div style={{padding:'10px 12px'}}>
                  <div style={{fontSize:13,fontWeight:600,color:'#e8eaf6',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',fontFamily:'Outfit,sans-serif'}}>{f.title}</div>
                  <div style={{fontSize:11,color:'#6b7280',marginTop:3}}>{f.release_date?.slice(0,4)}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
"""

# ─── trending/page.jsx ───
files[f"{BASE}/trending/page.jsx"] = """const KEY = '3a3f8986432b380633bf9670f5fff60a';
const IMG = 'https://image.tmdb.org/t/p/w500';

export default async function TrendingPage() {
  const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}&language=id-ID`,{next:{revalidate:3600}});
  const data = await res.json();
  const films = data.results || [];

  return (
    <main style={{minHeight:'100vh',paddingTop:100,position:'relative',zIndex:1}}>
      <div style={{maxWidth:1280,margin:'0 auto',padding:'0 24px 80px'}}>
        <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(28px,4vw,44px)',fontWeight:700,letterSpacing:'-0.03em',color:'#e8eaf6',marginBottom:8}}>🔥 Trending</h1>
        <p style={{color:'#6b7280',fontSize:14,marginBottom:32}}>Film trending minggu ini</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:16}}>
          {films.map(f => (
            <a key={f.id} href={`/watch/${f.id}`}>
              <div style={{borderRadius:12,overflow:'hidden',border:'1px solid rgba(255,255,255,0.07)',background:'rgba(255,255,255,0.03)'}}>
                <div style={{position:'relative',aspectRatio:'2/3'}}>
                  {f.poster_path ? <img src={`${IMG}${f.poster_path}`} alt={f.title||f.name} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} /> : <div style={{width:'100%',height:'100%',background:'#1a0a2e',display:'flex',alignItems:'center',justifyContent:'center',fontSize:36}}>🎬</div>}
                  <div style={{position:'absolute',top:8,right:8,background:'rgba(4,6,15,0.8)',backdropFilter:'blur(8px)',border:'1px solid rgba(251,191,36,0.3)',borderRadius:8,padding:'3px 8px',fontSize:11,fontWeight:600,color:'#fbbf24'}}>⭐ {f.vote_average?.toFixed(1)}</div>
                </div>
                <div style={{padding:'10px 12px'}}>
                  <div style={{fontSize:13,fontWeight:600,color:'#e8eaf6',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',fontFamily:'Outfit,sans-serif'}}>{f.title||f.name}</div>
                  <div style={{fontSize:11,color:'#6b7280',marginTop:3}}>{(f.release_date||f.first_air_date)?.slice(0,4)}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
"""

# ─── series/page.jsx ───
files[f"{BASE}/series/page.jsx"] = """const KEY = '3a3f8986432b380633bf9670f5fff60a';
const IMG = 'https://image.tmdb.org/t/p/w500';

export default async function SeriesPage() {
  const res = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${KEY}&language=id-ID`,{next:{revalidate:3600}});
  const data = await res.json();
  const series = data.results || [];

  return (
    <main style={{minHeight:'100vh',paddingTop:100,position:'relative',zIndex:1}}>
      <div style={{maxWidth:1280,margin:'0 auto',padding:'0 24px 80px'}}>
        <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(28px,4vw,44px)',fontWeight:700,letterSpacing:'-0.03em',color:'#e8eaf6',marginBottom:8}}>📺 Series Populer</h1>
        <p style={{color:'#6b7280',fontSize:14,marginBottom:32}}>Series TV terpopuler saat ini</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:16}}>
          {series.map(f => (
            <a key={f.id} href={`/watch/${f.id}`}>
              <div style={{borderRadius:12,overflow:'hidden',border:'1px solid rgba(255,255,255,0.07)',background:'rgba(255,255,255,0.03)'}}>
                <div style={{position:'relative',aspectRatio:'2/3'}}>
                  {f.poster_path ? <img src={`${IMG}${f.poster_path}`} alt={f.name} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} /> : <div style={{width:'100%',height:'100%',background:'#1a0a2e',display:'flex',alignItems:'center',justifyContent:'center',fontSize:36}}>📺</div>}
                  <div style={{position:'absolute',top:8,right:8,background:'rgba(4,6,15,0.8)',backdropFilter:'blur(8px)',border:'1px solid rgba(251,191,36,0.3)',borderRadius:8,padding:'3px 8px',fontSize:11,fontWeight:600,color:'#fbbf24'}}>⭐ {f.vote_average?.toFixed(1)}</div>
                </div>
                <div style={{padding:'10px 12px'}}>
                  <div style={{fontSize:13,fontWeight:600,color:'#e8eaf6',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',fontFamily:'Outfit,sans-serif'}}>{f.name}</div>
                  <div style={{fontSize:11,color:'#6b7280',marginTop:3}}>{f.first_air_date?.slice(0,4)}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
"""

# ─── WRITE ALL FILES ───
for path, content in files.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"[✓] {path.replace(os.path.expanduser('~'), '~')}")

print("\n[DONE] Semua file berhasil dibuat!")
print("Sekarang jalankan: npm run dev")
