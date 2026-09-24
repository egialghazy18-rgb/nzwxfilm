'use client';
import { useState, useEffect } from 'react';

const banners = [
  {
    id: 1,
    title: 'Nonton Film Terbaru',
    desc: 'Ribuan film & series tersedia gratis',
    bg: 'linear-gradient(135deg, #1c1c1e 0%, #2c2c2e 100%)',
    emoji: '🎬',
    color: '#fff',
  },
  {
    id: 2,
    title: 'Series Terpopuler',
    desc: 'Update setiap minggu, tanpa iklan',
    bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    emoji: '📺',
    color: '#fff',
  },
  {
    id: 3,
    title: 'Trending Minggu Ini',
    desc: 'Jangan sampai ketinggalan!',
    bg: 'linear-gradient(135deg, #0f0c29 0%, #302b63 100%)',
    emoji: '🔥',
    color: '#fff',
  },
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const b = banners[current];

  return (
    <div style={{ padding: '16px 16px 0', overflow: 'hidden' }}>
      <div style={{
        borderRadius: 20,
        background: b.bg,
        padding: '20px 24px',
        minHeight: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'background 0.5s ease',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -10, top: -10, fontSize: 80, opacity: 0.15 }}>{b.emoji}</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: b.color, marginBottom: 4, letterSpacing: '-0.3px' }}>{b.title}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 14 }}>{b.desc}</div>
          <a href="/movies" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '7px 16px',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: 100, color: '#fff',
            fontSize: 12, fontWeight: 600,
          }}>Tonton Sekarang →</a>
        </div>
        <div style={{ fontSize: 52 }}>{b.emoji}</div>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>
        {banners.map((_, i) => (
          <div key={i} onClick={() => setCurrent(i)} style={{
            width: i === current ? 20 : 6,
            height: 6,
            borderRadius: 3,
            background: i === current ? '#1c1c1e' : 'rgba(0,0,0,0.15)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }} />
        ))}
      </div>
    </div>
  );
}
