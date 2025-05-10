
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Movie } from "@/components/MovieCard";
import { CheckCircle, ArrowLeft } from "lucide-react";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";

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
  
  // Create QR code data
  const qrData = JSON.stringify({
    movie: movie.title,
    seats: seats.join(", "),
    ticketNumber,
    time: "20:00",
    date: new Date().toLocaleDateString('fr-FR')
  });
  
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
        
        <motion.div 
          className="mb-6 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center rounded-full bg-green-500 bg-opacity-20 p-3">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
        </motion.div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="mb-2 text-2xl font-bold text-white">Réservation confirmée!</h1>
          <p className="mb-6 text-movie-text-muted">
            Votre ticket a été envoyé à votre email.
          </p>
        </motion.div>
      </div>

      {/* Ticket Card */}
      <motion.div 
        className="mx-auto max-w-md px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
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
            
            {/* QR Code */}
            <div className="mt-4 flex justify-center">
              <div className="bg-white p-3 rounded-md">
                <QRCode value={qrData} size={120} />
              </div>
            </div>
            
            {/* Ticket notice */}
            <p className="mt-4 text-xs text-center text-movie-text-muted">
              Présentez ce ticket à l'entrée. Non remboursable 24h avant.
            </p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Button 
          className="bg-movie-primary text-black hover:bg-movie-primary-hover"
          onClick={() => navigate("/")}
        >
          Retour à l'accueil
        </Button>
      </motion.div>
    </div>
  );
};

export default Ticket;
