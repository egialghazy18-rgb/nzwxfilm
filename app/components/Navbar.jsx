'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
        }} />
      )}

      {/* Sidebar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0,
        width: 280, zIndex: 1001,
        background: 'linear-gradient(160deg, #0d1b3e 0%, #1a237e 100%)',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column',
        boxShadow: '4px 0 32px rgba(0,0,0,0.5)',
      }}>
        {/* Sidebar Header */}
        <div style={{ padding: '48px 24px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'rgba(255,255,255,0.9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, fontWeight: 900, color: '#1a237e',
            }}>N</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>NzwxFilm</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Nonton Tanpa Batas</div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, marginBottom: 12 }}>TENTANG</div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: 0 }}>
            NzwxFilm adalah platform streaming film & series online gratis. Temukan ribuan judul film populer, series terbaru, dan konten hiburan terbaik dari seluruh dunia — semua dalam satu tempat.
          </p>
        </div>

        {/* Menu Links */}
        <div style={{ padding: '16px 16px', flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, marginBottom: 12, paddingLeft: 8 }}>MENU</div>
          {[
            { href: '/', label: 'Beranda', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
            { href: '/movies', label: 'Film', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg> },
            { href: '/series', label: 'Series', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg> },
            { href: '/search', label: 'Cari Film', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> },
            { href: '/watchlist', label: 'Watchlist', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg> },
          ].map(l => (
            <a key={l.href} href={l.href} onClick={() => setSidebarOpen(false)} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 12px', borderRadius: 10, marginBottom: 4,
              textDecoration: 'none',
              background: pathname === l.href ? 'rgba(255,255,255,0.12)' : 'transparent',
              color: pathname === l.href ? '#fff' : 'rgba(255,255,255,0.6)',
              fontSize: 13, fontWeight: pathname === l.href ? 600 : 400,
              transition: 'all 0.2s',
            }}>{l.icon}{l.label}</a>
          ))}
        </div>

        {/* Developer Footer */}
        <div style={{ padding: '16px 24px 40px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, marginBottom: 10 }}>DEVELOPER</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #4fc3f7, #1565c0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 800, color: '#fff',
            }}>E</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Egii</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Full Stack Developer</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
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
        background: scrolled ? 'rgba(5,5,5,0.85)' : 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 20,
        boxShadow: '0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        transition: 'all 0.4s ease',
      }}>
        {/* Hamburger */}
        <button onClick={() => setSidebarOpen(true)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          padding: 4, display: 'flex', flexDirection: 'column',
          gap: 5, flexShrink: 0,
        }}>
          <span style={{ display:'block', width:20, height:2, background:'rgba(255,255,255,0.8)', borderRadius:2 }}/>
          <span style={{ display:'block', width:15, height:2, background:'rgba(255,255,255,0.8)', borderRadius:2 }}/>
          <span style={{ display:'block', width:20, height:2, background:'rgba(255,255,255,0.8)', borderRadius:2 }}/>
        </button>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, textDecoration:'none' }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'rgba(255,255,255,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 900, color: '#000',
          }}>N</div>
          <span style={{ fontWeight: 700, fontSize: 14, color: '#f5f5f7', letterSpacing: '-0.3px' }}>NzwxFilm</span>
        </Link>

        {/* Search */}
        <Link href="/search" style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 12px', borderRadius: 10,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.5)',
          fontSize: 12, flexShrink: 0, textDecoration:'none',
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          Cari
        </Link>
      </nav>
    </>
  );
}
