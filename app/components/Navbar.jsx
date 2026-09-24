'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { href:'/', label:'Home' },
    { href:'/movies', label:'Movies' },
    { href:'/series', label:'Series' },
    { href:'/trending', label:'Trending' },
  ];

  return (
    <nav style={{
      position:'fixed',top:0,left:0,right:0,zIndex:100,
      padding:'0 24px',height:60,
      display:'flex',alignItems:'center',justifyContent:'space-between',
      background: scrolled ? 'rgba(10,10,15,0.95)' : 'rgba(10,10,15,0.3)',
      backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      transition:'all 0.3s ease',
    }}>
      <Link href="/" style={{display:'flex',alignItems:'center',gap:8}}>
        <div style={{width:32,height:32,borderRadius:8,background:'linear-gradient(135deg,#8b5cf6,#00d4ff)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:800,color:'white'}}>N</div>
        <span style={{fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:17,color:'#f1f5f9',letterSpacing:'-0.02em'}}>NzwxFilm</span>
      </Link>

      <div style={{display:'flex',alignItems:'center',gap:2}}>
        {links.map(l => (
          <Link key={l.href} href={l.href} style={{
            padding:'6px 14px',borderRadius:8,fontSize:13,fontWeight:500,
            color: pathname===l.href ? '#f1f5f9' : '#64748b',
            background: pathname===l.href ? 'rgba(255,255,255,0.07)' : 'transparent',
            transition:'all 0.2s',
          }}>{l.label}</Link>
        ))}
      </div>

      <Link href="/search" style={{
        display:'flex',alignItems:'center',gap:8,
        padding:'7px 14px',borderRadius:8,
        background:'rgba(255,255,255,0.05)',
        border:'1px solid rgba(255,255,255,0.08)',
        color:'#64748b',fontSize:13,
        transition:'all 0.2s',
      }}>
        <span>🔍</span>
        <span>Cari film...</span>
      </Link>
    </nav>
  );
}
