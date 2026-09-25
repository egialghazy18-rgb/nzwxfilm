import { getTrending, getPopular, getPopularSeries, fmt } from './lib/tmdb';
import MovieCard from './components/MovieCard';
import HeroSlider from './components/HeroSlider';

function CategoryIcon({ icon, label, href }) {
  return (
    <a href={href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textDecoration: 'none', minWidth: 0 }}>
      <div style={{ width: 56, height: 56, borderRadius: 16, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', flexShrink: 0 }}>{icon}</div>
      <span style={{ fontSize: 11, fontWeight: 600, color: '#1a237e', whiteSpace: 'nowrap' }}>{label}</span>
    </a>
  );
}

function Section({ title, items, href }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: '#1a237e', letterSpacing: '-0.3px' }}>{title}</h2>
        {href && <a href={href} style={{ fontSize: 12, color: '#1565c0', fontWeight: 600, background: 'rgba(21,101,192,0.08)', padding: '4px 12px', borderRadius: 100 }}>Lihat Semua</a>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #dce8f5 0%, #b8d4ee 30%, #7aafd4 70%, #1a3a5c 100%)', backgroundAttachment: 'fixed', overflowX: 'hidden' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(160deg, #0d2b6b 0%, #1565c0 60%, #1e88e5 100%)', padding: '52px 16px 20px', borderRadius: '0 0 28px 28px', boxShadow: '0 8px 32px rgba(13,43,107,0.25)', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginBottom: 2 }}>Selamat datang di</p>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.5px' }}>Nzwx<span style={{ color: '#90caf9' }}>Film</span></h1>
          </div>
          <a href="/search" style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </a>
        </div>
        <HeroSlider films={trending.slice(0, 8)} />
      </div>

      {/* Body */}
      <div style={{ padding: '16px 16px 100px', position: 'relative', zIndex: 0 }}>

        {/* Categories */}
        <div style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(20px)', borderRadius: 20, padding: '16px', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-around', marginBottom: 24 }}>
          <CategoryIcon href="/movies" label="Film" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>} />
          <CategoryIcon href="/series" label="Series" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8e24aa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>} />
          <CategoryIcon href="/trending" label="Trending" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f57c00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>} />
          <CategoryIcon href="/search" label="Cari" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00897b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>} />
          <CategoryIcon href="/developer" label="Dev" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1565c0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>} />
        </div>

        <Section title="Now Playing" items={trending} href="/trending" />
        <Section title="Film Populer" items={movies} href="/movies" />
        <Section title="Series Populer" items={series} href="/series" />
      </div>
    </div>
  );
}
