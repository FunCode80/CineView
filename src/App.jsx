import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Popular from './pages/Popular';
import Favorites from './pages/Favorites';
import './App.css';

function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('movie-app-favs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('movie-app-favs', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie) => {
    setFavorites(prev => prev.some(f => f.id === movie.id) 
      ? prev.filter(f => f.id !== movie.id) 
      : [...prev, movie]);
  };

  return (
    <div className="container">
      <Navbar favCount={favorites.length} />
      <Routes>
        <Route path="/" element={<Home toggleFav={toggleFavorite} favs={favorites} />} />
        <Route path="/popular" element={<Popular toggleFav={toggleFavorite} favs={favorites} />} />
        <Route path="/favorites" element={<Favorites toggleFav={toggleFavorite} favs={favorites} />} />
      </Routes>
    </div>
  );
}

export default App;
