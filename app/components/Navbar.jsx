'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
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
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
      height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px',
      background: scrolled
        ? 'rgba(13,13,13,0.97)'
        : 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          background: '#e50914',
          color: 'white',
          fontWeight: 900,
          fontSize: 20,
          width: 38, height: 38,
          borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          letterSpacing: '-1px',
        }}>N</div>
        <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.5px', color: '#fff' }}>
          Nzwx<span style={{ color: '#e50914' }}>Film</span>
        </span>
      </Link>

      {/* Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {links.map(l => (
          <Link key={l.href} href={l.href} style={{
            padding: '8px 16px',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: pathname === l.href ? 600 : 400,
            color: pathname === l.href ? '#fff' : 'rgba(255,255,255,0.55)',
            background: pathname === l.href ? 'rgba(255,255,255,0.08)' : 'transparent',
            transition: 'all 0.2s',
          }}>{l.label}</Link>
        ))}
      </div>

      {/* Search */}
      <Link href="/search" style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 16px',
        borderRadius: 8,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: 'rgba(255,255,255,0.55)',
        fontSize: 13,
        transition: 'all 0.2s',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        Cari...
      </Link>
    </nav>
  );
}
