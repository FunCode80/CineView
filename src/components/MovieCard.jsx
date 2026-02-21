import { Heart } from 'lucide-react';

const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const BACKDROP_PATH = "https://image.tmdb.org";

function MovieCard({ movie, onToggleFav, isFavorite, onMovieSelect }) {
    
  const handleFavClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFav(movie);
  };

  return (
    <div className="movie-card" onClick={() => onMovieSelect(movie)}>
      <div className="card-image-container">
        <button 
          className={`fav-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavClick}
          type="button"
        >
          {/* Gebruik het Lucide icoon met dynamische styling */}
          <Heart 
            size={20} 
            color={isFavorite ? "#e50914" : "#ffffff"} 
            fill={isFavorite ? "#e50914" : "transparent"} 
            strokeWidth={2.5}
          />
        </button>
        
        <img 
          src={movie.poster_path ? IMG_PATH + movie.poster_path : "https://via.placeholder.com"} 
          alt={movie.title} 
        />
        
        <div className="card-overlay">
          <p className="overview">{movie.overview?.substring(0, 100)}...</p>
        </div>
      </div>
      
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="meta-info">
          <span className="year">{movie.release_date?.split('-')[0]}</span>
          <span className="rating">⭐ {movie.vote_average?.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}


export default MovieCard;


