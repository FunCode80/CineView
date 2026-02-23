import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Popular from './pages/Popular';
import Favorites from './pages/Favorites';
import './App.css';
import MovieModal from './components/MovieModal';
import { useSearchParams } from 'react-router-dom';

function App() {
  const [searchParams] = useSearchParams();
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('movie-app-favs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('movie-app-favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const movieId = searchParams.get('movie');
    if (movieId) {
      // Haal de filmdetails op basis van het ID uit de URL
      fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=nl-NL`)
        .then(res => res.json())
        .then(data => setSelectedMovie(data));
    }
  }, [searchParams]);

  const toggleFavorite = (movie) => {
    setFavorites(prev => prev.some(f => f.id === movie.id) 
      ? prev.filter(f => f.id !== movie.id) 
      : [...prev, movie]);
  };

  return (
    <div className="container">
      <Navbar favCount={favorites.length} />
      <Routes>
        <Route path="/" element={<Home toggleFav={toggleFavorite} favs={favorites} onMovieSelect={setSelectedMovie} />} />
        <Route path="/popular" element={<Popular toggleFav={toggleFavorite} favs={favorites} onMovieSelect={setSelectedMovie} />} />
        <Route path="/favorites" element={<Favorites toggleFav={toggleFavorite} favs={favorites} onMovieSelect={setSelectedMovie}/>} />
      </Routes>

      {/* De Modal onderaan */}
      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  );
}

export default App;
