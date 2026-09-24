import { getTrending, getPopular, getPopularSeries, fmt } from './lib/tmdb';
import MovieCard from './components/MovieCard';

function Section({ title, items, href }) {
  return (
    <section style={{ marginBottom: 64 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f5f5f7', letterSpacing: '-0.4px' }}>{title}</h2>
        {href && (
          <a href={href} style={{
            fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500,
            padding: '5px 12px', borderRadius: 8,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(8px)',
          }}>Lihat Semua →</a>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 14 }}>
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
    <main style={{ minHeight: '100vh', background: '#050505' }}>

      {/* HERO */}
      {hero && (
        <div style={{ position: 'relative', height: '95vh', minHeight: 600, overflow: 'hidden' }}>
          {hero.backdrop && (
            <img src={hero.backdrop} alt={hero.title}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', filter: 'brightness(0.35) saturate(0.8)' }} />
          )}
          {/* Gradients */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,5,5,0.98) 0%, rgba(5,5,5,0.6) 50%, rgba(5,5,5,0.1) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, #050505 0%, transparent 100%)' }} />

          {/* Content */}
          <div style={{
            position: 'absolute', bottom: '12%', left: 0, right: 0,
            padding: '0 32px', maxWidth: 680,
          }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: 100, padding: '5px 14px',
              fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.75)',
              letterSpacing: '0.5px', marginBottom: 20,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
            }}>🔥 TRENDING #1 MINGGU INI</div>

            <h1 style={{
              fontSize: 'clamp(40px,7vw,80px)',
              fontWeight: 900, color: '#fff',
              letterSpacing: '-2.5px', lineHeight: 0.95,
              marginBottom: 20,
            }}>{hero.title}</h1>

            <p style={{
              fontSize: 14, color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.85, marginBottom: 36, maxWidth: 420,
            }}>{hero.overview?.slice(0, 140)}...</p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={`/watch/${hero.id}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 28px',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: 12, color: '#000',
                fontWeight: 700, fontSize: 14,
                boxShadow: '0 8px 32px rgba(255,255,255,0.12), inset 0 1px 0 rgba(255,255,255,0.8)',
                border: '1px solid rgba(255,255,255,0.3)',
              }}>▶ Tonton Sekarang</a>

              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 20px',
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12, color: 'rgba(255,255,255,0.7)', fontSize: 13,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
              }}>★ {hero.rating?.toFixed(1)} · {hero.release_date?.slice(0, 4)}</div>
            </div>
          </div>
        </div>
      )}

      {/* SECTIONS */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 100px' }}>
        <Section title="🔥 Trending Minggu Ini" items={trending} href="/trending" />
        <Section title="🎬 Film Populer" items={movies} href="/movies" />
        <Section title="📺 Series Populer" items={series} href="/series" />
      </div>
    </main>
  );
}
