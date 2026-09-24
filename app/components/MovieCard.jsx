'use client';
import Link from 'next/link';

export default function MovieCard({ film }) {
  return (
    <Link href={`/watch/${film.id}`} style={{display:'block'}}>
      <div style={{borderRadius:10,overflow:'hidden',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',transition:'all 0.25s ease',cursor:'pointer'}}
        onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.borderColor='rgba(139,92,246,0.3)';e.currentTarget.style.boxShadow='0 12px 32px rgba(0,0,0,0.4)'}}
        onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.borderColor='rgba(255,255,255,0.06)';e.currentTarget.style.boxShadow='none'}}>
        <div style={{position:'relative',aspectRatio:'2/3',overflow:'hidden',background:'#0d0d14'}}>
          {film.poster
            ? <img src={film.poster} alt={film.title} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} loading="lazy" />
            : <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,color:'#2d2d44'}}>🎬</div>
          }
          <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(10,10,15,0.85) 0%,transparent 50%)'}} />
          <div style={{position:'absolute',top:8,right:8,background:'rgba(0,0,0,0.75)',backdropFilter:'blur(8px)',borderRadius:6,padding:'3px 8px',fontSize:11,fontWeight:600,color:'#f59e0b',display:'flex',alignItems:'center',gap:3}}>
            ⭐ {film.rating?.toFixed(1)}
          </div>
          {film.type === 'tv' && (
            <div style={{position:'absolute',top:8,left:8,background:'rgba(139,92,246,0.85)',borderRadius:6,padding:'2px 7px',fontSize:10,fontWeight:600,color:'white'}}>SERIES</div>
          )}
        </div>
        <div style={{padding:'10px 12px'}}>
          <div style={{fontSize:13,fontWeight:600,color:'#f1f5f9',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',fontFamily:'Outfit,sans-serif'}}>{film.title}</div>
          <div style={{fontSize:11,color:'#64748b',marginTop:2}}>{film.release_date?.slice(0,4)}</div>
        </div>
      </div>
    </Link>
  );
}
