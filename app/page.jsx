import { getTrending, getPopular, getPopularSeries, fmt } from './lib/tmdb';
import NowPlaying from './components/NowPlaying';
import HeroSlider from './components/HeroSlider';
import HomeClient from './components/HomeClient';

export default async function HomePage() {
  const [t, m, s] = await Promise.all([getTrending(), getPopular(), getPopularSeries()]);
  const trending = (t.results || []).map(fmt);
  const movies = (m.results || []).map(fmt);
  const series = (s.results || []).map(fmt);
  return <HomeClient trending={trending} movies={movies} series={series} />;
}
