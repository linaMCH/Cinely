
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Movie } from "@/components/MovieCard";
import { CheckCircle, ArrowLeft } from "lucide-react";

interface TicketState {
  movie: Movie;
  seats: string[];
  snack: string | null;
}

const Ticket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ticketInfo = location.state as TicketState | undefined;
  
  const getSnackName = (snackId: string | null) => {
    switch (snackId) {
      case "popcorn": return "Popcorn";
      case "chocolate": return "Chocolat";
      case "water": return "Eau";
      case "soda": return "Boisson";
      case "nothing": return "Aucun";
      default: return "Aucun";
    }
  };
  
  // If no ticket info, redirect to movies
  if (!ticketInfo?.movie) {
    navigate("/movies", { replace: true });
    return null;
  }
  
  const { movie, seats, snack } = ticketInfo;
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  // Generate a random ticket number
  const ticketNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  
  return (
    <div className="min-h-screen bg-movie-dark pb-20">
      <div className="px-6 pt-6">
        <Button
          variant="ghost"
          className="mb-4 flex items-center text-white"
          onClick={() => navigate("/movies")}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Retour aux films
        </Button>
        
        <div className="mb-6 flex items-center justify-center">
          <div className="flex items-center justify-center rounded-full bg-green-500 bg-opacity-20 p-3">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
        </div>
        
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-white">Réservation confirmée!</h1>
          <p className="mb-6 text-movie-text-muted">
            Votre ticket a été envoyé à votre email.
          </p>
        </div>
      </div>

      {/* Ticket Card */}
      <div className="mx-auto max-w-md px-6">
        <div className="relative overflow-hidden rounded-2xl bg-movie-dark-light">
          {/* Ticket top part */}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-movie-text-muted">N° Ticket</p>
                <p className="text-lg font-bold text-white">#{ticketNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-movie-text-muted">Date</p>
                <p className="text-sm font-semibold text-white">
                  {new Date().toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            <div className="my-4 flex">
              <div className="mr-4 h-24 w-16 overflow-hidden rounded-md">
                <img 
                  src={posterUrl} 
                  alt={movie.title} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{movie.title}</h2>
                <p className="text-sm text-movie-text-muted">
                  {new Date().toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long'
                  })} - 20:00
                </p>
                <div className="mt-2">
                  <span className="inline-block rounded-md bg-movie-primary bg-opacity-20 px-2 py-1 text-xs font-medium text-movie-primary">
                    Salle 3
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dashed separator */}
          <div className="relative">
            <div className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-movie-dark"></div>
            <div className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-movie-dark"></div>
            <div className="border-t border-dashed border-gray-600"></div>
          </div>
          
          {/* Ticket bottom part */}
          <div className="p-6">
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-movie-text-muted">Sièges</p>
                <p className="text-sm font-semibold text-white">
                  {seats.sort().join(", ")}
                </p>
              </div>
              <div>
                <p className="text-xs text-movie-text-muted">Snack</p>
                <p className="text-sm font-semibold text-white">
                  {getSnackName(snack)}
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex w-full justify-center">
              {/* Barcode */}
              <div className="h-12 w-3/4">
                <div className="flex h-full w-full items-center justify-between">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div 
                      key={i}
                      className="h-full w-px bg-white opacity-70"
                      style={{ height: `${Math.floor(Math.random() * 50) + 50}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Button 
          className="bg-movie-primary text-black hover:bg-movie-primary-hover"
          onClick={() => navigate("/movies")}
        >
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
};

export default Ticket;
