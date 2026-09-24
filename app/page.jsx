import { getTrending, getPopular, getPopularSeries, fmt } from './lib/tmdb';
import MovieCard from './components/MovieCard';
import HeroSlider from './components/HeroSlider';

function CategoryIcon({ icon, label, href }) {
  return (
    <a href={href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
      <div style={{
        width: 64, height: 64, borderRadius: 20,
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.9)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 26,
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      }}>{icon}</div>
      <span style={{ fontSize: 12, fontWeight: 600, color: '#1a1a2e' }}>{label}</span>
    </a>
  );
}

function Section({ title, items, href }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, padding: '0 16px' }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: '#1a1a2e', letterSpacing: '-0.3px' }}>{title}</h2>
        {href && (
          <a href={href} style={{
            fontSize: 12, color: '#2196f3', fontWeight: 600,
            background: 'rgba(33,150,243,0.1)',
            padding: '4px 12px', borderRadius: 100,
          }}>Lihat Semua</a>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12, padding: '0 16px' }}>
        {items.slice(0, 20).map(f => <MovieCard key={f.id} film={f} />)}
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
    <main style={{ minHeight: '100vh', background: '#e8f4f8' }}>

      {/* Top Bar */}
      <div style={{
        padding: '52px 20px 16px',
        background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 50%, #01579b 100%)',
        borderRadius: '0 0 32px 32px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 0%, rgba(255,255,255,0.08) 0%, transparent 60%)' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, position: 'relative' }}>
          <div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>Selamat datang di</p>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.5px' }}>
              Nzwx<span style={{ color: '#64b5f6' }}>Film</span>
            </h1>
          </div>
          <a href="/search" style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(12px)',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </a>
        </div>

        {/* Hero Slider */}
        <HeroSlider films={trending.slice(0, 5)} />
      </div>

      {/* Categories */}
      <div style={{ padding: '24px 20px', background: 'transparent' }}>
        <div style={{
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(20px)',
          borderRadius: 24,
          padding: '20px',
          border: '1px solid rgba(255,255,255,0.9)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          display: 'flex', justifyContent: 'space-around',
        }}>
          <CategoryIcon icon="🎬" label="Film" href="/movies" />
          <CategoryIcon icon="📺" label="Series" href="/series" />
          <CategoryIcon icon="🔥" label="Trending" href="/trending" />
          <CategoryIcon icon="🔍" label="Cari" href="/search" />
          <CategoryIcon icon="👨‍💻" label="Dev" href="/developer" />
        </div>
      </div>

      {/* Sections */}
      <Section title="🔥 Trending" items={trending} href="/trending" />
      <Section title="🎬 Film Populer" items={movies} href="/movies" />
      <Section title="📺 Series Populer" items={series} href="/series" />

    </main>
  );
}
