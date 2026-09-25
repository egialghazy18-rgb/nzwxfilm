import { getTrending, getTrendingSeries, getPopular, getPopularSeries, fmt } from './lib/tmdb';
import MovieCard from './components/MovieCard';
import BannerSlider from './components/BannerSlider';

function CategoryIcon({ icon, label, href }) {
  return (
    <a href={href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: 60, height: 60, borderRadius: 18,
        background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        border: '1px solid rgba(255,255,255,0.9)',
      }}>{icon}</div>
      <span style={{ fontSize: 11, fontWeight: 600, color: '#1a237e' }}>{label}</span>
    </a>
  );
}

function Section({ title, items, href }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, padding: '0 16px' }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: '#1a237e', letterSpacing: '-0.3px' }}>{title}</h2>
        {href && (
          <a href={href} style={{ fontSize: 12, color: '#1565c0', fontWeight: 600, background: 'rgba(21,101,192,0.1)', padding: '4px 12px', borderRadius: 100 }}>Lihat Semua</a>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12, padding: '0 16px' }}>
        {items.slice(0, 20).map(f => <MovieCard key={f.id} film={f} />)}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const [t, ts, m, s] = await Promise.all([getTrending(), getTrendingSeries(), getPopular(), getPopularSeries()]);
  const trending = [...(t.results || []).map(fmt), ...(ts.results || []).map(fmt)].slice(0, 10);
  const movies = (m.results || []).map(fmt);
  const series = (s.results || []).map(fmt);

  return (
    <main style={{ minHeight: '100vh', background: '#dce8f5' }}>

      {/* Header glass - mirip MTix */}
      <div style={{
        background: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.3)',
        padding: '52px 20px 16px',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: 11, color: 'rgba(13,43,107,0.6)', marginBottom: 1 }}>Selamat datang di</p>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: '#0d2b6b', letterSpacing: '-0.5px' }}>
              Nzwx<span style={{ color: '#1565c0' }}>Film</span>
            </h1>
          </div>
          <a href="/search" style={{
            width: 42, height: 42, borderRadius: 14,
            background: 'rgba(21,101,192,0.12)',
            border: '1.5px solid rgba(21,101,192,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1565c0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </a>
        </div>
      </div>

      <BannerSlider films={trending.slice(0, 8)} />


      {/* Categories */}
      <div style={{ padding: '12px 16px 20px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: 24, padding: '20px 16px',
          border: '1px solid rgba(255,255,255,0.95)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
          display: 'flex', justifyContent: 'space-around',
        }}>
          <CategoryIcon href="/movies" label="Film" icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1565c0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>} />
          <CategoryIcon href="/series" label="Series" icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1565c0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>} />
          <CategoryIcon href="/trending" label="Trending" icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1565c0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>} />
          <CategoryIcon href="/search" label="Cari" icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1565c0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>} />
          <CategoryIcon href="/developer" label="Dev" icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1565c0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>} />
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, padding: '0 16px' }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, color: '#1a237e', letterSpacing: '-0.3px' }}>Now Playing</h2>
        </div>
        <div style={{ overflowX: 'auto', display: 'flex', gap: 10, padding: '0 60px 8px', scrollbarWidth: 'none', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
          {trending.slice(0, 10).map(film => (
            <a key={film.id} href={`/watch/${film.id}`} style={{ flex: '0 0 220px', borderRadius: 18, overflow: 'hidden', position: 'relative', aspectRatio: '2/3', display: 'block', boxShadow: '0 8px 24px rgba(0,0,0,0.25)', textDecoration: 'none', flexShrink: 0, scrollSnapAlign: 'center' }}>
              <img src={film.poster} alt={film.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)' }} />
              <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 2 }}>{film.title}</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>★ {film.rating?.toFixed(1)}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
      <Section title="Trending" items={trending} href="/trending" />
      <Section title="Film Populer" items={movies} href="/movies" />
      <Section title="Series Populer" items={series} href="/series" />
    </main>
  );
}
