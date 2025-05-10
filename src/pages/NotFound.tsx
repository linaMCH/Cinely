
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-movie-dark px-6 py-12">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-movie-primary">404</h1>
        <p className="mt-4 text-xl text-white">Page non trouvée</p>
        <p className="mt-2 text-movie-text-muted">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="mt-8 bg-movie-primary text-black hover:bg-movie-primary-hover"
        >
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
