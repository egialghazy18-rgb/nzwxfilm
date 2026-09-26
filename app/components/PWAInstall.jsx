'use client';
import { useState, useEffect } from 'react';

export default function PWAInstall() {
  const [prompt, setPrompt] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPrompt(e);
      setShow(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const install = async () => {
    if (!prompt) return;
    prompt.prompt();
    const result = await prompt.userChoice;
    if (result.outcome === 'accepted') setShow(false);
  };

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 90, left: 16, right: 16, zIndex: 999,
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: 20, padding: '16px 20px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
      border: '1px solid rgba(255,255,255,0.9)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#1565c0,#0d47a1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🎬</div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#1a237e', marginBottom: 2 }}>Install NzwxFilm</p>
          <p style={{ fontSize: 11, color: '#78909c' }}>Tambah ke homescreen HP kamu</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setShow(false)} style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid #e0e0e0', background: 'transparent', fontSize: 12, color: '#78909c', cursor: 'pointer' }}>Nanti</button>
        <button onClick={install} style={{ padding: '8px 16px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#1565c0,#0d47a1)', fontSize: 12, color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Install</button>
      </div>
    </div>
  );
}