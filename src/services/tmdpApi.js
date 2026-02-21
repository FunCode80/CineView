const BASE_URL = 'https://api.themoviedb.org/3';
const SEARCH_URL = 'https://api.themoviedb.org/3/movie/popular';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const fetchPopularMovies = async (page = 1) => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=nl-NL&page=${page}`);
  return await res.json();
};

export const fetchTrendingMovies = async () => {
  const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=nl-NL`);
  const data = await res.json();
  return data.results;
};

export const searchMovies = async (query, page = 1) => {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=nl-NL&query=${encodeURIComponent(query)}&page=${page}`);
  return await res.json();
};