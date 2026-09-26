const KEY = '3a3f8986432b380633bf9670f5fff60a';
const IMG = 'https://image.tmdb.org/t/p/w500';

export default async function TrendingPage() {
  const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}&language=id-ID`,{next:{revalidate:3600}});
  const data = await res.json();
  const films = data.results || [];

  return (
    <main style={{minHeight:'100vh',paddingTop:100,position:'relative',zIndex:1}}>
      <div style={{maxWidth:1280,margin:'0 auto',padding:'0 24px 80px'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f57c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
            <polyline points="17 6 23 6 23 12"/>
          </svg>
          <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(24px,4vw,40px)',fontWeight:900,letterSpacing:'-0.03em',color:'#1a237e',margin:0}}>Trending</h1>
        </div>
        <p style={{color:'#78909c',fontSize:13,marginBottom:28,paddingLeft:38}}>Film trending minggu ini</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:16}}>
          {films.map(f => (
            <a key={f.id} href={`/watch/${f.id}`} style={{textDecoration:'none'}}>
              <div style={{borderRadius:14,overflow:'hidden',background:'#fff',boxShadow:'0 2px 12px rgba(0,0,0,0.10)',transition:'transform 0.15s'}}>
                <div style={{position:'relative',aspectRatio:'2/3'}}>
                  {f.poster_path
                    ? <img src={`${IMG}${f.poster_path}`} alt={f.title||f.name} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} />
                    : <div style={{width:'100%',height:'100%',background:'#1a237e',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
                      </div>
                  }
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 50%)'}}/>
                  <div style={{position:'absolute',top:8,right:8,background:'rgba(0,0,0,0.6)',backdropFilter:'blur(8px)',borderRadius:7,padding:'3px 8px',fontSize:11,fontWeight:700,color:'#fbbf24',display:'flex',alignItems:'center',gap:3}}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#fbbf24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    {f.vote_average?.toFixed(1)}
                  </div>
                </div>
                <div style={{padding:'10px 12px'}}>
                  <div style={{fontSize:13,fontWeight:700,color:'#1a237e',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{f.title||f.name}</div>
                  <div style={{fontSize:11,color:'#90a4ae',marginTop:3}}>{(f.release_date||f.first_air_date)?.slice(0,4)}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
