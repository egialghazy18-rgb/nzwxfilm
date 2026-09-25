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

    // 400 partikel
    const particles = Array.from({ length: 400 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 8 + 2,
      dx: (Math.random() - 0.5) * 1.5,
      dy: (Math.random() - 0.5) * 1.5,
      o: Math.random() * 0.8 + 0.2,
      color: `hsl(${Math.random() * 80 + 180}, 90%, 65%)`,
      blur: Math.random() * 10,
    }));

    // 20 orbs gede
    const orbs = Array.from({ length: 20 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 300 + 100,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      h: Math.random() * 60 + 180,
    }));

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, W, H);

      // Orbs gede berat
      orbs.forEach(orb => {
        const g = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        g.addColorStop(0, `hsla(${orb.h},80%,60%,0.35)`);
        g.addColorStop(0.5, `hsla(${orb.h+30},70%,50%,0.15)`);
        g.addColorStop(1, `hsla(${orb.h},80%,60%,0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI*2);
        ctx.fill();
        orb.x += orb.dx; orb.y += orb.dy;
        if (orb.x < -orb.r || orb.x > W+orb.r) orb.dx *= -1;
        if (orb.y < -orb.r || orb.y > H+orb.r) orb.dy *= -1;
        orb.h = (orb.h + 0.1) % 360;
      });

      // Partikel dengan shadowBlur berat
      particles.forEach(p => {
        ctx.save();
        ctx.shadowBlur = p.blur * 4;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.o;
        ctx.fill();
        ctx.restore();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
      });

      // Koneksi berat semua partikel
      ctx.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i+1; j < Math.min(i+15, particles.length); j++) {
          const p = particles[i], q = particles[j];
          const d = Math.hypot(p.x-q.x, p.y-q.y);
          if (d < 150) {
            ctx.save();
            ctx.shadowBlur = 4;
            ctx.shadowColor = 'rgba(100,180,255,0.5)';
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(120,180,255,${0.3*(1-d/150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
      {/* Extra blur layer berat */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 20% 20%, rgba(100,150,255,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(255,100,200,0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(100,255,200,0.1) 0%, transparent 50%)',
        filter: 'blur(40px)',
      }} />
    </>
  );
}