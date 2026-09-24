import { getTrending, getPopular, getPopularSeries, fmt } from './lib/tmdb';
import MovieCard from './components/MovieCard';

function Section({ title, items, href }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1c1c1e', letterSpacing: '-0.3px' }}>{title}</h2>
        {href && <a href={href} style={{ fontSize: 13, color: '#8e8e93', fontWeight: 500 }}>Lihat Semua →</a>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
        {items.slice(0, 10).map(f => <MovieCard key={f.id} film={f} />)}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const [t, m, s] = await Promise.all([getTrending(), getPopular(), getPopularSeries()]);
  const trending = (t.results || []).map(fmt);
  const movies = (m.results || []).map(fmt);
  const series = (s.results || []).map(fmt);
  const hero = trending[0];

  return (
    <main style={{ minHeight: '100vh', background: '#f2f2f7' }}>

      {/* HERO */}
      {hero && (
        <div style={{ position: 'relative', height: '55vh', minHeight: 320, overflow: 'hidden', borderRadius: '0 0 28px 28px' }}>
          {hero.backdrop && (
            <img src={hero.backdrop} alt={hero.title}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.1) 100%)' }} />

          <div style={{ position: 'absolute', bottom: 24, left: 20, right: 20 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 100, padding: '4px 12px',
              fontSize: 11, fontWeight: 600, color: '#fff',
              marginBottom: 10,
            }}>🔥 Trending #1</div>

            <h1 style={{
              fontSize: 'clamp(26px,6vw,48px)',
              fontWeight: 800, color: '#fff',
              letterSpacing: '-1px', lineHeight: 1.1,
              marginBottom: 14,
            }}>{hero.title}</h1>

            <div style={{ display: 'flex', gap: 10 }}>
              <a href={`/watch/${hero.id}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '10px 22px',
                background: '#fff',
                borderRadius: 100, color: '#000',
                fontWeight: 700, fontSize: 13,
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              }}>▶ Tonton</a>

              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '10px 16px',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 100, color: '#fff', fontSize: 13, fontWeight: 500,
              }}>★ {hero.rating?.toFixed(1)}</div>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div style={{ padding: '24px 16px 100px' }}>
        <Section title="🔥 Trending" items={trending} href="/trending" />
        <Section title="🎬 Film Populer" items={movies} href="/movies" />
        <Section title="📺 Series" items={series} href="/series" />
      </div>
    </main>
  );
}
