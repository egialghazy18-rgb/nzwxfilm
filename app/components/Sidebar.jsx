'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { usePathname } from 'next/navigation';

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

export function HamburgerBtn({ onClick, dark }) {
  return (
    <button onClick={onClick} style={{ width:40,height:40,borderRadius:12,border:'none',cursor:'pointer',background:dark?'rgba(255,255,255,0.1)':'rgba(255,255,255,0.7)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:4,flexShrink:0 }}>
      <span style={{ display:'block',width:16,height:2,borderRadius:2,background:dark?'#fff':'#1565c0' }} />
      <span style={{ display:'block',width:12,height:2,borderRadius:2,background:dark?'#fff':'#1565c0' }} />
      <span style={{ display:'block',width:16,height:2,borderRadius:2,background:dark?'#fff':'#1565c0' }} />
    </button>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setInstallPrompt(e); };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => setInstalled(true));
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const result = await installPrompt.userChoice;
    if (result.outcome === 'accepted') { setInstalled(true); setInstallPrompt(null); }
  };

  const { dark, toggle } = useTheme();
  const path = usePathname();

  const bg = dark ? '#0d1b3e' : '#fff';
  const txt = dark ? '#fff' : '#1a237e';
  const sub = dark ? 'rgba(255,255,255,0.4)' : '#78909c';
  const borderC = dark ? 'rgba(255,255,255,0.08)' : 'rgba(21,101,192,0.1)';

  return (
    <>
      <HamburgerBtn onClick={() => setOpen(true)} dark={dark} />

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position:'fixed',inset:0,background:'rgba(0,0,0,0.55)',zIndex:9998,backdropFilter:'blur(3px)',WebkitBackdropFilter:'blur(3px)' }}
        />
      )}

      <div style={{
        position:'fixed', top:0, left:0, height:'100%', width:285,
        background:bg, zIndex:9999,
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition:'transform 0.3s cubic-bezier(.4,0,.2,1)',
        boxShadow: open ? '8px 0 40px rgba(0,0,0,0.25)' : 'none',
        display:'flex', flexDirection:'column', overflowY:'auto',
      }}>

        <div style={{ padding:'56px 20px 20px', borderBottom:`1px solid ${borderC}` }}>
          <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16 }}>
            <h2 style={{ fontSize:22,fontWeight:900,color:txt }}>
              Nzwx<span style={{ color:'#1565c0' }}>Film</span>
            </h2>
            <button onClick={() => setOpen(false)} style={{ width:32,height:32,borderRadius:8,border:'none',cursor:'pointer',background:dark?'rgba(255,255,255,0.08)':'rgba(0,0,0,0.06)',display:'flex',alignItems:'center',justifyContent:'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={txt} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div style={{ background:dark?'rgba(255,255,255,0.05)':'rgba(21,101,192,0.05)',borderRadius:14,padding:'12px 14px',border:`1px solid ${borderC}` }}>
            <p style={{ fontSize:12,color:sub,lineHeight:1.8 }}>Platform streaming film & series online gratis. Tonton ribuan judul dengan kualitas terbaik tanpa batas.</p>
          </div>
        </div>

        <div style={{ padding:'16px 12px',flex:1 }}>
          <p style={{ fontSize:10,fontWeight:700,color:sub,letterSpacing:'0.8px',marginBottom:10,paddingLeft:8 }}>MENU</p>
          {MENU.map(m => {
            const active = path === m.href;
            return (
              <a key={m.href} href={m.href} onClick={() => setOpen(false)} style={{ display:'flex',alignItems:'center',gap:12,padding:'11px 12px',borderRadius:14,marginBottom:4,textDecoration:'none',background:active?'#1565c0':'transparent',color:active?'#fff':txt,transition:'all 0.15s' }}>
                <span style={{ opacity:active?1:0.65, color:active?'#fff':txt }}>{m.icon}</span>
                <span style={{ fontSize:14,fontWeight:active?700:500 }}>{m.label}</span>
                {active && <div style={{ marginLeft:'auto',width:6,height:6,borderRadius:'50%',background:'rgba(255,255,255,0.7)' }} />}
              </a>
            );
          })}
        </div>

        <div style={{ padding:'16px 20px 36px',borderTop:`1px solid ${borderC}` }}>
          <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:12 }}>
            <div style={{ width:40,height:40,borderRadius:12,background:'linear-gradient(135deg,#1565c0,#4fc3f7)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </div>
            <div>
              <p style={{ fontSize:13,fontWeight:700,color:txt }}>Egii</p>
              <p style={{ fontSize:11,color:sub }}>Developer & Creator</p>
            </div>
          </div>
          <p style={{ fontSize:11,color:sub,lineHeight:1.7,marginBottom:14 }}>NzwxFilm dibuat oleh Egii sebagai platform hiburan streaming film & series gratis untuk semua orang.</p>

          {installed ? (
            <div style={{ display:'flex',alignItems:'center',gap:8,padding:'8px 14px',borderRadius:12,background:'rgba(76,175,80,0.1)',marginBottom:8 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span style={{ fontSize:12,color:'#4caf50',fontWeight:600 }}>Sudah terinstall</span>
            </div>
          ) : (
            <button
              onClick={installPrompt ? handleInstall : () => alert('Buka di Chrome > menu titik 3 > Tambahkan ke layar utama')}
              style={{ display:'flex',alignItems:'center',gap:10,width:'100%',padding:'11px 14px',borderRadius:12,border:'1px solid rgba(21,101,192,0.3)',background:'linear-gradient(135deg,rgba(21,101,192,0.1),rgba(79,195,247,0.1))',cursor:'pointer',color:txt,fontFamily:'Inter,sans-serif',marginBottom:8 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1565c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <div style={{ textAlign:'left' }}>
                <p style={{ fontSize:13,fontWeight:700,color:'#1565c0',margin:0 }}>Install PWA</p>
                <p style={{ fontSize:10,color:sub,margin:0 }}>Tambah ke homescreen</p>
              </div>
            </button>
          )}

          <button onClick={toggle} style={{ display:'flex',alignItems:'center',gap:10,width:'100%',padding:'11px 14px',borderRadius:12,border:`1px solid ${borderC}`,background:dark?'rgba(255,255,255,0.06)':'rgba(21,101,192,0.05)',cursor:'pointer',color:txt,fontFamily:'Inter,sans-serif' }}>
            {dark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1565c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
            <span style={{ fontSize:13,fontWeight:600 }}>{dark?'Mode Terang':'Mode Gelap'}</span>
          </button>
        </div>
      </div>
    </>
  );
}
