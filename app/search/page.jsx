"use client";
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
