'use client';
import { useEffect, useRef } from 'react';

export default function HeavyBG() {
  const c1 = useRef(null);
  const c2 = useRef(null);
  const c3 = useRef(null);
  const c4 = useRef(null);

  useEffect(() => {
    const W = window.innerWidth * 2; // 2x RESOLUSI (HD)
    const H = window.innerHeight * 2;
    const canvases = [c1,c2,c3,c4].map(r => {
      const c = r.current;
      c.width = W; c.height = H;
      c.style.width = '100vw'; c.style.height = '100vh';
      return c.getContext('2d', { willReadFrequently: true });
    });

    // LAYER 1: 8000 partikel neon + 10 shadow layer tiap partikel
    const p1 = Array.from({length:8000},()=>({
      x:Math.random()*W, y:Math.random()*H,
      r:Math.random()*10+2,
      dx:(Math.random()-.5)*5, dy:(Math.random()-.5)*5,
      h:Math.random()*360,
    }));

    // LAYER 2: 500 orbs raksasa gradient
    const p2 = Array.from({length:500},()=>({
      x:Math.random()*W, y:Math.random()*H,
      r:Math.random()*300+100,
      dx:(Math.random()-.5)*1.5, dy:(Math.random()-.5)*1.5,
      h:Math.random()*360,
    }));

    // LAYER 3: 3000 bintang shimmer
    const p3 = Array.from({length:3000},()=>({
      x:Math.random()*W, y:Math.random()*H,
      r:Math.random()*3+0.5,
      pulse:Math.random()*Math.PI*2,
      h:Math.random()*60+180,
    }));

    // LAYER 4: 200 lightning bolt per frame
    const p4 = Array.from({length:200},()=>({
      x:Math.random()*W, y:Math.random()*H,
      h:Math.random()*360,
      len:Math.random()*200+100,
      angle:Math.random()*Math.PI*2,
    }));

    const ids = [];

    // DRAW LAYER 1 — partikel + koneksi O(n*150) + 10 shadow per partikel
    const draw1 = () => {
      const ctx = canvases[0];
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0,0,W,H);
      p1.forEach(p => {
        for(let i=0;i<10;i++){
          ctx.save();
          ctx.shadowBlur = 20 + i*30;
          ctx.shadowColor = `hsl(${p.h},100%,60%)`;
          ctx.beginPath();
          ctx.arc(p.x,p.y,p.r+i*4,0,Math.PI*2);
          ctx.fillStyle = `hsla(${p.h},100%,60%,${0.9-i*0.08})`;
          ctx.fill();
          ctx.restore();
        }
        p.x+=p.dx; p.y+=p.dy;
        if(p.x<0||p.x>W)p.dx*=-1;
        if(p.y<0||p.y>H)p.dy*=-1;
        p.h=(p.h+1.5)%360;
      });
      // Koneksi 150 tetangga per partikel
      for(let i=0;i<p1.length;i++){
        for(let j=i+1;j<Math.min(i+150,p1.length);j++){
          const a=p1[i],b=p1[j];
          const d=Math.hypot(a.x-b.x,a.y-b.y);
          if(d<400){
            ctx.save();
            ctx.shadowBlur=15;
            ctx.shadowColor=`hsl(${a.h},100%,60%)`;
            ctx.beginPath();
            ctx.moveTo(a.x,a.y);
            ctx.lineTo(b.x,b.y);
            ctx.strokeStyle=`hsla(${a.h},100%,70%,${0.7*(1-d/400)})`;
            ctx.lineWidth=2;
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      ids[0]=requestAnimationFrame(draw1);
    };

    // DRAW LAYER 2 — 500 orbs gede + nested gradient
    const draw2 = () => {
      const ctx = canvases[1];
      ctx.clearRect(0,0,W,H);
      p2.forEach(p => {
        // 3 nested gradient per orb
        for(let i=0;i<3;i++){
          const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*(1+i*0.5));
          g.addColorStop(0,`hsla(${p.h+i*40},100%,70%,0.6)`);
          g.addColorStop(0.5,`hsla(${p.h+i*80},80%,50%,0.3)`);
          g.addColorStop(1,`hsla(${p.h},100%,60%,0)`);
          ctx.fillStyle=g;
          ctx.beginPath();
          ctx.arc(p.x,p.y,p.r*(1+i*0.5),0,Math.PI*2);
          ctx.fill();
        }
        p.x+=p.dx; p.y+=p.dy;
        if(p.x<-p.r||p.x>W+p.r)p.dx*=-1;
        if(p.y<-p.r||p.y>H+p.r)p.dy*=-1;
        p.h=(p.h+0.5)%360;
      });
      ids[1]=requestAnimationFrame(draw2);
    };

    // DRAW LAYER 3 — bintang shimmer
    const draw3 = () => {
      const ctx = canvases[2];
      ctx.clearRect(0,0,W,H);
      p3.forEach(p => {
        p.pulse+=0.08;
        const bright = 60+Math.sin(p.pulse)*40;
        const size = p.r*(1+Math.sin(p.pulse)*0.8);
        ctx.save();
        ctx.shadowBlur=40;
        ctx.shadowColor=`hsl(${p.h},100%,${bright}%)`;
        ctx.beginPath();
        ctx.arc(p.x,p.y,size,0,Math.PI*2);
        ctx.fillStyle=`hsla(${p.h},100%,${bright}%,0.95)`;
        ctx.fill();
        // Cross flare
        ctx.shadowBlur=60;
        [-1,1].forEach(dir=>{
          ctx.beginPath();
          ctx.moveTo(p.x-size*4*dir,p.y);
          ctx.lineTo(p.x+size*4*dir,p.y);
          ctx.moveTo(p.x,p.y-size*4);
          ctx.lineTo(p.x,p.y+size*4);
          ctx.strokeStyle=`hsla(${p.h},100%,90%,0.4)`;
          ctx.lineWidth=1;
          ctx.stroke();
        });
        ctx.restore();
      });
      ids[2]=requestAnimationFrame(draw3);
    };

    // DRAW LAYER 4 — lightning
    const draw4 = () => {
      const ctx = canvases[3];
      ctx.clearRect(0,0,W,H);
      p4.forEach(p => {
        ctx.save();
        ctx.shadowBlur=30;
        ctx.shadowColor=`hsl(${p.h},100%,80%)`;
        ctx.strokeStyle=`hsla(${p.h},100%,90%,0.9)`;
        ctx.lineWidth=2;
        ctx.beginPath();
        let x=p.x,y=p.y;
        for(let s=0;s<12;s++){
          const nx=x+(Math.random()-.5)*80;
          const ny=y+p.len/12;
          ctx.moveTo(x,y);
          ctx.lineTo(nx,ny);
          x=nx; y=ny;
        }
        ctx.stroke();
        ctx.restore();
        p.x=Math.random()*W;
        p.y=Math.random()*H;
        p.h=(p.h+5)%360;
        p.angle=Math.random()*Math.PI*2;
      });
      ids[3]=requestAnimationFrame(draw4);
    };

    draw1(); draw2(); draw3(); draw4();
    return () => ids.forEach(id=>cancelAnimationFrame(id));
  }, []);

  const style = (z, op, blur) => ({
    position:'fixed', inset:0, zIndex:z,
    pointerEvents:'none', opacity:op,
    filter:`blur(${blur}px)`,
    width:'100vw', height:'100vh',
  });

  return (
    <>
      <canvas ref={c1} style={style(0,0.9,0)} />
      <canvas ref={c2} style={style(0,0.7,10)} />
      <canvas ref={c3} style={style(0,1,0)} />
      <canvas ref={c4} style={style(0,0.85,2)} />
      <div style={{
        position:'fixed',inset:0,zIndex:0,pointerEvents:'none',
        background:'radial-gradient(ellipse at center, rgba(0,0,30,0.3) 0%, rgba(0,0,0,0.7) 100%)',
      }}/>
    </>
  );
}
