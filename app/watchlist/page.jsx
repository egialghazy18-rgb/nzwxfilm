'use client';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTheme } from '../context/ThemeContext';

export default function WatchlistPage() {
  const { dark } = useTheme();
  const [list, setList] = useLocalStorage('watchlist', []);
  const remove = (id) => setList(prev => prev.filter(f => f.id !== id));

  const bg = dark
    ? 'linear-gradient(180deg,#0a0a1a 0%,#0d1b3e 50%,#0a0a1a 100%)'
    : 'linear-gradient(180deg,#dff0fc 0%,#a8d4f5 30%,#1a6bb5 80%,#0b3270 100%)';
  const txt = dark ? '#fff' : '#1a237e';
  const sub = dark ? 'rgba(255,255,255,0.4)' : '#90a4ae';
  const ic = dark ? '#4fc3f7' : '#1565c0';

  return (
    <main style={{ minHeight:'100vh', background:bg, paddingBottom:100 }}>
      <div style={{ maxWidth:900, margin:'0 auto', padding:'60px 16px 80px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ic} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          <h1 style={{ fontSize:22, fontWeight:800, color:txt }}>Watchlist</h1>
        </div>
        <p style={{ fontSize:13, color:sub, marginBottom:24 }}>{list.length} film tersimpan</p>

        {list.length === 0 ? (
          <div style={{ textAlign:'center', padding:'60px 0', color:sub }}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke={sub} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom:12 }}><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/><line x1="17" y1="17" x2="22" y2="17"/></svg>
            <p style={{ fontWeight:600 }}>Belum ada film di watchlist</p>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(130px, 1fr))', gap:14 }}>
            {list.map(f => (
              <div key={f.id} style={{ position:'relative' }}>
                <a href={`/watch/${f.id}`} style={{ display:'block', textDecoration:'none' }}>
                  <div style={{ borderRadius:14, overflow:'hidden', aspectRatio:'2/3', background:dark?'#1a2744':'#1a3a5c' }}>
                    {f.poster && <img src={f.poster} alt={f.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />}
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 50%)', borderRadius:14 }} />
                    <div style={{ position:'absolute', bottom:8, left:8, right:8 }}>
                      <p style={{ fontSize:11, fontWeight:700, color:'#fff', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{f.title}</p>
                    </div>
                  </div>
                </a>
                <button onClick={() => remove(f.id)} style={{ position:'absolute', top:6, right:6, width:26, height:26, borderRadius:'50%', background:'rgba(229,9,20,0.85)', border:'none', color:'#fff', fontSize:12, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
