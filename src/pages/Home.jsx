import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPopularMovies, fetchTrendingMovies, searchMovies } from '../services/tmdpApi';
import MovieCard from '../components/MovieCard';

function Home({ toggleFav, favs, onMovieSelect  }) {
  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 1. Initiële data laden bij opstarten
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [popData, trendData] = await Promise.all([
          fetchPopularMovies(),
          fetchTrendingMovies()
        ]);
        setPopular(popData.results);
        setTrending(trendData);
      } catch (error) {
        console.error("Fout bij laden van homepage:", error);
      } finally {
        setTimeout(()=>{
            setIsLoading(false);
        }, 500)
      }
    };
    loadData();
  }, []);

  // 2. Zoekfunctie afhandelen
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsLoading(true);
    try {
      const data = await searchMovies(query);
      setSearchResults(data.results);
    } catch (error) {
      console.error("Fout bij zoeken:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Helper functie om secties te renderen (om code herhaling te voorkomen)
  const renderSection = (title, movies, link) => (
    <section className="movie-section">
      <div className="section-header">
        <h2>{title}</h2>
        {link && <Link to={link} className="see-all-btn">Bekijk alles &gt;</Link>}
      </div>
      <div className="movie-grid">
        {movies.slice(0, 5).map(m => (
          <MovieCard 
            key={m.id} 
            movie={m} 
            onToggleFav={toggleFav} 
            isFavorite={favs.some(f => f.id === m.id)}
            onMovieSelect={onMovieSelect}
          />
        ))}
      </div>
    </section>
  );

  return (
    <div className="home-view">
      {/* De Hero blijft ALTIJD bovenaan staan */}
      <header className="hero">
        <h1>Ontdek je volgende favoriete film</h1>
        <form className="search-form" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Zoek een titel..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Zoeken</button>
        </form>
      </header>

      <main>
        {/* Alleen de content hieronder wordt vervangen door de loader */}
        {isLoading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            {/* Toon zoekresultaten OF de standaard homepage secties */}
            {query && searchResults.length > 0 ? (
              renderSection(`Resultaten voor "${query}"`, searchResults)
            ) : (
              <>
                {renderSection("Populair", popular, "/popular")}
                <div style={{ marginTop: '40px' }}>
                  {renderSection("Nu Trending", trending)}
                </div>
              </>
            )}

            {/* Melding als er geen zoekresultaten zijn */}
            {query && searchResults.length === 0 && !isLoading && (
              <p className="no-results">Geen films gevonden voor "{query}".</p>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default Home;