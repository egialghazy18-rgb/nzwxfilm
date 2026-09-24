import { getTrending, getPopular, getPopularSeries, fmt } from './lib/tmdb';
import MovieCard from './components/MovieCard';
import HeroSlider from './components/HeroSlider';
import BannerSlider from './components/BannerSlider';

function Section({ title, items, href }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1c1c1e', letterSpacing: '-0.3px' }}>{title}</h2>
        {href && <a href={href} style={{ fontSize: 13, color: '#8e8e93', fontWeight: 500 }}>Lihat Semua →</a>}
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
    <main style={{ minHeight: '100vh', background: '#f2f2f7' }}>
      <HeroSlider films={trending.slice(0, 5)} />
      <BannerSlider />
      <div style={{ padding: '24px 16px 100px' }}>
        <Section title="🔥 Trending" items={trending} href="/trending" />
        <Section title="🎬 Film Populer" items={movies} href="/movies" />
        <Section title="📺 Series" items={series} href="/series" />
      </div>
    </main>
  );
}
