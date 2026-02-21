import { useState, useEffect } from 'react';
import { fetchPopularMovies } from '../services/tmdpApi';
import MovieCard from '../components/MovieCard';

function Popular({ toggleFav, favs }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPopular = async () => {
      setIsLoading(true);
      window.scrollTo(0, 0); // Scroll naar boven bij nieuwe pagina
      
      try {
        const data = await fetchPopularMovies(page);
        setMovies(data.results);
        // TMDB geeft max 500 pagina's terug voor populaire films
        setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
      } catch (error) {
        console.error("Fout bij laden populaire films:", error);
      } finally {
        // We zetten de loader pas uit áls we de data hebben
        setTimeout(()=>{
            setIsLoading(false);
        }, 500)
      }
    };

    loadPopular();
  }, [page]); // Deze useEffect vuurt ELKE KEER als 'page' verandert

  return (
    <div className="page-view">
      <div className="section-header">
        <h2>Alle Populaire Films</h2>
      </div>

      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <> {/* Dit fragment is de 'doos' die alles bij elkaar houdt */}
          <div className="movie-grid">
            {movies.map(m => (
              <MovieCard 
                key={m.id} 
                movie={m} 
                onToggleFav={toggleFav} 
                isFavorite={favs.some(f => f.id === m.id)} 
              />
            ))}
          </div>

          <div className="pagination">
            <button 
              disabled={page === 1} 
              onClick={() => setPage(prev => prev - 1)}
            >
              Vorige
            </button>
            
            <span className="page-info">
              Pagina <strong>{page}</strong> van <strong>{totalPages}</strong>
            </span>
            
            <button 
              disabled={page === totalPages} 
              onClick={() => setPage(prev => prev + 1)}
            >
              Volgende
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Popular;
