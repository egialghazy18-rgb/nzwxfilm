import { getTrending, getPopular, getPopularSeries, fmt } from './lib/tmdb';
import NowPlaying from './components/NowPlaying';
import HeroSlider from './components/HeroSlider';

function CategoryIcon({ icon, label, href }) {
  return (
    <a href={href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
      <div style={{ width: 60, height: 60, borderRadius: 18, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>{icon}</div>
      <span style={{ fontSize: 11, fontWeight: 600, color: '#1a237e' }}>{label}</span>
    </a>
  );
}

function Section({ title, items, href }) {
  return (
    <section style={{ marginBottom: 32, padding: '0 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: '#1a237e', letterSpacing: '-0.3px', paddingLeft: 12, borderLeft: '4px solid #1565c0', borderRadius: 2 }}>{title}</h2>
        {href && <a href={href} style={{ fontSize: 12, color: '#1565c0', fontWeight: 600 }}>Lihat Semua →</a>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
        {items.slice(0, 20).map(f => (
          <a key={f.id} href={`/watch/${f.id}`} style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{ borderRadius: 14, overflow: 'hidden', position: 'relative', aspectRatio: '2/3', background: '#1a1a2e' }}>
              {f.poster && <img src={f.poster} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', borderRadius: 6, padding: '2px 7px', fontSize: 10, fontWeight: 700, color: '#fff' }}>★ {f.rating?.toFixed(1)}</div>
              <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 2 }}>{f.title}</p>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>{f.release_date?.slice(0,4)}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const [t, m, s] = await Promise.all([getTrending(), getPopular(), getPopularSeries()]);
  const trending = (t.results || []).map(fmt);
  const movies = (m.results || []).map(fmt);
  const series = (s.results || []).map(fmt);

  return (
    <div style={{ minHeight: '100vh', background: '#e8f1fb', overflowX: 'hidden' }}>

      {/* Sticky Navbar glass */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(232,241,251,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.6)',
        padding: '14px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
      }}>
        <div>
          <p style={{ fontSize: 11, color: 'rgba(26,35,126,0.5)', marginBottom: 1 }}>Selamat datang di</p>
          <h1 style={{ fontSize: 20, fontWeight: 900, color: '#1a237e', letterSpacing: '-0.5px' }}>
            Nzwx<span style={{ color: '#1565c0' }}>Film</span>
          </h1>
        </div>
        <a href="/search" style={{
          width: 40, height: 40, borderRadius: 12,
          background: 'rgba(255,255,255,0.7)',
          border: '1px solid rgba(255,255,255,0.9)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1565c0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </a>
      </div>

      {/* Hero Slider */}
      <div style={{ padding: '16px 16px 0' }}>
        <HeroSlider films={trending.slice(0, 8)} />
      </div>

      {/* Categories */}
      <div style={{ padding: '16px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(20px)',
          borderRadius: 22, padding: '16px 12px',
          border: '1px solid rgba(255,255,255,0.95)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          display: 'flex', justifyContent: 'space-around',
        }}>
          <CategoryIcon href="/movies" label="Film" icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>} />
          <CategoryIcon href="/series" label="Series" icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8e24aa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>} />
          <CategoryIcon href="/trending" label="Trending" icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f57c00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>} />
          <CategoryIcon href="/search" label="Cari" icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00897b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>} />
          <CategoryIcon href="/developer" label="Dev" icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1565c0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>} />
        </div>
      </div>

      {/* Now Playing — horizontal scroll mirip m.tix */}
      <NowPlaying films={trending} />

      {/* Sections grid */}
      <div style={{ paddingTop: 8 }}>
        <Section title="Trending" items={trending} href="/trending" />
        <Section title="Film Populer" items={movies} href="/movies" />
        <Section title="Series Populer" items={series} href="/series" />
      </div>
    </div>
  );
}
