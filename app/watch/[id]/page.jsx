const KEY = '3a3f8986432b380633bf9670f5fff60a';
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
