const KEY = '3a3f8986432b380633bf9670f5fff60a';
const IMG = 'https://image.tmdb.org/t/p/w500';

export default async function MoviesPage() {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=id-ID&page=1`,{next:{revalidate:3600}});
  const data = await res.json();
  const films = data.results || [];

  return (
    <main style={{minHeight:'100vh', background:'#dce8f5', paddingTop:80, paddingBottom:80}}>
      <div style={{padding:'0 16px'}}>
        <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:6}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a237e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/>
          </svg>
          <h1 style={{fontSize:22, fontWeight:800, color:'#1a237e', letterSpacing:'-0.5px'}}>Film Populer</h1>
        </div>
        <p style={{color:'#546e7a', fontSize:13, marginBottom:20}}>Film terpopuler minggu ini</p>
        <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:12}}>
          {films.map(f => (
            <a key={f.id} href={`/watch/${f.id}`} style={{textDecoration:'none'}}>
              <div style={{borderRadius:14, overflow:'hidden', background:'#fff', boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
                <div style={{position:'relative', aspectRatio:'2/3'}}>
                  {f.poster_path
                    ? <img src={`${IMG}${f.poster_path}`} alt={f.title} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} />
                    : <div style={{width:'100%',height:'100%',background:'#e3eaf5',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#90a4ae" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
                      </div>
                  }
                  <div style={{position:'absolute',top:8,right:8,background:'rgba(0,0,0,0.75)',backdropFilter:'blur(8px)',borderRadius:8,padding:'3px 8px',display:'flex',alignItems:'center',gap:4}}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="#fbbf24" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span style={{fontSize:11,fontWeight:600,color:'#fbbf24'}}>{f.vote_average?.toFixed(1)}</span>
                  </div>
                </div>
                <div style={{padding:'8px 10px'}}>
                  <div style={{fontSize:12,fontWeight:700,color:'#1a237e',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{f.title}</div>
                  <div style={{fontSize:11,color:'#78909c',marginTop:2}}>{f.release_date?.slice(0,4)}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
