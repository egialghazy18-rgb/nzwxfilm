const KEY = '3a3f8986432b380633bf9670f5fff60a';
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
