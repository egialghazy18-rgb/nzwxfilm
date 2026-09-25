'use client';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTheme } from '../context/ThemeContext';

export default function HistoryPage() {
  const { dark } = useTheme();
  const [recent, setRecent] = useLocalStorage('recently_viewed', []);
  const [cont, setCont] = useLocalStorage('continue_watching', []);

  const bg = dark
    ? 'linear-gradient(180deg,#0a0a1a 0%,#0d1b3e 50%,#0a0a1a 100%)'
    : 'linear-gradient(180deg,#dff0fc 0%,#a8d4f5 30%,#1a6bb5 80%,#0b3270 100%)';
  const txt = dark ? '#fff' : '#1a237e';
  const sub = dark ? 'rgba(255,255,255,0.5)' : '#78909c';
  const ic = dark ? '#4fc3f7' : '#1565c0';

  return (
    <main style={{ minHeight: '100vh', background: bg, paddingBottom: 100 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 16px 80px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ic} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          <h1 style={{ fontSize:22, fontWeight:800, color:txt }}>Riwayat</h1>
        </div>

        {cont.length > 0 && (
          <div style={{ marginBottom:32 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
              <h2 style={{ fontSize:16, fontWeight:700, color:txt, paddingLeft:12, borderLeft:'4px solid #4fc3f7', display:'flex', alignItems:'center', gap:8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill={ic}><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Lanjut Nonton
              </h2>
              <button onClick={() => setCont([])} style={{ fontSize:12, color:'#e53935', background:'none', border:'none', cursor:'pointer', fontWeight:600 }}>Hapus Semua</button>
            </div>
            <div style={{ display:'flex', gap:12, overflowX:'auto', paddingBottom:8 }}>
              {cont.map(f => (
                <a key={f.id} href={`/watch/${f.id}`} style={{ textDecoration:'none', flexShrink:0, width:120 }}>
                  <div style={{ borderRadius:12, overflow:'hidden', aspectRatio:'2/3', background:dark?'#1a2744':'#1a3a5c', position:'relative' }}>
                    {f.poster && <img src={f.poster} alt={f.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />}
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 50%)' }} />
                    <div style={{ position:'absolute', bottom:6, left:6, right:6 }}>
                      <p style={{ fontSize:10, fontWeight:700, color:'#fff', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{f.title}</p>
                      {f.season && <p style={{ fontSize:9, color:'rgba(255,255,255,0.7)' }}>S{f.season} E{f.episode}</p>}
                    </div>
                    <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:32, height:32, borderRadius:'50%', background:'rgba(255,255,255,0.85)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#1565c0"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        <div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
            <h2 style={{ fontSize:16, fontWeight:700, color:txt, paddingLeft:12, borderLeft:'4px solid #4fc3f7', display:'flex', alignItems:'center', gap:8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ic} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Terakhir Dilihat
            </h2>
            {recent.length > 0 && <button onClick={() => setRecent([])} style={{ fontSize:12, color:'#e53935', background:'none', border:'none', cursor:'pointer', fontWeight:600 }}>Hapus Semua</button>}
          </div>
          {recent.length === 0 ? (
            <div style={{ textAlign:'center', padding:'40px 0', color:sub }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={sub} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom:10 }}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <p style={{ fontWeight:600 }}>Belum ada riwayat</p>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(130px, 1fr))', gap:12 }}>
              {recent.map(f => (
                <a key={f.id} href={`/watch/${f.id}`} style={{ display:'block', textDecoration:'none' }}>
                  <div style={{ borderRadius:14, overflow:'hidden', aspectRatio:'2/3', background:dark?'#1a2744':'#1a3a5c', position:'relative' }}>
                    {f.poster && <img src={f.poster} alt={f.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />}
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 50%)' }} />
                    <div style={{ position:'absolute', bottom:8, left:8, right:8 }}>
                      <p style={{ fontSize:11, fontWeight:700, color:'#fff', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{f.title}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
