'use client';
import { useTheme } from '../context/ThemeContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import HeroSlider from './HeroSlider';
import NowPlaying from './NowPlaying';
import DarkToggle from './DarkToggle';
import AboutModal from './AboutModal';

function Section({ title, items, href, dark }) {
  const txt = dark ? '#fff' : '#1a237e';
  return (
    <section style={{ marginBottom: 32, padding: '0 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: txt, letterSpacing: '-0.3px', paddingLeft: 12, borderLeft: '4px solid #4fc3f7' }}>{title}</h2>
        {href && <a href={href} style={{ fontSize: 12, color: '#4fc3f7', fontWeight: 600 }}>Lihat Semua →</a>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
        {items.slice(0, 20).map(f => (
          <a key={f.id} href={`/watch/${f.id}`} style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{ borderRadius: 14, overflow: 'hidden', position: 'relative', aspectRatio: '2/3', background: dark ? '#1a2744' : '#1a3a5c' }}>
              {f.poster && <img src={f.poster} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', borderRadius: 6, padding: '2px 7px', fontSize: 10, fontWeight: 700, color: '#fff' }}>★ {f.rating?.toFixed(1)}</div>
              <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.title}</p>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>{f.release_date?.slice(0,4)}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

const categories = [
  { href:'/movies', label:'Film', svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/><line x1="17" y1="17" x2="22" y2="17"/></svg> },
  { href:'/series', label:'Series', svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
  { href:'/trending', label:'Trending', svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
  { href:'/watchlist', label:'Watchlist', svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg> },
  { href:'/history', label:'Riwayat', svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
];

export default function HomeClient({ trending, movies, series }) {
  const { dark } = useTheme();
  const [cont] = useLocalStorage('continue_watching', []);

  const bg = dark
    ? 'linear-gradient(180deg,#0a0a1a 0%,#0d1b3e 50%,#0a0a1a 100%)'
    : 'linear-gradient(180deg,#dff0fc 0%,#a8d4f5 20%,#5aaee0 50%,#1a6bb5 75%,#0b3270 100%)';

  const navBg = dark ? 'rgba(10,10,30,0.85)' : 'rgba(220,240,255,0.85)';
  const navTxt = dark ? '#fff' : '#0a2a52';
  const navSub = dark ? 'rgba(255,255,255,0.4)' : 'rgba(10,50,100,0.5)';
  const iconColor = dark ? '#4fc3f7' : '#1565c0';

  return (
    <div style={{ minHeight: '100vh', background: bg, overflowX: 'hidden' }}>
      {/* Navbar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, background: navBg, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.6)', padding: '48px 16px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: 11, color: navSub, marginBottom: 1 }}>Selamat datang di</p>
          <h1 style={{ fontSize: 20, fontWeight: 900, color: navTxt, letterSpacing: '-0.5px' }}>Nzwx<span style={{ color: '#1565c0' }}>Film</span></h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <DarkToggle />
          <a href="/search" style={{ width: 40, height: 40, borderRadius: 12, background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.7)', border: dark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </a>
          <AboutModal />
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: '16px 16px 0' }}>
        <HeroSlider films={trending.slice(0, 8)} />
      </div>

      {/* Categories */}
      <div style={{ padding: '16px' }}>
        <div style={{ background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.75)', backdropFilter: 'blur(20px)', borderRadius: 22, padding: '16px 12px', border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.95)', display: 'flex', justifyContent: 'space-around' }}>
          {categories.map(c => (
            <a key={c.href} href={c.href} style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:6,textDecoration:'none' }}>
              <div style={{ width:52,height:52,borderRadius:16,background:dark?'rgba(255,255,255,0.1)':'#fff',display:'flex',alignItems:'center',justifyContent:'center',color:iconColor }}>
                {c.svg}
              </div>
              <span style={{ fontSize:11,fontWeight:600,color:dark?'rgba(255,255,255,0.8)':'#1a237e' }}>{c.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Continue Watching */}
      {cont.length > 0 && (
        <div style={{ padding: '0 16px', marginBottom: 24 }}>
          <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12 }}>
            <h2 style={{ fontSize:16,fontWeight:800,color:dark?'#fff':'#1a237e',paddingLeft:12,borderLeft:'4px solid #4fc3f7' }}>Lanjut Nonton</h2>
            <a href="/history" style={{ fontSize:12,color:'#4fc3f7',fontWeight:600 }}>Lihat Semua →</a>
          </div>
          <div style={{ display:'flex',gap:10,overflowX:'auto',paddingBottom:6 }}>
            {cont.slice(0,10).map(f => (
              <a key={f.id} href={`/watch/${f.id}`} style={{ textDecoration:'none',flexShrink:0,width:110 }}>
                <div style={{ borderRadius:12,overflow:'hidden',aspectRatio:'2/3',background:dark?'#1a2744':'#1a3a5c',position:'relative' }}>
                  {f.poster && <img src={f.poster} alt={f.title} style={{ width:'100%',height:'100%',objectFit:'cover' }} />}
                  <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 50%)' }} />
                  <div style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:28,height:28,borderRadius:'50%',background:'rgba(255,255,255,0.85)',display:'flex',alignItems:'center',justifyContent:'center' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#1565c0"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                  <div style={{ position:'absolute',bottom:6,left:6,right:6 }}>
                    <p style={{ fontSize:10,fontWeight:700,color:'#fff',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{f.title}</p>
                    {f.season && <p style={{ fontSize:9,color:'rgba(255,255,255,0.7)' }}>S{f.season} E{f.episode}</p>}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      <NowPlaying films={trending} />

      <div style={{ paddingTop: 8 }}>
        <Section title="Trending" items={trending} href="/trending" dark={dark} />
        <Section title="Film Populer" items={movies} href="/movies" dark={dark} />
        <Section title="Series Populer" items={series} href="/series" dark={dark} />
      </div>
    </div>
  );
}
