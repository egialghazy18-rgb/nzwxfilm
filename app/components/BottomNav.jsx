'use client';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';

const nav = [
  { href: '/', label: 'Home', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { href: '/movies', label: 'Film', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg> },
  { href: '/series', label: 'Series', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg> },
  { href: '/watchlist', label: 'Watchlist', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg> },
  { href: '/history', label: 'Riwayat', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  { href: '/search', label: 'Cari', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> },
];

export default function BottomNav() {
  const path = usePathname();
  const { dark } = useTheme();
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
      background: dark ? 'rgba(10,10,30,0.95)' : 'rgba(220,240,255,0.92)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderTop: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.6)',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '8px 0 20px',
    }}>
      {nav.map(n => {
        const active = path === n.href;
        const color = active ? (dark ? '#4fc3f7' : '#1565c0') : (dark ? 'rgba(255,255,255,0.35)' : '#90a4ae');
        return (
          <a key={n.href} href={n.href} style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:3,textDecoration:'none',flex:1,color }}>
            <div style={{ transform: active ? 'scale(1.15)' : 'scale(1)', transition: 'all 0.2s' }}>{n.icon}</div>
            <span style={{ fontSize: 9, fontWeight: active ? 700 : 500 }}>{n.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
