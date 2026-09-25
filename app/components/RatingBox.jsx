'use client';
import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
export default function RatingBox({ filmId }) {
  const [reviews, setReviews] = useLocalStorage(`reviews_${filmId}`, []);
  const [star, setStar] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const submit = () => {
    if (!star) return alert('Pilih bintang dulu!');
    setReviews(prev => [{ name: name||'Anonim', star, text, date: new Date().toLocaleDateString('id-ID') }, ...prev].slice(0,50));
    setStar(0); setText(''); setName('');
  };
  const avg = reviews.length ? (reviews.reduce((a,r) => a+r.star, 0)/reviews.length).toFixed(1) : null;
  return (
    <div style={{ background:'rgba(255,255,255,0.85)',backdropFilter:'blur(12px)',borderRadius:20,padding:20,border:'1px solid rgba(255,255,255,0.9)',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',marginBottom:12 }}>
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16 }}>
        <h3 style={{ fontSize:14,fontWeight:700,color:'#1a237e' }}>Rating & Ulasan</h3>
        {avg && <span style={{ fontSize:18,fontWeight:800,color:'#f59e0b' }}>★ {avg} <span style={{ fontSize:12,color:'#78909c',fontWeight:500 }}>({reviews.length} ulasan)</span></span>}
      </div>
      <input placeholder="Nama (opsional)" value={name} onChange={e=>setName(e.target.value)} style={{ width:'100%',padding:'9px 14px',borderRadius:10,border:'1.5px solid rgba(21,101,192,0.2)',fontSize:13,marginBottom:8,fontFamily:'Inter,sans-serif',boxSizing:'border-box',outline:'none' }} />
      <div style={{ display:'flex',gap:4,marginBottom:10 }}>
        {[1,2,3,4,5].map(s => (
          <span key={s} onClick={()=>setStar(s)} onMouseEnter={()=>setHover(s)} onMouseLeave={()=>setHover(0)} style={{ fontSize:28,cursor:'pointer',color:s<=(hover||star)?'#f59e0b':'#d1d5db',transition:'color 0.15s' }}>★</span>
        ))}
      </div>
      <textarea placeholder="Tulis ulasanmu..." value={text} onChange={e=>setText(e.target.value)} rows={3} style={{ width:'100%',padding:'9px 14px',borderRadius:10,border:'1.5px solid rgba(21,101,192,0.2)',fontSize:13,resize:'none',fontFamily:'Inter,sans-serif',boxSizing:'border-box',outline:'none',marginBottom:8 }} />
      <button onClick={submit} style={{ width:'100%',padding:10,borderRadius:10,border:'none',background:'#1565c0',color:'#fff',fontWeight:700,fontSize:14,cursor:'pointer',fontFamily:'Inter,sans-serif' }}>Kirim Ulasan</button>
      {reviews.length > 0 && (
        <div style={{ marginTop:16,display:'flex',flexDirection:'column',gap:10 }}>
          {reviews.map((r,i) => (
            <div key={i} style={{ padding:'12px 14px',background:'rgba(21,101,192,0.05)',borderRadius:12,border:'1px solid rgba(21,101,192,0.1)' }}>
              <div style={{ display:'flex',justifyContent:'space-between',marginBottom:4 }}>
                <span style={{ fontWeight:700,fontSize:13,color:'#1a237e' }}>{r.name}</span>
                <span style={{ fontSize:11,color:'#78909c' }}>{r.date}</span>
              </div>
              <div style={{ color:'#f59e0b',fontSize:14,marginBottom:4 }}>{'★'.repeat(r.star)}{'☆'.repeat(5-r.star)}</div>
              {r.text && <p style={{ fontSize:13,color:'#546e7a',lineHeight:1.6 }}>{r.text}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
