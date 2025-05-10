
import { useState, useEffect } from "react";
import MovieCard, { Movie } from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Film, Search } from "lucide-react";

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const apiKey = "43d9705d5f54dfcf69f305dc4581569e";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=fr-FR&page=1`
        );
        
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des films");
        }
        
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Erreur:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les films. Veuillez réessayer.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [toast, apiKey]);

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-movie-dark pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-movie-dark bg-opacity-95 backdrop-blur-sm">
        <div className="flex items-center justify-between p-6">
          <div>
            <h1 className="text-xl font-bold text-white">Films à l'affiche</h1>
            <p className="text-sm text-movie-text-muted">
              Découvrez les derniers films
            </p>
          </div>
          <Button
            variant="outline"
            className="border-none bg-transparent text-white hover:bg-transparent"
          >
            <Film className="h-6 w-6 text-movie-primary" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="px-6 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher un film"
              className="h-12 w-full rounded-xl bg-movie-dark-light pl-10 text-white placeholder:text-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Movie List */}
      <div className="px-6">
        {loading ? (
          <div className="mt-12 flex items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-movie-primary border-t-transparent"></div>
          </div>
        ) : filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center">
            <p className="text-lg text-white">Aucun film trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
