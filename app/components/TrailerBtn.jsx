'use client';
import { useState } from 'react';
export default function TrailerBtn({ videos }) {
  const [open, setOpen] = useState(false);
  const trailer = videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube') || videos?.results?.[0];
  if (!trailer) return null;
  return (
    <>
      <button onClick={() => setOpen(true)} style={{ display:'flex',alignItems:'center',gap:6,padding:'9px 18px',borderRadius:100,cursor:'pointer',fontWeight:700,fontSize:13,fontFamily:'Inter,sans-serif',background:'#e50914',color:'#fff',border:'none' }}>
        ▶ Trailer
      </button>
      {open && (
        <div onClick={() => setOpen(false)} style={{ position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',padding:16 }}>
          <div onClick={e => e.stopPropagation()} style={{ width:'100%',maxWidth:720,borderRadius:16,overflow:'hidden',position:'relative',paddingBottom:'56.25%',background:'#000' }}>
            <iframe src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`} style={{ position:'absolute',inset:0,width:'100%',height:'100%',border:'none' }} allowFullScreen allow="autoplay" />
          </div>
          <button onClick={() => setOpen(false)} style={{ position:'fixed',top:20,right:20,background:'rgba(255,255,255,0.15)',border:'none',color:'#fff',fontSize:24,width:44,height:44,borderRadius:'50%',cursor:'pointer' }}>✕</button>
        </div>
      )}
    </>
  );
}
