import { X, Star, Calendar } from 'lucide-react';
import { useEffect } from 'react';

function MovieModal({ movie, onClose }) {
    
    useEffect(() => {
        if (movie) {
        document.body.style.overflow = 'hidden'; // Zet scrollen UIT
        }
        return () => {
        document.body.style.overflow = 'unset'; // Zet scrollen weer AAN bij sluiten
        };
    }, [movie]);
  
    if (!movie) return null;
  

    const BACKDROP_PATH = "https://image.tmdb.org/t/p/original/";

    return (
        <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={onClose}><X size={24} /></button>
            
            <div className="modal-header">
            <img 
                src={movie.backdrop_path ? BACKDROP_PATH + movie.backdrop_path : ""} 
                alt={movie.title} 
                className="backdrop-img"
            />
            <div className="header-overlay"></div>
            <h2 className="modal-title">{movie.title}</h2>
            </div>

            <div className="modal-body">
            <div className="modal-meta">
                <span className="rating"><Star size={16} fill="#ffc107" color="#ffc107" /> {movie.vote_average.toFixed(1)}</span>
                <span className="date"><Calendar size={16} /> {movie.release_date}</span>
            </div>
            <p className="modal-overview">{movie.overview || "Geen beschrijving beschikbaar."}</p>
            </div>
        </div>
        </div>
    );
}

export default MovieModal;