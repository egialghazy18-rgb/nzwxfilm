'use client';
import { useEffect, useRef } from 'react';

export default function HeavyBG() {
  const c1 = useRef(null);
  const c2 = useRef(null);
  const c3 = useRef(null);

  useEffect(() => {
    const canvases = [c1.current, c2.current, c3.current].filter(Boolean);
    const W = window.innerWidth;
    const H = window.innerHeight * 4;
    const ctxs = canvases.map(c => { c.width=W; c.height=H; return c.getContext('2d'); });

    // Canvas 1: 600 partikel shadowBlur gila
    const p1 = Array.from({length:600},()=>({
      x:Math.random()*W, y:Math.random()*H,
      r:Math.random()*6+1,
      dx:(Math.random()-.5)*2, dy:(Math.random()-.5)*2,
      h:Math.random()*360, s:Math.random()*0.7+0.3,
    }));

    // Canvas 2: 300 orbs besar
    const p2 = Array.from({length:300},()=>({
      x:Math.random()*W, y:Math.random()*H,
      r:Math.random()*120+40,
      dx:(Math.random()-.5)*0.5, dy:(Math.random()-.5)*0.5,
      h:Math.random()*360,
    }));

    // Canvas 3: 1000 titik kecil
    const p3 = Array.from({length:1000},()=>({
      x:Math.random()*W, y:Math.random()*H,
      r:Math.random()*2+0.5,
      dx:(Math.random()-.5)*3, dy:(Math.random()-.5)*3,
      h:Math.random()*60+180,
    }));

    const ids = [];

    const draw1 = () => {
      const ctx = ctxs[0];
      ctx.clearRect(0,0,W,H);
      p1.forEach(p => {
        for(let i=0;i<3;i++){
          ctx.save();
          ctx.shadowBlur = 30+i*20;
          ctx.shadowColor = `hsl(${p.h},90%,60%)`;
          ctx.beginPath();
          ctx.arc(p.x,p.y,p.r+i*2,0,Math.PI*2);
          ctx.fillStyle = `hsla(${p.h},90%,60%,${p.s})`;
          ctx.fill();
          ctx.restore();
        }
        p.x+=p.dx; p.y+=p.dy;
        if(p.x<0||p.x>W)p.dx*=-1;
        if(p.y<0||p.y>H)p.dy*=-1;
        p.h=(p.h+0.5)%360;
      });
      // Koneksi semua dengan shadowBlur
      for(let i=0;i<p1.length;i++){
        for(let j=i+1;j<Math.min(i+20,p1.length);j++){
          const a=p1[i],b=p1[j];
          const d=Math.hypot(a.x-b.x,a.y-b.y);
          if(d<200){
            ctx.save();
            ctx.shadowBlur=8;
            ctx.shadowColor=`hsl(${a.h},80%,60%)`;
            ctx.beginPath();
            ctx.moveTo(a.x,a.y);
            ctx.lineTo(b.x,b.y);
            ctx.strokeStyle=`hsla(${a.h},80%,60%,${0.4*(1-d/200)})`;
            ctx.lineWidth=1.5;
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      ids[0]=requestAnimationFrame(draw1);
    };

    const draw2 = () => {
      const ctx = ctxs[1];
      ctx.clearRect(0,0,W,H);
      p2.forEach(p => {
        const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
        g.addColorStop(0,`hsla(${p.h},80%,60%,0.5)`);
        g.addColorStop(0.4,`hsla(${p.h+40},70%,50%,0.3)`);
        g.addColorStop(1,`hsla(${p.h},80%,60%,0)`);
        ctx.fillStyle=g;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
        p.x+=p.dx; p.y+=p.dy;
        if(p.x<-p.r||p.x>W+p.r)p.dx*=-1;
        if(p.y<-p.r||p.y>H+p.r)p.dy*=-1;
        p.h=(p.h+0.3)%360;
      });
      ids[1]=requestAnimationFrame(draw2);
    };

    const draw3 = () => {
      const ctx = ctxs[2];
      ctx.clearRect(0,0,W,H);
      p3.forEach(p => {
        ctx.save();
        ctx.shadowBlur=15;
        ctx.shadowColor=`hsl(${p.h},90%,70%)`;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`hsla(${p.h},90%,70%,0.9)`;
        ctx.fill();
        ctx.restore();
        p.x+=p.dx; p.y+=p.dy;
        if(p.x<0||p.x>W)p.dx*=-1;
        if(p.y<0||p.y>H)p.dy*=-1;
      });
      ids[2]=requestAnimationFrame(draw3);
    };

    draw1(); draw2(); draw3();
    return () => ids.forEach(id=>cancelAnimationFrame(id));
  }, []);

  return (
    <>
      <canvas ref={c1} style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none',opacity:0.8,filter:'blur(2px)'}} />
      <canvas ref={c2} style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none',opacity:0.6,filter:'blur(8px)'}} />
      <canvas ref={c3} style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none',opacity:1,filter:'blur(1px)'}} />
      <div style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none',backdropFilter:'blur(2px)',WebkitBackdropFilter:'blur(2px)'}} />
    </>
  );
}