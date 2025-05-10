
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const rating = Math.round(movie.vote_average * 10) / 10;
  
  const handleReservation = () => {
    navigate(`/movie/${movie.id}`);
  };
  
  return (
    <div className="movie-card animate-fade-in">
      <div className="relative h-64 w-full overflow-hidden rounded-t-xl">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-movie-dark-light">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-movie-primary border-t-transparent"></div>
          </div>
        )}
        <img
          src={posterUrl}
          alt={movie.title}
          className="h-full w-full object-cover transition-opacity duration-300"
          style={{ opacity: isLoading ? 0 : 1 }}
          onLoad={() => setIsLoading(false)}
        />
        <div className="absolute right-2 top-2 flex h-8 w-12 items-center justify-center rounded-md bg-movie-dark bg-opacity-80 text-movie-primary">
          <span className="text-sm font-bold">{rating}</span>
          <span className="ml-1 text-xs">★</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white">{movie.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-movie-text-muted">
          {movie.overview || "Aucune description disponible."}
        </p>
        <Button 
          onClick={handleReservation}
          className="mt-3 w-full bg-movie-primary text-black hover:bg-movie-primary-hover"
        >
          Réserver
        </Button>
      </div>
    </div>
  );
};

export default MovieCard;
