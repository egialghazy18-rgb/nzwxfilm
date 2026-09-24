import { getTrending, getPopular, getPopularSeries, fmt } from './lib/tmdb';
import MovieCard from './components/MovieCard';

function Section({ title, items, href }) {
  return (
    <section style={{ marginBottom: 56 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#f5f5f7', letterSpacing: '-0.3px' }}>{title}</h2>
        {href && (
          <a href={href} style={{
            fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500,
            padding: '5px 12px', borderRadius: 8,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}>Lihat Semua →</a>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
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
    <main style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>

      {/* HERO */}
      {hero && (
        <div style={{ position: 'relative', height: '92vh', minHeight: 520, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
          {hero.backdrop && (
            <img src={hero.backdrop} alt={hero.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', filter: 'brightness(0.45)' }} />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, #080808 0%, transparent 100%)' }} />

          <div style={{ position: 'relative', width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 32px 72px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 100, padding: '5px 14px',
              fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.8)',
              letterSpacing: '0.5px', marginBottom: 18,
            }}>🔥 TRENDING #1</div>

            <h1 style={{
              fontSize: 'clamp(36px,6vw,76px)',
              fontWeight: 800, color: '#fff',
              letterSpacing: '-2px', lineHeight: 1.0,
              marginBottom: 16, maxWidth: 560,
            }}>{hero.title}</h1>

            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 32, maxWidth: 440 }}>
              {hero.overview?.slice(0, 140)}...
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={`/watch/${hero.id}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 28px',
                background: '#fff', borderRadius: 12,
                color: '#000', fontWeight: 700, fontSize: 14,
                boxShadow: '0 8px 32px rgba(255,255,255,0.15)',
              }}>▶ Tonton Sekarang</a>

              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 20px',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12, color: '#fff', fontSize: 13,
              }}>★ {hero.rating?.toFixed(1)} &nbsp;·&nbsp; {hero.release_date?.slice(0, 4)}</div>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 32px 80px' }}>
        <Section title="🔥 Trending Minggu Ini" items={trending} href="/trending" />
        <Section title="🎬 Film Populer" items={movies} href="/movies" />
        <Section title="📺 Series Populer" items={series} href="/series" />
      </div>
    </main>
  );
}
