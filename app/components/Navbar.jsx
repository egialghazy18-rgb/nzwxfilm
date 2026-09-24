'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { href: '/', label: 'Beranda' },
    { href: '/movies', label: 'Film' },
    { href: '/series', label: 'Series' },
    { href: '/trending', label: 'Trending' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 16, left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 999,
      width: 'calc(100% - 32px)',
      maxWidth: 900,
      height: 52,
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      background: scrolled
        ? 'rgba(5,5,5,0.85)'
        : 'rgba(255,255,255,0.07)',
      backdropFilter: 'blur(32px)',
      WebkitBackdropFilter: 'blur(32px)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 20,
      boxShadow: '0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
      transition: 'all 0.4s ease',
    }}>

      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: 'rgba(255,255,255,0.9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 900, color: '#000',
          boxShadow: '0 2px 8px rgba(255,255,255,0.2)',
        }}>N</div>
        <span style={{ fontWeight: 700, fontSize: 14, color: '#f5f5f7', letterSpacing: '-0.3px' }}>
          NzwxFilm
        </span>
      </Link>

      {/* Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {links.map(l => (
          <Link key={l.href} href={l.href} style={{
            padding: '5px 12px', borderRadius: 10,
            fontSize: 12, fontWeight: pathname === l.href ? 600 : 400,
            color: pathname === l.href ? '#fff' : 'rgba(255,255,255,0.45)',
            background: pathname === l.href
              ? 'rgba(255,255,255,0.12)'
              : 'transparent',
            border: pathname === l.href
              ? '1px solid rgba(255,255,255,0.12)'
              : '1px solid transparent',
            transition: 'all 0.2s',
          }}>{l.label}</Link>
        ))}
      </div>

      {/* Search */}
      <Link href="/search" style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '6px 12px', borderRadius: 10,
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: 'rgba(255,255,255,0.5)',
        fontSize: 12, flexShrink: 0,
      }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        Cari
      </Link>
    </nav>
  );
}
