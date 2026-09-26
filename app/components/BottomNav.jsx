'use client';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';

const nav = [
  { href: '/', label: 'Home', icon: (active, color) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? color : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill={active ? color : 'none'}/>
      <polyline points="9 22 9 12 15 12 15 22" stroke={active ? '#fff' : color} strokeWidth={active ? 2 : 2}/>
    </svg>
  )},
  { href: '/movies', label: 'Film', icon: (active, color) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? color : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="3" fill={active ? color : 'none'}/>
      <line x1="7" y1="2" x2="7" y2="22" stroke={active ? '#fff' : color}/>
      <line x1="17" y1="2" x2="17" y2="22" stroke={active ? '#fff' : color}/>
      <line x1="2" y1="12" x2="22" y2="12" stroke={active ? '#fff' : color}/>
    </svg>
  )},
  { href: '/series', label: 'Series', icon: (active, color) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? color : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="15" rx="3" fill={active ? color : 'none'}/>
      <polyline points="17 2 12 7 7 2" stroke={color} fill="none"/>
    </svg>
  )},
  { href: '/watchlist', label: 'Watchlist', icon: (active, color) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? color : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" fill={active ? color : 'none'}/>
    </svg>
  )},
  { href: '/history', label: 'Riwayat', icon: (active, color) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" fill={active ? color : 'none'}/>
      <polyline points="12 6 12 12 16 14" stroke={active ? '#fff' : color}/>
    </svg>
  )},
  { href: '/developer', label: 'Dev', icon: (active, color) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  )},
  { href: '/search', label: 'Cari', icon: (active, color) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" fill={active ? color : 'none'}/>
      <line x1="21" y1="21" x2="16.65" y2="16.65" stroke={color} strokeWidth="2.5"/>
    </svg>
  )},
];

export default function BottomNav() {
  const path = usePathname();
  const { dark } = useTheme();

  return (
    <>
      <style>{`
        @supports (backdrop-filter: blur(1px)) {
          .bottom-nav {
            background: ${dark ? 'rgba(5,5,20,0.6) !important' : 'rgba(220,238,255,0.55) !important'};
          }
        }
        .nav-item { transition: all 0.2s; }
        .nav-item:active { transform: scale(0.9); }
      `}</style>
      <nav className="bottom-nav" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
        background: dark ? 'rgba(5,5,20,0.75)' : 'rgba(220,238,255,0.75)',
        backdropFilter: 'blur(40px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(40px) saturate(1.8)',
        borderTop: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.9)',
        boxShadow: dark ? '0 -8px 32px rgba(0,0,0,0.5)' : '0 -8px 32px rgba(21,101,192,0.1)',
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        paddingBottom: 'env(safe-area-inset-bottom, 12px)',
        height: 62,
      }}>
        {nav.map(n => {
          const active = path === n.href;
          const activeColor = dark ? '#4fc3f7' : '#1565c0';
          const inactiveColor = dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,80,0.3)';
          const color = active ? activeColor : inactiveColor;

          return (
            <a key={n.href} href={n.href} className="nav-item" style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              textDecoration: 'none', flex: 1, position: 'relative', padding: '6px 0',
            }}>
              {/* Active top indicator */}
              {active && (
                <div style={{
                  position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                  width: 28, height: 3, borderRadius: 3,
                  background: activeColor,
                  boxShadow: `0 0 10px ${activeColor}`,
                }} />
              )}

              {/* Active background pill */}
              {active && (
                <div style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 44, height: 34,
                  borderRadius: 12,
                  background: dark ? 'rgba(79,195,247,0.15)' : 'rgba(21,101,192,0.1)',
                }} />
              )}

              <div style={{ transform: active ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.2s', position: 'relative', zIndex: 1 }}>
                {n.icon(active, color)}
              </div>
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 400, color, position: 'relative', zIndex: 1 }}>{n.label}</span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
