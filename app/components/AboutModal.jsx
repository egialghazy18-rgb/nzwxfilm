'use client';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function AboutModal() {
  const { dark } = useTheme();
  const [open, setOpen] = useState(false);

  const overlay = { position:'fixed',inset:0,zIndex:999,background:'rgba(0,0,0,0.6)',backdropFilter:'blur(6px)',display:'flex',alignItems:'flex-end',justifyContent:'center' };
  const sheet = { background:dark?'#0d1b3e':'#fff',borderRadius:'24px 24px 0 0',padding:'28px 24px 40px',width:'100%',maxWidth:480 };

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
        <div style={overlay} onClick={() => setOpen(false)}>
          <div style={sheet} onClick={e => e.stopPropagation()}>
            <div style={{ width:40,height:4,background:'rgba(128,128,128,0.3)',borderRadius:2,margin:'0 auto 24px' }} />
            <h2 style={{ fontSize:20,fontWeight:900,color:dark?'#fff':'#0a2a52',marginBottom:6 }}>Tentang <span style={{color:'#1565c0'}}>NzwxFilm</span></h2>
            <p style={{ fontSize:13,color:dark?'rgba(255,255,255,0.6)':'#546e7a',lineHeight:1.7,marginBottom:20 }}>
              NzwxFilm adalah platform streaming film dan series online gratis. Temukan ribuan judul dari berbagai genre — dari aksi, drama, hingga animasi — semuanya dalam satu tempat.
            </p>
            <div style={{ background:dark?'rgba(255,255,255,0.07)':'#f0f7ff',borderRadius:16,padding:'14px 16px',marginBottom:16 }}>
              <p style={{ fontSize:11,color:dark?'rgba(255,255,255,0.4)':'#90a4ae',marginBottom:2 }}>Dibuat oleh</p>
              <p style={{ fontSize:16,fontWeight:800,color:dark?'#4fc3f7':'#1565c0' }}>Egii</p>
            </div>
            <div style={{ background:dark?'rgba(255,255,255,0.07)':'#f0f7ff',borderRadius:16,padding:'14px 16px' }}>
              <p style={{ fontSize:11,color:dark?'rgba(255,255,255,0.4)':'#90a4ae',marginBottom:2 }}>Versi</p>
              <p style={{ fontSize:14,fontWeight:700,color:dark?'#fff':'#1a237e' }}>1.0.0</p>
            </div>
            <button onClick={() => setOpen(false)} style={{ marginTop:20,width:'100%',padding:'13px',borderRadius:14,border:'none',background:'#1565c0',color:'#fff',fontWeight:700,fontSize:14,cursor:'pointer' }}>
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}
