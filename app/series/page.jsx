const KEY = '3a3f8986432b380633bf9670f5fff60a';
const IMG = 'https://image.tmdb.org/t/p/w342';

export default async function SeriesPage() {
  const [r1, r2, r3] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${KEY}&language=id-ID&page=1`,{next:{revalidate:3600}}),
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${KEY}&language=id-ID&page=2`,{next:{revalidate:3600}}),
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${KEY}&language=id-ID&page=3`,{next:{revalidate:3600}}),
  ]);
  const [d1, d2, d3] = await Promise.all([r1.json(), r2.json(), r3.json()]);
  const series = [...(d1.results||[]), ...(d2.results||[]), ...(d3.results||[])].filter(f => f.poster_path);

  return (
    <main style={{minHeight:'100vh', background:'#dce8f5', paddingTop:24, paddingBottom:80}}>
      <div style={{padding:'0 16px'}}>
        <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:4}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a237e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/>
          </svg>
          <h1 style={{fontSize:18, fontWeight:800, color:'#1a237e'}}>Series Populer</h1>
        </div>
        <p style={{color:'#546e7a', fontSize:12, marginBottom:16}}>Series TV terpopuler saat ini</p>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, minmax(0, 1fr))', gap:8, alignItems:'start'}}>
          {series.map(f => (
            <a key={f.id} href={`/watch/${f.id}`} style={{textDecoration:'none', display:'block', minWidth:0}}>
              <div style={{borderRadius:10, overflow:'hidden', background:'#fff', boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
                <div style={{position:'relative', width:'100%', paddingBottom:'150%', background:'#e3eaf5'}}>
                  <img src={`${IMG}${f.poster_path}`} alt={f.name} style={{position:'absolute', top:0, left:0, width:'100%', height:'100%', objectFit:'cover', display:'block'}} />
                  <div style={{position:'absolute',top:4,right:4,background:'rgba(0,0,0,0.75)',borderRadius:5,padding:'2px 4px',display:'flex',alignItems:'center',gap:1}}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="#fbbf24" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span style={{fontSize:8,fontWeight:700,color:'#fbbf24'}}>{f.vote_average?.toFixed(1)}</span>
                  </div>
                </div>
                <div style={{padding:'5px 6px'}}>
                  <div style={{fontSize:9,fontWeight:700,color:'#1a237e',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{f.name}</div>
                  <div style={{fontSize:8,color:'#78909c',marginTop:1}}>{f.first_air_date?.slice(0,4)}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
