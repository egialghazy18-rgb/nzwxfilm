'use client';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';

const nav = [
  { href: '/', icon: '🏠', label: 'Home' },
  { href: '/movies', icon: '🎬', label: 'Film' },
  { href: '/series', icon: '📺', label: 'Series' },
  { href: '/watchlist', icon: '🔖', label: 'Watchlist' },
  { href: '/history', icon: '🕐', label: 'Riwayat' },
  { href: '/search', icon: '🔍', label: 'Cari' },
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
        return (
          <a key={n.href} href={n.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, textDecoration: 'none', flex: 1 }}>
            <div style={{
              fontSize: 20, lineHeight: 1,
              filter: active ? 'none' : 'grayscale(0.3)',
              transform: active ? 'scale(1.2)' : 'scale(1)',
              transition: 'all 0.2s',
            }}>{n.icon}</div>
            <span style={{ fontSize: 9, fontWeight: active ? 700 : 500, color: active ? (dark ? '#4fc3f7' : '#1565c0') : (dark ? 'rgba(255,255,255,0.4)' : '#90a4ae') }}>{n.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
