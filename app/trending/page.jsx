const KEY = '3a3f8986432b380633bf9670f5fff60a';
const IMG = 'https://image.tmdb.org/t/p/w500';

export default async function TrendingPage() {
  const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}&language=id-ID`,{next:{revalidate:3600}});
  const data = await res.json();
  const films = data.results || [];

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #dff0fc 0%, #a8d4f5 20%, #5aaee0 50%, #1a6bb5 75%, #0b3270 100%)',
    }}>

      {/* HEADER */}
      <div style={{ padding:'100px 20px 28px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-20, right:-30, width:180, height:180, borderRadius:'50%', background:'rgba(21,101,192,0.25)', filter:'blur(50px)', pointerEvents:'none' }} />

        <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
          <div style={{ width:3, height:14, borderRadius:2, background:'#1565c0' }} />
          <span style={{ fontSize:10, fontWeight:700, color:'#1565c0', letterSpacing:'2px', textTransform:'uppercase' }}>Minggu Ini</span>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f57c00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
            <polyline points="17 6 23 6 23 12"/>
          </svg>
          <h1 style={{ fontSize:32, fontWeight:900, color:'#0a2a52', letterSpacing:'-1px', margin:0 }}>Trending</h1>
        </div>

        <p style={{ color:'#4a6fa5', fontSize:13, margin:'0 0 16px', paddingLeft:38 }}>Film paling banyak ditonton minggu ini</p>

        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {[
            { icon:<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1565c0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>, label:`${films.length} Film` },
            { icon:<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1565c0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label:'Update Mingguan' },
            { icon:<svg width="11" height="11" viewBox="0 0 24 24" fill="#fbbf24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, label:'Top Rated' },
          ].map((s,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:5, background:'rgba(255,255,255,0.7)', backdropFilter:'blur(10px)', borderRadius:20, padding:'5px 11px', border:'1px solid rgba(255,255,255,0.9)' }}>
              {s.icon}
              <span style={{ fontSize:10, fontWeight:700, color:'#1a237e' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* GRID 2 kolom seragam */}
      <div style={{ padding:'0 14px 100px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {films.map((f, idx) => (
            <a key={f.id} href={`/watch/${f.id}`} style={{ textDecoration:'none' }}>
              <div style={{
                borderRadius: 14,
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.88)',
                boxShadow: '0 3px 14px rgba(0,0,0,0.12)',
                border: '1px solid rgba(255,255,255,0.9)',
              }}>
                <div style={{ position:'relative', aspectRatio:'2/3' }}>
                  {f.poster_path
                    ? <img src={`${IMG}${f.poster_path}`} alt={f.title||f.name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                    : <div style={{ width:'100%', height:'100%', background:'#1a237e', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
                      </div>
                  }
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />

                  {idx < 3 && (
                    <div style={{ position:'absolute', top:8, left:8, width:22, height:22, borderRadius:7, background: idx===0?'linear-gradient(135deg,#ffd700,#ff8c00)':idx===1?'linear-gradient(135deg,#c0c0c0,#808080)':'linear-gradient(135deg,#cd7f32,#8b4513)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:900, color:'#fff', boxShadow:'0 2px 6px rgba(0,0,0,0.3)' }}>
                      {idx+1}
                    </div>
                  )}

                  <div style={{ position:'absolute', top:8, right:8, background:'rgba(0,0,0,0.65)', backdropFilter:'blur(6px)', borderRadius:6, padding:'3px 7px', fontSize:10, fontWeight:700, color:'#fbbf24', display:'flex', alignItems:'center', gap:3 }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="#fbbf24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    {f.vote_average?.toFixed(1)}
                  </div>
                </div>

                <div style={{ padding:'8px 10px 10px' }}>
                  <div style={{ fontSize:12, fontWeight:800, color:'#1a237e', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{f.title||f.name}</div>
                  <div style={{ fontSize:10, color:'#90a4ae', marginTop:2 }}>{(f.release_date||f.first_air_date)?.slice(0,4)}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
