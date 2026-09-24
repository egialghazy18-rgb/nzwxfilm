const KEY = process.env.NEXT_PUBLIC_TMDB_KEY || '3a3f8986432b380633bf9670f5fff60a';
const BASE = 'https://api.themoviedb.org/3';
export const IMG = 'https://image.tmdb.org/t/p/w500';
export const IMG_BIG = 'https://image.tmdb.org/t/p/original';

async function tmdb(path, params={}) {
  const url = new URL(`${BASE}${path}`);
  url.searchParams.set('api_key', KEY);
  url.searchParams.set('language', 'id-ID');
  Object.entries(params).forEach(([k,v]) => url.searchParams.set(k,v));
  const res = await fetch(url.toString(), { next:{ revalidate:3600 } });
  return res.json();
}

export const getPopular = (page=1) => tmdb('/movie/popular',{page});
export const getTrending = () => tmdb('/trending/movie/week');
export const getTopRated = (page=1) => tmdb('/movie/top_rated',{page});
export const searchMovies = (query,page=1) => tmdb('/search/movie',{query,page});
export const getMovieDetail = (id) => tmdb(`/movie/${id}`,{append_to_response:'credits,videos,similar'});
export const getPopularSeries = (page=1) => tmdb('/tv/popular',{page});
export const getTrendingSeries = () => tmdb('/trending/tv/week');

export function fmt(f) {
  return {
    id: f.id,
    title: f.title || f.name,
    overview: f.overview,
    rating: f.vote_average,
    release_date: f.release_date || f.first_air_date,
    poster: f.poster_path ? `${IMG}${f.poster_path}` : null,
    backdrop: f.backdrop_path ? `${IMG_BIG}${f.backdrop_path}` : null,
    embed_url: f.title ? `https://vidsrc.to/embed/movie/${f.id}` : `https://vidsrc.to/embed/tv/${f.id}`,
    type: f.title ? 'movie' : 'tv',
  };
}
