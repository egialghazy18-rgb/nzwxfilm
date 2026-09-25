'use client';

export default function Skeleton() {
  return (
    <main style={{ minHeight: '100vh', background: '#dce8f5', paddingBottom: 100 }}>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .shim {
          background: linear-gradient(90deg, rgba(255,255,255,0.3) 25%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.3) 75%);
          background-size: 400px 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 12px;
        }
      `}</style>

      <div style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(24px)', padding: '52px 20px 14px', marginBottom: 0 }}>
        <div style={{ height: 28, width: 160 }} className="shim" />
      </div>

      <div style={{ padding: '12px 16px 0' }}>
        <div style={{ borderRadius: 20, aspectRatio: '16/7', width: '100%' }} className="shim" />
        <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 10 }}>
          {[...Array(8)].map((_,i) => <div key={i} style={{ width: 6, height: 6, borderRadius: 3 }} className="shim" />)}
        </div>
      </div>

      <div style={{ padding: '12px 16px', marginTop: 8 }}>
        <div style={{ borderRadius: 24, padding: '20px 16px', display: 'flex', justifyContent: 'space-around', background: 'rgba(255,255,255,0.6)' }}>
          {[...Array(5)].map((_,i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16 }} className="shim" />
              <div style={{ width: 36, height: 10, borderRadius: 6 }} className="shim" />
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 16px', marginBottom: 16 }}>
        <div style={{ height: 22, width: 120, marginBottom: 14 }} className="shim" />
        <div style={{ display: 'flex', gap: 12, overflowX: 'hidden' }}>
          {[...Array(3)].map((_,i) => (
            <div key={i} style={{ flex: '0 0 52vw', maxWidth: 200, borderRadius: 20, aspectRatio: '2/3' }} className="shim" />
          ))}
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ height: 22, width: 100, marginBottom: 14 }} className="shim" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
          {[...Array(6)].map((_,i) => (
            <div key={i} style={{ borderRadius: 16, aspectRatio: '2/3' }} className="shim" />
          ))}
        </div>
      </div>
    </main>
  );
}