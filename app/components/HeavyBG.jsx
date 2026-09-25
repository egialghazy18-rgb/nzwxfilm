'use client';
import { useEffect, useRef } from 'react';

export default function HeavyBG() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight * 3;

    const particles = Array.from({ length: 150 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 4 + 1,
      dx: (Math.random() - 0.5) * 0.8,
      dy: (Math.random() - 0.5) * 0.8,
      o: Math.random() * 0.6 + 0.2,
      color: `hsl(${Math.random() * 60 + 190}, 80%, 65%)`,
    }));

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, W, H);

      // Orbs gede blur
      [[W*0.2, H*0.1, 200, '100,150,255'], [W*0.8, H*0.2, 180, '255,100,150'], [W*0.5, H*0.35, 220, '100,200,255'], [W*0.3, H*0.5, 160, '200,100,255']].forEach(([x,y,r,rgb]) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${rgb},0.25)`);
        g.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI*2);
        ctx.fill();
      });

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.o;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
      });

      ctx.globalAlpha = 1;
      particles.forEach((p, i) => {
        particles.slice(i+1, i+8).forEach(q => {
          const d = Math.hypot(p.x-q.x, p.y-q.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(120,180,255,${0.2*(1-d/120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.7 }} />;
}