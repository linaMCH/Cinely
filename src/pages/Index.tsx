
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Rediriger automatiquement vers la page d'accueil
    navigate("/");
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-movie-dark">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-movie-primary border-t-transparent"></div>
    </div>
  );
};

export default Index;
