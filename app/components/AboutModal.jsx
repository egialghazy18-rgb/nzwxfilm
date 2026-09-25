'use client';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function AboutModal() {
  const { dark } = useTheme();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('dev');

  const bg = dark ? '#0d1b3e' : '#fff';
  const txt = dark ? '#fff' : '#0a2a52';
  const sub = dark ? 'rgba(255,255,255,0.55)' : '#546e7a';
  const card = dark ? 'rgba(255,255,255,0.07)' : '#f0f7ff';
  const border = dark ? 'rgba(255,255,255,0.1)' : '#e3f0fb';

  return (
    <>
      <button onClick={() => setOpen(true)} style={{ width:40,height:40,borderRadius:12,border:'none',cursor:'pointer',background:dark?'rgba(255,255,255,0.1)':'rgba(255,255,255,0.7)',display:'flex',alignItems:'center',justifyContent:'center' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={dark?'#4fc3f7':'#1565c0'} strokeWidth="2.5" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>

      {open && (
        <div style={{ position:'fixed',inset:0,zIndex:999,background:'rgba(0,0,0,0.6)',backdropFilter:'blur(6px)',display:'flex',alignItems:'flex-end',justifyContent:'center' }} onClick={() => setOpen(false)}>
          <div style={{ background:bg,borderRadius:'24px 24px 0 0',width:'100%',maxWidth:480,maxHeight:'88vh',overflowY:'auto',paddingBottom:40 }} onClick={e => e.stopPropagation()}>

            {/* Handle */}
            <div style={{ width:40,height:4,background:'rgba(128,128,128,0.3)',borderRadius:2,margin:'16px auto 0' }} />

            {/* Header */}
            <div style={{ padding:'20px 24px 0' }}>
              <h2 style={{ fontSize:22,fontWeight:900,color:txt,letterSpacing:'-0.5px' }}>Nzwx<span style={{color:'#1565c0'}}>Film</span></h2>
              <p style={{ fontSize:12,color:sub,marginTop:2 }}>Platform streaming film & series gratis</p>
            </div>

            {/* Tabs */}
            <div style={{ display:'flex',gap:8,padding:'16px 24px 0' }}>
              {['dev','nzwx'].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  padding:'8px 20px',borderRadius:10,border:'none',cursor:'pointer',fontWeight:700,fontSize:13,
                  background: tab===t ? '#1565c0' : card,
                  color: tab===t ? '#fff' : sub,
                  transition:'all 0.2s',
                }}>
                  {t === 'dev' ? 'Dev' : 'Nzwx'}
                </button>
              ))}
            </div>

            <div style={{ padding:'20px 24px 0' }}>

              {/* TAB DEV */}
              {tab === 'dev' && (
                <div>
                  {/* Avatar & Nama */}
                  <div style={{ display:'flex',alignItems:'center',gap:14,marginBottom:20 }}>
                    <div style={{ width:60,height:60,borderRadius:18,background:'linear-gradient(135deg,#1565c0,#4fc3f7)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                    <div>
                      <p style={{ fontSize:18,fontWeight:900,color:txt }}>Muhammad Egi Al-Ghazi</p>
                      <p style={{ fontSize:13,color:'#4fc3f7',fontWeight:600 }}>@Egii</p>
                    </div>
                  </div>

                  {/* Info Cards */}
                  <div style={{ display:'flex',gap:10,marginBottom:16 }}>
                    <div style={{ flex:1,background:card,borderRadius:14,padding:'12px 14px',border:`1px solid ${border}` }}>
                      <p style={{ fontSize:10,color:sub,marginBottom:3 }}>Umur</p>
                      <p style={{ fontSize:16,fontWeight:800,color:txt }}>15 Tahun</p>
                    </div>
                    <div style={{ flex:1,background:card,borderRadius:14,padding:'12px 14px',border:`1px solid ${border}` }}>
                      <p style={{ fontSize:10,color:sub,marginBottom:3 }}>Role</p>
                      <p style={{ fontSize:14,fontWeight:800,color:txt }}>Vibe Coder</p>
                    </div>
                    <div style={{ flex:1,background:card,borderRadius:14,padding:'12px 14px',border:`1px solid ${border}` }}>
                      <p style={{ fontSize:10,color:sub,marginBottom:3 }}>Status</p>
                      <p style={{ fontSize:13,fontWeight:800,color:'#4fc3f7' }}>Pelajar</p>
                    </div>
                  </div>

                  <div style={{ background:card,borderRadius:14,padding:'14px 16px',marginBottom:16,border:`1px solid ${border}` }}>
                    <p style={{ fontSize:13,color:sub,lineHeight:1.7 }}>
                      Developer di balik NzwxFilm. Pelajar berumur 15 tahun yang passionate di dunia programming. Suka bikin project web dari nol dan terus belajar teknologi baru.
                    </p>
                  </div>

                  {/* Sosmed */}
                  <p style={{ fontSize:11,color:sub,fontWeight:600,marginBottom:10,textTransform:'uppercase',letterSpacing:'0.5px' }}>Sosial Media</p>
                  <div style={{ display:'flex',flexDirection:'column',gap:10 }}>

                    {/* GitHub */}
                    <a href="https://github.com/egialghazy18-rgb" target="_blank" rel="noopener noreferrer" style={{ display:'flex',alignItems:'center',gap:12,background:card,borderRadius:14,padding:'12px 16px',textDecoration:'none',border:`1px solid ${border}` }}>
                      <div style={{ width:36,height:36,borderRadius:10,background:'#24292e',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                      </div>
                      <div>
                        <p style={{ fontSize:13,fontWeight:700,color:txt }}>GitHub</p>
                        <p style={{ fontSize:11,color:sub }}>egialghazy18-rgb</p>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={sub} strokeWidth="2" strokeLinecap="round" style={{ marginLeft:'auto' }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>

                    {/* TikTok */}
                    <a href="https://www.tiktok.com/@egialghazy_18" target="_blank" rel="noopener noreferrer" style={{ display:'flex',alignItems:'center',gap:12,background:card,borderRadius:14,padding:'12px 16px',textDecoration:'none',border:`1px solid ${border}` }}>
                      <div style={{ width:36,height:36,borderRadius:10,background:'#010101',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg>
                      </div>
                      <div>
                        <p style={{ fontSize:13,fontWeight:700,color:txt }}>TikTok</p>
                        <p style={{ fontSize:11,color:sub }}>@egialghazy_18</p>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={sub} strokeWidth="2" strokeLinecap="round" style={{ marginLeft:'auto' }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>

                    {/* Instagram */}
                    <a href="https://instagram.com/egi_alghazy18" target="_blank" rel="noopener noreferrer" style={{ display:'flex',alignItems:'center',gap:12,background:card,borderRadius:14,padding:'12px 16px',textDecoration:'none',border:`1px solid ${border}` }}>
                      <div style={{ width:36,height:36,borderRadius:10,background:'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                      </div>
                      <div>
                        <p style={{ fontSize:13,fontWeight:700,color:txt }}>Instagram</p>
                        <p style={{ fontSize:11,color:sub }}>egi_alghazy18</p>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={sub} strokeWidth="2" strokeLinecap="round" style={{ marginLeft:'auto' }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                  </div>
                </div>
              )}

              {/* TAB NZWX */}
              {tab === 'nzwx' && (
                <div>
                  <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:20 }}>
                    <div style={{ width:52,height:52,borderRadius:16,background:'linear-gradient(135deg,#1565c0,#4fc3f7)',display:'flex',alignItems:'center',justifyContent:'center' }}>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
                    </div>
                    <div>
                      <p style={{ fontSize:20,fontWeight:900,color:txt }}>Nzwx<span style={{color:'#1565c0'}}>Film</span></p>
                      <p style={{ fontSize:12,color:sub }}>v1.0.0 • 2026</p>
                    </div>
                  </div>

                  <div style={{ background:card,borderRadius:14,padding:'14px 16px',marginBottom:12,border:`1px solid ${border}` }}>
                    <p style={{ fontSize:11,color:sub,fontWeight:700,marginBottom:6,textTransform:'uppercase',letterSpacing:'0.5px' }}>Tentang</p>
                    <p style={{ fontSize:13,color:txt,lineHeight:1.7 }}>NzwxFilm adalah platform nonton film dan series online gratis. Dibangun dari nol oleh seorang developer muda berusia 15 tahun dengan passion di dunia web development.</p>
                  </div>

                  <div style={{ background:card,borderRadius:14,padding:'14px 16px',marginBottom:12,border:`1px solid ${border}` }}>
                    <p style={{ fontSize:11,color:sub,fontWeight:700,marginBottom:10,textTransform:'uppercase',letterSpacing:'0.5px' }}>Fitur</p>
                    {[
                      { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4fc3f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>, label:'Streaming film & series HD' },
                      { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4fc3f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>, label:'Trending & Now Playing realtime' },
                      { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4fc3f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>, label:'Watchlist & Riwayat tontonan' },
                      { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4fc3f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>, label:'Pencarian film & series' },
                      { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4fc3f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>, label:'Dark & Light mode' },
                    ].map((f,i) => (
                      <div key={i} style={{ display:'flex',alignItems:'center',gap:10,marginBottom:i<4?10:0 }}>
                        {f.icon}
                        <span style={{ fontSize:13,color:txt }}>{f.label}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display:'flex',gap:10 }}>
                    <div style={{ flex:1,background:card,borderRadius:14,padding:'12px 14px',border:`1px solid ${border}`,textAlign:'center' }}>
                      <p style={{ fontSize:10,color:sub,marginBottom:3 }}>Tech Stack</p>
                      <p style={{ fontSize:13,fontWeight:800,color:'#4fc3f7' }}>Next.js</p>
                    </div>
                    <div style={{ flex:1,background:card,borderRadius:14,padding:'12px 14px',border:`1px solid ${border}`,textAlign:'center' }}>
                      <p style={{ fontSize:10,color:sub,marginBottom:3 }}>Data</p>
                      <p style={{ fontSize:13,fontWeight:800,color:'#4fc3f7' }}>TMDB API</p>
                    </div>
                    <div style={{ flex:1,background:card,borderRadius:14,padding:'12px 14px',border:`1px solid ${border}`,textAlign:'center' }}>
                      <p style={{ fontSize:10,color:sub,marginBottom:3 }}>Hosting</p>
                      <p style={{ fontSize:13,fontWeight:800,color:'#4fc3f7' }}>Vercel</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            <div style={{ padding:'20px 24px 0' }}>
              <button onClick={() => setOpen(false)} style={{ width:'100%',padding:'13px',borderRadius:14,border:'none',background:'#1565c0',color:'#fff',fontWeight:700,fontSize:14,cursor:'pointer' }}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
