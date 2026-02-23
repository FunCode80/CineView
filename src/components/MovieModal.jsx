import { X, Star, Calendar, Share2 } from 'lucide-react';
import { useEffect } from 'react';

function MovieModal({ movie, onClose }) {
    
    useEffect(() => {
        if (movie) {
        document.body.style.overflow = 'hidden'; // Zet scrollen UIT
        console.log(movie)
        }
        return () => {
        document.body.style.overflow = 'unset'; // Zet scrollen weer AAN bij sluiten
        };
    }, [movie]);

    const handleShare = async () => {
        // We maken een unieke link met het ID van de film erachter
        const shareUrl = `${window.location.origin}/?movie=${movie.id}`;

        const shareData = {
            title: `CineView: ${movie.title}`,
            text: `Check deze film op CineView: ${movie.title}`,
            url: shareUrl, 
        };

        console.log(movie)

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback voor browsers die Share API niet ondersteunen (zoals sommige desktop browsers)
                alert("Link gekopieerd naar klembord!");
                await navigator.clipboard.writeText(`${shareData.url}`);
            }
        } catch (err) {
        console.error("Delen mislukt:", err);
        }
    };
  
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
                    {/* DE NIEUWE DEEL-KNOP */}
                    <button className="share-btn" onClick={handleShare}>
                        <Share2 size={18} /> Deel deze film
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MovieModal;