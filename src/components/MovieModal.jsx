import { useState, useEffect } from 'react';
import { X, Star, Calendar, Share2 } from 'lucide-react';

function MovieModal({ movie, onClose }) {
  const [videoKey, setVideoKey] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

    // Reset isPlaying als er een nieuwe film wordt geopend
    useEffect(() => {
    setIsPlaying(false);
    }, [movie]);

    useEffect(() => {
        if (movie) {
            const apiKey = import.meta.env.VITE_TMDB_API_KEY;
            
            // Stap 1: Haal de video's op voor dit specifieke ID
            fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                console.log("Video data gevonden:", data.results[0]); // DEBUG

                // Stap 2: Zoek specifiek naar een 'Trailer' op 'YouTube'
                const trailer = data.results?.find(v => v.type === "Trailer" && v.site === "YouTube") 
                                || data.results?.[0]; // Pak de eerste als er geen officieel type 'Trailer' is

                if (trailer) {
                console.log("Trailer Key:", trailer.key); // DEBUG
                setVideoKey(trailer.key);
                } else {
                setVideoKey(null);
                }
            })
            .catch(err => {
                console.error("Fout bij laden video:", err);
                setVideoKey(null);
            });

            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'unset';
            setVideoKey(null);
        };
    }, [movie]);

  if (!movie) return null;

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/?movie=${movie.id}`;
    if (navigator.share) {
      await navigator.share({ title: movie.title, url: shareUrl });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link gekopieerd!");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
        
        <div className="modal-header">
            {isPlaying && videoKey ? (
                <iframe
                className="backdrop-video"
                src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1&controls=1&showinfo=1`}
                title={movie.title}
                allow="autoplay; encrypted-media"
                allowFullScreen
                ></iframe>
            ) : (
                <div className="backdrop-container" onClick={() => videoKey && setIsPlaying(true)}>
                <img 
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} 
                    alt={movie.title} 
                    className="backdrop-img"
                />
                {videoKey && (
                    <div className="play-overlay">
                    <div className="play-button-circle">
                        <div className="play-triangle"></div>
                    </div>
                    <span>Bekijk Trailer</span>
                    </div>
                )}
                </div>
            )}
            <div className="header-overlay"></div>
            <h2 className="modal-title">{movie.title}</h2>
        </div>

        <div className="modal-body">
          <div className="modal-meta">
            <span className="rating"><Star size={16} fill="#ffc107" color="#ffc107" /> {movie.vote_average?.toFixed(1)}</span>
            <span className="date"><Calendar size={16} /> {movie.release_date}</span>
          </div>
          <p className="modal-overview">{movie.overview || "Geen beschrijving beschikbaar."}</p>
          <button className="share-btn" onClick={handleShare}>
            <Share2 size={18} /> Deel deze film
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
