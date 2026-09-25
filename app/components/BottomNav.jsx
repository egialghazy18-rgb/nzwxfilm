'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Beranda', icon: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#1565c0' : 'none'} stroke={active ? '#1565c0' : '#90a4ae'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )},
  { href: '/movies', label: 'Film', icon: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#1565c0' : '#90a4ae'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/>
    </svg>
  )},
  { href: '/search', label: 'Cari', icon: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#1565c0' : '#90a4ae'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  )},
  { href: '/series', label: 'Series', icon: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#1565c0' : '#90a4ae'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/>
    </svg>
  )},
  { href: '/developer', label: 'Egii', icon: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#fff' : 'none'} stroke={active ? '#1565c0' : '#90a4ae'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  )},
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999,
      height: 68,
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderTop: '1px solid rgba(0,0,0,0.06)',
      boxShadow: '0 -4px 24px rgba(0,0,0,0.08)',
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {links.map(l => {
        const active = pathname === l.href;
        return (
          <Link key={l.href} href={l.href} style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 4,
            padding: '6px 16px', borderRadius: 16,
            background: 'transparent',
            boxShadow: 'none',
            transition: 'all 0.25s ease', minWidth: 56,
          }}>
            {l.icon(active)}
            <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? '#1565c0' : '#90a4ae' }}>{l.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}