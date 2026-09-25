'use client';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';

const nav = [
  { href: '/', label: 'Home', svg: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { href: '/movies', label: 'Film', svg: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/><line x1="17" y1="17" x2="22" y2="17"/></svg> },
  { href: '/series', label: 'Series', svg: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
  { href: '/watchlist', label: 'Watchlist', svg: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg> },
  { href: '/history', label: 'Riwayat', svg: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  { href: '/search', label: 'Cari', svg: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> },
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
        const color = active ? (dark ? '#4fc3f7' : '#1565c0') : (dark ? 'rgba(255,255,255,0.4)' : '#90a4ae');
        return (
          <a key={n.href} href={n.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, textDecoration: 'none', flex: 1 }}>
            <div style={{ transform: active ? 'scale(1.2)' : 'scale(1)', transition: 'all 0.2s' }}>
              {n.svg(color)}
            </div>
            <span style={{ fontSize: 9, fontWeight: active ? 700 : 500, color }}>{n.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
