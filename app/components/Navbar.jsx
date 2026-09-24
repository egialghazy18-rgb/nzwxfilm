'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
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
      position: 'fixed', top: 12, left: '50%', transform: 'translateX(-50%)',
      zIndex: 999, width: 'calc(100% - 48px)', maxWidth: 1200,
      height: 56,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px',
      background: scrolled ? 'rgba(10,10,10,0.75)' : 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 16,
      transition: 'all 0.3s ease',
      boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,0,0,0.2)',
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 800, color: '#000',
        }}>N</div>
        <span style={{ fontWeight: 700, fontSize: 15, color: '#f5f5f7', letterSpacing: '-0.3px' }}>
          Nzwx<span style={{ color: 'rgba(255,255,255,0.4)' }}>Film</span>
        </span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {links.map(l => (
          <Link key={l.href} href={l.href} style={{
            padding: '6px 14px', borderRadius: 10, fontSize: 13,
            fontWeight: pathname === l.href ? 600 : 400,
            color: pathname === l.href ? '#fff' : 'rgba(255,255,255,0.4)',
            background: pathname === l.href ? 'rgba(255,255,255,0.1)' : 'transparent',
            border: pathname === l.href ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
            transition: 'all 0.2s',
          }}>{l.label}</Link>
        ))}
      </div>

      <Link href="/search" style={{
        display: 'flex', alignItems: 'center', gap: 7,
        padding: '7px 14px', borderRadius: 10,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12, fontWeight: 500,
        transition: 'all 0.2s',
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        Cari film...
      </Link>
    </nav>
  );
}
