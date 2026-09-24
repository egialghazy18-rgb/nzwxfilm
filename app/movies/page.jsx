const KEY = '3a3f8986432b380633bf9670f5fff60a';
const IMG = 'https://image.tmdb.org/t/p/w342';

export default async function MoviesPage() {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=id-ID&page=1`,{next:{revalidate:3600}});
  const data = await res.json();
  const films = data.results || [];

  return (
    <main style={{minHeight:'100vh', background:'#dce8f5', paddingTop:24, paddingBottom:80}}>
      <div style={{padding:'0 16px'}}>
        <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:4}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a237e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/>
          </svg>
          <h1 style={{fontSize:18, fontWeight:800, color:'#1a237e'}}>Film Populer</h1>
        </div>
        <p style={{color:'#546e7a', fontSize:12, marginBottom:16}}>Film terpopuler minggu ini</p>
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(3, 1fr)',
          gap:10,
          alignItems:'start'
        }}>
          {films.map(f => (
            <a key={f.id} href={`/watch/${f.id}`} style={{textDecoration:'none', display:'block'}}>
              <div style={{
                borderRadius:12,
                overflow:'hidden',
                background:'#fff',
                boxShadow:'0 2px 8px rgba(0,0,0,0.08)',
                height:'100%'
              }}>
                <div style={{
                  position:'relative',
                  width:'100%',
                  paddingBottom:'150%',
                  overflow:'hidden',
                  background:'#e3eaf5'
                }}>
                  {f.poster_path
                    ? <img
                        src={`${IMG}${f.poster_path}`}
                        alt={f.title}
                        style={{
                          position:'absolute',
                          top:0, left:0,
                          width:'100%',
                          height:'100%',
                          objectFit:'cover',
                          display:'block'
                        }}
                      />
                    : <div style={{
                        position:'absolute',
                        top:0, left:0,
                        width:'100%',
                        height:'100%',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center'
                      }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#90a4ae" strokeWidth="1.5">
                          <rect x="2" y="2" width="20" height="20" rx="2"/>
                          <line x1="7" y1="2" x2="7" y2="22"/>
                          <line x1="17" y1="2" x2="17" y2="22"/>
                          <line x1="2" y1="12" x2="22" y2="12"/>
                        </svg>
                      </div>
                  }
                  <div style={{
                    position:'absolute',
                    top:5, right:5,
                    background:'rgba(0,0,0,0.75)',
                    borderRadius:6,
                    padding:'2px 5px',
                    display:'flex',
                    alignItems:'center',
                    gap:2
                  }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="#fbbf24" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    <span style={{fontSize:9,fontWeight:700,color:'#fbbf24'}}>{f.vote_average?.toFixed(1)}</span>
                  </div>
                </div>
                <div style={{padding:'6px 8px'}}>
                  <div style={{
                    fontSize:10,
                    fontWeight:700,
                    color:'#1a237e',
                    overflow:'hidden',
                    textOverflow:'ellipsis',
                    whiteSpace:'nowrap'
                  }}>{f.title}</div>
                  <div style={{fontSize:9,color:'#78909c',marginTop:1}}>{f.release_date?.slice(0,4)}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
