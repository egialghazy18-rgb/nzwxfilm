export default function DeveloperPage() {
  const skills = ['Next.js', 'React', 'JavaScript', 'TypeScript', 'Tailwind', 'Node.js', 'Git', 'Vercel'];
  const projects = [
    { name: 'NzwxFilm', desc: 'Platform streaming film & series gratis', tech: 'Next.js + TMDB API', status: '🟢 Live' },
    { name: 'Project 2', desc: 'Coming soon...', tech: '???', status: '🔵 Dev' },
  ];

  return (
    <main style={{ minHeight: '100vh', background: '#f2f2f7', paddingBottom: 100 }}>

      {/* Header */}
      <div style={{
        background: '#1c1c1e',
        padding: '60px 20px 40px',
        textAlign: 'center',
        borderRadius: '0 0 32px 32px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 70%)' }} />

        {/* Avatar */}
        <div style={{
          width: 90, height: 90,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #fff 0%, #c7c7cc 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36, fontWeight: 900, color: '#1c1c1e',
          margin: '0 auto 16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          border: '3px solid rgba(255,255,255,0.15)',
        }}>E</div>

        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: 6 }}>Egii</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Full Stack Developer</p>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Creator of NzwxFilm 🎬</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 20 }}>
          <a href="https://github.com/egialghazy18-rgb" target="_blank" style={{
            padding: '8px 18px',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 100, color: '#fff', fontSize: 12, fontWeight: 600,
            backdropFilter: 'blur(12px)',
          }}>GitHub →</a>
        </div>
      </div>

      <div style={{ padding: '24px 16px' }}>

        {/* Skills */}
        <div style={{
          background: '#fff', borderRadius: 20,
          padding: '20px', marginBottom: 16,
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1c1c1e', marginBottom: 14 }}>⚡ Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {skills.map(s => (
              <span key={s} style={{
                padding: '6px 14px',
                background: '#f2f2f7',
                borderRadius: 100, fontSize: 12, fontWeight: 600, color: '#1c1c1e',
                border: '1px solid rgba(0,0,0,0.06)',
              }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div style={{
          background: '#fff', borderRadius: 20,
          padding: '20px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1c1c1e', marginBottom: 14 }}>🚀 Projects</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {projects.map(p => (
              <div key={p.name} style={{
                padding: '14px 16px',
                background: '#f2f2f7',
                borderRadius: 14,
                border: '1px solid rgba(0,0,0,0.04)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#1c1c1e' }}>{p.name}</span>
                  <span style={{ fontSize: 11, color: '#8e8e93' }}>{p.status}</span>
                </div>
                <p style={{ fontSize: 12, color: '#8e8e93', marginBottom: 6 }}>{p.desc}</p>
                <span style={{
                  fontSize: 11, fontWeight: 600, color: '#1c1c1e',
                  background: '#e5e5ea', padding: '3px 10px', borderRadius: 100,
                }}>{p.tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
