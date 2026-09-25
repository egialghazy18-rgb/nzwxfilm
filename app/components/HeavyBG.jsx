'use client';
import { useEffect, useRef } from 'react';

export default function HeavyBG() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.width = window.innerWidth;
    const H = canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    // 800 partikel — sedang, ga terlalu berat
    const particles = Array.from({ length: 800 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 5 + 1,
      dx: (Math.random() - 0.5) * 1.5,
      dy: (Math.random() - 0.5) * 1.5,
      // Warna biru-putih aja
      h: 200 + Math.random() * 40,
      l: 70 + Math.random() * 30,
    }));

    let running = true;

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);

      particles.forEach(p => {
        // 3 shadow layer — sedang
        for (let i = 0; i < 3; i++) {
          ctx.save();
          ctx.shadowBlur = 15 + i * 15;
          ctx.shadowColor = `hsl(${p.h}, 80%, ${p.l}%)`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r + i * 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.h}, 80%, ${p.l}%, ${0.8 - i * 0.2})`;
          ctx.fill();
          ctx.restore();
        }
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
      });

      // Koneksi 30 tetangga — sedang
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < Math.min(i + 30, particles.length); j++) {
          const a = particles[i], b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 150) {
            ctx.save();
            ctx.shadowBlur = 6;
            ctx.shadowColor = `hsl(${a.h}, 80%, 80%)`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(${a.h}, 80%, 85%, ${0.5 * (1 - d / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      requestAnimationFrame(draw);
    };

    draw();
    return () => { running = false; };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        filter: 'blur(0.5px)',
      }}
    />
  );
}
