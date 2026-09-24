import { getTrending, getPopular, getPopularSeries, fmt } from './lib/tmdb';
import MovieCard from './components/MovieCard';

async function Section({ title, items }) {
  return (
    <section style={{marginBottom:56}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <h2 style={{fontFamily:'Outfit,sans-serif',fontSize:20,fontWeight:700,color:'#f1f5f9'}}>{title}</h2>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(145px,1fr))',gap:14}}>
        {items.slice(0,10).map(f => <MovieCard key={f.id} film={f} />)}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const [t, m, s] = await Promise.all([getTrending(), getPopular(), getPopularSeries()]);
  const trending = (t.results||[]).map(fmt);
  const movies = (m.results||[]).map(fmt);
  const series = (s.results||[]).map(fmt);

  const hero = trending[0];

  return (
    <main style={{minHeight:'100vh',position:'relative',zIndex:1}}>

      {/* Hero */}
      {hero && (
        <div style={{position:'relative',height:'85vh',minHeight:480,overflow:'hidden',display:'flex',alignItems:'flex-end'}}>
          {hero.backdrop && <img src={hero.backdrop} alt={hero.title} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top'}} />}
          <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(10,10,15,1) 0%,rgba(10,10,15,0.5) 50%,rgba(10,10,15,0.15) 100%)'}} />
          <div style={{position:'relative',maxWidth:1280,margin:'0 auto',padding:'0 24px 64px',width:'100%'}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(139,92,246,0.15)',border:'1px solid rgba(139,92,246,0.3)',borderRadius:100,padding:'4px 12px',fontSize:12,color:'#a78bfa',fontWeight:500,marginBottom:16}}>🔥 Trending #1</div>
            <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(32px,5vw,64px)',fontWeight:800,color:'#f1f5f9',letterSpacing:'-0.03em',marginBottom:12,maxWidth:600,lineHeight:1.1}}>{hero.title}</h1>
            <p style={{fontSize:14,color:'#94a3b8',maxWidth:480,lineHeight:1.7,marginBottom:28}}>{hero.overview?.slice(0,150)}...</p>
            <div style={{display:'flex',gap:12}}>
              <a href={`/watch/${hero.id}`} style={{display:'inline-flex',alignItems:'center',gap:8,padding:'12px 24px',background:'linear-gradient(135deg,#8b5cf6,#6d28d9)',borderRadius:10,color:'white',fontWeight:600,fontSize:14,boxShadow:'0 8px 24px rgba(139,92,246,0.35)'}}>▶ Tonton Sekarang</a>
              <div style={{display:'inline-flex',alignItems:'center',gap:6,padding:'12px 20px',background:'rgba(255,255,255,0.08)',borderRadius:10,color:'#f1f5f9',fontSize:14,border:'1px solid rgba(255,255,255,0.1)'}}>⭐ {hero.rating?.toFixed(1)}</div>
            </div>
          </div>
        </div>
      )}

      <div style={{maxWidth:1280,margin:'0 auto',padding:'48px 24px 80px'}}>
        <Section title="🔥 Trending Minggu Ini" items={trending} />
        <Section title="🎬 Film Populer" items={movies} />
        <Section title="📺 Series Populer" items={series} />
      </div>
    </main>
  );
}
