'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { usePathname } from 'next/navigation';
import HeroSlider from './HeroSlider';
import NowPlaying from './NowPlaying';

const MENU = [
  { href:'/', label:'Beranda', icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { href:'/movies', label:'Film', icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg> },
  { href:'/series', label:'Series', icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg> },
  { href:'/trending', label:'Trending', icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
  { href:'/watchlist', label:'Watchlist', icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg> },
  { href:'/history', label:'Riwayat', icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  { href:'/search', label:'Cari Film', icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> },
  { href:'/developer', label:'Developer', icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
];

const CATS = [
  { href:'/movies', label:'Film', icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg> },
  { href:'/series', label:'Series', icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8e24aa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg> },
  { href:'/trending', label:'Trending', icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f57c00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
  { href:'/watchlist', label:'Watchlist', icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1565c0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg> },
  { href:'/history', label:'Riwayat', icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00897b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
];

function Section({ title, items, href, dark }) {
  const txt = dark?'#fff':'#1a237e';
  return (
    <section style={{ marginBottom:32,padding:'0 16px' }}>
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14 }}>
        <h2 style={{ fontSize:17,fontWeight:800,color:txt,letterSpacing:'-0.3px',paddingLeft:12,borderLeft:'4px solid #4fc3f7' }}>{title}</h2>
        {href&&<a href={href} style={{ fontSize:12,color:'#4fc3f7',fontWeight:600 }}>Lihat Semua →</a>}
      </div>
      <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(130px, 1fr))',gap:12 }}>
        {items.slice(0,20).map(f=>(
          <a key={f.id} href={`/watch/${f.id}`} style={{ display:'block',textDecoration:'none' }}>
            <div style={{ borderRadius:14,overflow:'hidden',position:'relative',aspectRatio:'2/3',background:dark?'#1a2744':'#1a3a5c' }}>
              {f.poster&&<img src={f.poster} alt={f.title} style={{ width:'100%',height:'100%',objectFit:'cover',display:'block' }} loading="lazy" />}
              <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 50%)' }} />
              <div style={{ position:'absolute',top:8,right:8,background:'rgba(0,0,0,0.55)',backdropFilter:'blur(4px)',borderRadius:6,padding:'2px 7px',fontSize:10,fontWeight:700,color:'#fff' }}>★ {f.rating?.toFixed(1)}</div>
              <div style={{ position:'absolute',bottom:8,left:8,right:8 }}>
                <p style={{ fontSize:11,fontWeight:700,color:'#fff',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{f.title}</p>
                <p style={{ fontSize:10,color:'rgba(255,255,255,0.6)' }}>{f.release_date?.slice(0,4)}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function HomeClient({ trending, movies, series }) {
  const { dark, toggle } = useTheme();
  const [cont] = useLocalStorage('continue_watching', []);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (isStandalone) { setInstalled(true); return; }
    const handler = (e) => { e.preventDefault(); setInstallPrompt(e); };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => setInstalled(true));
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const result = await installPrompt.userChoice;
      if (result.outcome === 'accepted') { setInstalled(true); setInstallPrompt(null); }
    } else {
      alert('Buka menu Chrome (titik 3) > "Tambahkan ke layar utama"');
    }
  };

  const bg = dark
    ? 'linear-gradient(180deg,#0a0a1a 0%,#0d1b3e 50%,#0a0a1a 100%)'
    : 'linear-gradient(180deg,#dff0fc 0%,#a8d4f5 20%,#5aaee0 50%,#1a6bb5 75%,#0b3270 100%)';
  const navBg = dark?'rgba(10,10,30,0.9)':'rgba(220,240,255,0.9)';
  const navTxt = dark?'#fff':'#0a2a52';
  const navSub = dark?'rgba(255,255,255,0.4)':'rgba(10,50,100,0.5)';
  const sideBg = dark?'#0d1b3e':'#fff';
  const sideTxt = dark?'#fff':'#1a237e';
  const sideSub = dark?'rgba(255,255,255,0.4)':'#78909c';
  const sideBorder = dark?'rgba(255,255,255,0.08)':'rgba(21,101,192,0.1)';

  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position:'fixed',inset:0,background:'rgba(0,0,0,0.55)',zIndex:9998,backdropFilter:'blur(3px)' }}
        />
      )}

      <div style={{
        position:'fixed',top:0,left:0,height:'100dvh',width:285,
        background:sideBg,zIndex:9999,
        transform:sidebarOpen?'translateX(0)':'translateX(-100%)',
        transition:'transform 0.3s cubic-bezier(.4,0,.2,1)',
        boxShadow:sidebarOpen?'8px 0 40px rgba(0,0,0,0.25)':'none',
        display:'flex',flexDirection:'column',overflowY:'auto',
      }}>
        <div style={{ padding:'56px 20px 20px',borderBottom:`1px solid ${sideBorder}` }}>
          <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16 }}>
            <h2 style={{ fontSize:22,fontWeight:900,color:sideTxt }}>Nzwx<span style={{ color:'#1565c0' }}>Film</span></h2>
            <button onClick={() => setSidebarOpen(false)} style={{ width:32,height:32,borderRadius:8,border:'none',cursor:'pointer',background:dark?'rgba(255,255,255,0.08)':'rgba(0,0,0,0.06)',display:'flex',alignItems:'center',justifyContent:'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={sideTxt} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div style={{ background:dark?'rgba(255,255,255,0.05)':'rgba(21,101,192,0.05)',borderRadius:14,padding:'12px 14px',border:`1px solid ${sideBorder}` }}>
            <p style={{ fontSize:12,color:sideSub,lineHeight:1.8 }}>Platform streaming film & series online gratis. Tonton ribuan judul dengan kualitas terbaik tanpa batas.</p>
          </div>
        </div>

        <div style={{ padding:'16px 12px',flex:1 }}>
          <p style={{ fontSize:10,fontWeight:700,color:sideSub,letterSpacing:'0.8px',marginBottom:10,paddingLeft:8 }}>MENU</p>
          {MENU.map(m => {
            const active = path === m.href;
            return (
              <a key={m.href} href={m.href} onClick={() => setSidebarOpen(false)}
                style={{ display:'flex',alignItems:'center',gap:12,padding:'11px 12px',borderRadius:14,marginBottom:4,textDecoration:'none',background:active?'#1565c0':'transparent',color:active?'#fff':sideTxt,transition:'all 0.15s' }}>
                <span style={{ opacity:active?1:0.65 }}>{m.icon}</span>
                <span style={{ fontSize:14,fontWeight:active?700:500 }}>{m.label}</span>
                {active && <div style={{ marginLeft:'auto',width:6,height:6,borderRadius:'50%',background:'rgba(255,255,255,0.7)' }} />}
              </a>
            );
          })}

          {/* Install PWA di daftar menu */}
          {installed ? (
            <div style={{ display:'flex',alignItems:'center',gap:12,padding:'11px 12px',borderRadius:14,marginBottom:4 }}>
              <span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
              <span style={{ fontSize:14,fontWeight:500,color:'#4caf50' }}>Sudah Terinstall</span>
            </div>
          ) : (
            <button onClick={handleInstall} style={{ display:'flex',alignItems:'center',gap:12,padding:'11px 12px',borderRadius:14,marginBottom:4,width:'100%',border:'none',background:'transparent',color:sideTxt,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s',textAlign:'left' }}>
              <span style={{ opacity:0.65 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </span>
              <span style={{ fontSize:14,fontWeight:500 }}>Install PWA</span>
            </button>
          )}
        </div>

        <div style={{ padding:'16px 20px 36px',borderTop:`1px solid ${sideBorder}` }}>
          <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:12 }}>
            <div style={{ width:40,height:40,borderRadius:12,background:'linear-gradient(135deg,#1565c0,#4fc3f7)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </div>
            <div>
              <p style={{ fontSize:13,fontWeight:700,color:sideTxt }}>Egii</p>
              <p style={{ fontSize:11,color:sideSub }}>Developer & Creator</p>
            </div>
          </div>
          <p style={{ fontSize:11,color:sideSub,lineHeight:1.7,marginBottom:14 }}>NzwxFilm dibuat oleh Egii sebagai platform hiburan streaming film & series gratis untuk semua orang.</p>
          <button onClick={toggle} style={{ display:'flex',alignItems:'center',gap:10,width:'100%',padding:'11px 14px',borderRadius:12,border:`1px solid ${sideBorder}`,background:dark?'rgba(255,255,255,0.06)':'rgba(21,101,192,0.05)',cursor:'pointer',color:sideTxt,fontFamily:'Inter,sans-serif' }}>
            {dark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1565c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
            <span style={{ fontSize:13,fontWeight:600 }}>{dark?'Mode Terang':'Mode Gelap'}</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ minHeight:'100vh',background:bg,overflowX:'hidden' }}>
        <div style={{ position:'sticky',top:0,zIndex:100,background:navBg,backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',borderBottom:dark?'1px solid rgba(255,255,255,0.08)':'1px solid rgba(255,255,255,0.6)',padding:'48px 16px 14px',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
          <div>
            <p style={{ fontSize:11,color:navSub,marginBottom:1 }}>Selamat datang di</p>
            <h1 style={{ fontSize:20,fontWeight:900,color:navTxt,letterSpacing:'-0.5px' }}>Nzwx<span style={{ color:'#1565c0' }}>Film</span></h1>
          </div>
          <div style={{ display:'flex',gap:8,alignItems:'center' }}>
            <a href="/search" style={{ width:40,height:40,borderRadius:12,background:dark?'rgba(255,255,255,0.1)':'rgba(255,255,255,0.7)',border:dark?'1px solid rgba(255,255,255,0.15)':'1px solid rgba(255,255,255,0.9)',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={dark?'#4fc3f7':'#1565c0'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </a>
            <button onClick={() => setSidebarOpen(true)} style={{ width:40,height:40,borderRadius:12,border:'none',cursor:'pointer',background:dark?'rgba(255,255,255,0.1)':'rgba(255,255,255,0.7)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:4 }}>
              <span style={{ display:'block',width:16,height:2,borderRadius:2,background:dark?'#fff':'#1565c0' }} />
              <span style={{ display:'block',width:12,height:2,borderRadius:2,background:dark?'#fff':'#1565c0' }} />
              <span style={{ display:'block',width:16,height:2,borderRadius:2,background:dark?'#fff':'#1565c0' }} />
            </button>
          </div>
        </div>

        <div style={{ padding:'16px 16px 0' }}>
          <HeroSlider films={trending.slice(0,8)} />
        </div>

        <div style={{ padding:'16px' }}>
          <div style={{ background:dark?'rgba(255,255,255,0.07)':'rgba(255,255,255,0.75)',backdropFilter:'blur(20px)',borderRadius:22,padding:'16px 12px',border:dark?'1px solid rgba(255,255,255,0.1)':'1px solid rgba(255,255,255,0.95)',display:'flex',justifyContent:'space-around' }}>
            {CATS.map(c=>(
              <a key={c.href} href={c.href} style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:6,textDecoration:'none' }}>
                <div style={{ width:52,height:52,borderRadius:16,background:dark?'rgba(255,255,255,0.1)':'#fff',display:'flex',alignItems:'center',justifyContent:'center' }}>{c.icon}</div>
                <span style={{ fontSize:11,fontWeight:600,color:dark?'rgba(255,255,255,0.8)':'#1a237e' }}>{c.label}</span>
              </a>
            ))}
          </div>
        </div>

        {cont.length > 0 && (
          <div style={{ padding:'0 16px',marginBottom:24 }}>
            <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12 }}>
              <h2 style={{ fontSize:16,fontWeight:800,color:dark?'#fff':'#1a237e',paddingLeft:12,borderLeft:'4px solid #4fc3f7' }}>Lanjut Nonton</h2>
              <a href="/history" style={{ fontSize:12,color:'#4fc3f7',fontWeight:600 }}>Lihat Semua →</a>
            </div>
            <div style={{ display:'flex',gap:10,overflowX:'auto',paddingBottom:6 }}>
              {cont.slice(0,10).map(f=>(
                <a key={f.id} href={`/watch/${f.id}`} style={{ textDecoration:'none',flexShrink:0,width:110 }}>
                  <div style={{ borderRadius:12,overflow:'hidden',aspectRatio:'2/3',background:dark?'#1a2744':'#1a3a5c',position:'relative' }}>
                    {f.poster&&<img src={f.poster} alt={f.title} style={{ width:'100%',height:'100%',objectFit:'cover' }} />}
                    <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 50%)' }} />
                    <div style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:28,height:28,borderRadius:'50%',background:'rgba(255,255,255,0.85)',display:'flex',alignItems:'center',justifyContent:'center' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="#1565c0"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                    <div style={{ position:'absolute',bottom:6,left:6,right:6 }}>
                      <p style={{ fontSize:10,fontWeight:700,color:'#fff',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{f.title}</p>
                      {f.season&&<p style={{ fontSize:9,color:'rgba(255,255,255,0.7)' }}>S{f.season} E{f.episode}</p>}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        <NowPlaying films={trending} />

        <div style={{ paddingTop:8 }}>
          <Section title="Trending" items={trending} href="/trending" dark={dark} />
          <Section title="Film Populer" items={movies} href="/movies" dark={dark} />
          <Section title="Series Populer" items={series} href="/series" dark={dark} />
        </div>
      </div>
    </>
  );
}
