'use client';
import { useState, useEffect } from 'react';

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem('splash_shown');
    if (shown) { setShow(false); return; }
    const t1 = setTimeout(() => setFadeOut(true), 2200);
    const t2 = setTimeout(() => { setShow(false); sessionStorage.setItem('splash_shown', '1'); }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column',
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.6s ease',
      pointerEvents: fadeOut ? 'none' : 'all',
    }}>
      <div style={{ animation: 'splashPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both' }}>
        <img src="/logo.png" alt="NzwxFilm" style={{ width: 280, maxWidth: '80vw', objectFit: 'contain' }} />
      </div>
      <div style={{ marginTop: 40, display: 'flex', gap: 8 }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: '50%',
            background: '#1565c0',
            animation: `splashDot 1.2s ${i * 0.2}s ease-in-out infinite`,
          }} />
        ))}
      </div>
      <style>{`
        @keyframes splashPop {
          from { opacity: 0; transform: scale(0.6); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes splashDot {
          0%, 100% { opacity: 0.2; transform: scale(0.7); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}