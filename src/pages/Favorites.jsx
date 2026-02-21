import MovieCard from '../components/MovieCard';

function Favorites({ toggleFav, favs, onMovieSelect }) {
  return (
    <div className="page-view">
      <div className="section-header">
        <h2>Mijn Favorieten</h2>
      </div>

      {favs.length > 0 ? (
        <div className="movie-grid">
          {favs.map(m => (
            <MovieCard 
              key={m.id} 
              movie={m} 
              onToggleFav={toggleFav} 
              isFavorite={true}
              onMovieSelect={onMovieSelect}
            />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>Je hebt nog geen favoriete films toegevoegd.</p>
        </div>
      )}
    </div>
  );
}

export default Favorites;
