'use client';
import { useEffect, useState } from 'react';

const KEY = '3a3f8986432b380633bf9670f5fff60a';
const IMG = 'https://image.tmdb.org/t/p/w500';
const IMG_BIG = 'https://image.tmdb.org/t/p/original';

const SERVERS = [
  { label: 'Server 1', url: (id) => `https://vidsrc.sh/embed/movie?tmdb=${id}` },
  { label: 'Server 2', url: (id) => `https://www.2embed.cc/embed/${id}` },
  { label: 'Server 3', url: (id) => `https://multiembed.mov/?video_id=${id}&tmdb=1` },
];

export default function WatchPage({ params }) {
  const { id } = params;
  const [film, setFilm] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=id-ID&append_to_response=credits,similar`);
      const data = await res.json();
      if (!data.overview) {
        const res2 = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US&append_to_response=credits,similar`);
        const data2 = await res2.json();
        data.overview = data2.overview;
      }
      setFilm(data);
      setSimilar(data.similar?.results?.slice(0, 6) || []);
    }
    load();
  }, [id]);

  if (!film) return (
    <main style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#0a0a0f'}}>
      <div style={{color:'#6b7280',fontSize:14}}>Memuat...</div>
    </main>
  );

  return (
    <main style={{minHeight:'100vh',paddingTop:72,background:'#0a0a0f',position:'relative'}}>
      {film.backdrop_path && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,backgroundImage:`url(${IMG_BIG}${film.backdrop_path})`,backgroundSize:'cover',backgroundPosition:'center',opacity:0.08,zIndex:0,pointerEvents:'none'}} />
      )}
      <div style={{maxWidth:900,margin:'0 auto',padding:'24px 20px 80px',position:'relative',zIndex:1}}>

        {/* Thumbnail + Play */}
        <div style={{position:'relative',borderRadius:16,overflow:'hidden',marginBottom:20,aspectRatio:'16/9',background:'#111'}}>
          {film.backdrop_path && (
            <img src={`${IMG_BIG}${film.backdrop_path}`} alt={film.title} style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.6}} />
          )}
          <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16}}>
            <div style={{fontSize:13,color:'rgba(255,255,255,0.7)',marginBottom:4}}>Pilih server untuk menonton</div>
            <div style={{display:'flex',gap:10,flexWrap:'wrap',justifyContent:'center'}}>
              {SERVERS.map((s, i) => (
                <a
                  key={i}
                  href={s.url(id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display:'flex',alignItems:'center',gap:8,
                    padding:'10px 20px',borderRadius:100,
                    background: i===0 ? 'rgba(0,229,255,0.9)' : 'rgba(255,255,255,0.15)',
                    color: i===0 ? '#000' : '#fff',
                    fontWeight:700,fontSize:13,textDecoration:'none',
                    backdropFilter:'blur(8px)',
                    border: i===0 ? 'none' : '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  {i===0 && <span>▶</span>}
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Info */}
        <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:'#e8eaf6',marginBottom:12}}>{film.title}</h1>

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

        {similar.length > 0 && (
          <div>
            <h2 style={{fontFamily:'Outfit,sans-serif',fontSize:18,fontWeight:700,color:'#e8eaf6',marginBottom:16}}>Film Serupa</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))',gap:12}}>
              {similar.map(f => (
                <a key={f.id} href={`/watch/${f.id}`} style={{textDecoration:'none'}}>
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
