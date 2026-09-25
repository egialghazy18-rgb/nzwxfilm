'use client';
export default function ShareBtn({ title, id }) {
  const getUrl = () => typeof window !== 'undefined' ? window.location.href : `https://nzwxfilm.vercel.app/watch/${id}`;
  const shareWA = () => window.open(`https://wa.me/?text=${encodeURIComponent(`🎬 ${title}\n${getUrl()}`)}`, '_blank');
  const shareNative = async () => {
    const url = getUrl();
    if (navigator.share) { try { await navigator.share({ title, url }); } catch {} }
    else { await navigator.clipboard.writeText(url); alert('Link disalin!'); }
  };
  return (
    <div style={{ display:'flex',gap:8,flexWrap:'wrap' }}>
      <button onClick={shareWA} style={{ display:'flex',alignItems:'center',gap:6,padding:'9px 18px',borderRadius:100,cursor:'pointer',fontWeight:700,fontSize:13,fontFamily:'Inter,sans-serif',background:'#25D366',color:'#fff',border:'none' }}>
        📲 WhatsApp
      </button>
      <button onClick={shareNative} style={{ display:'flex',alignItems:'center',gap:6,padding:'9px 18px',borderRadius:100,cursor:'pointer',fontWeight:700,fontSize:13,fontFamily:'Inter,sans-serif',background:'rgba(21,101,192,0.1)',color:'#1565c0',border:'1.5px solid rgba(21,101,192,0.3)' }}>
        🔗 Salin Link
      </button>
    </div>
  );
}
