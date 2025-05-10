
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStart = () => {
    setIsAnimating(true);
    setTimeout(() => navigate("/auth"), 500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-movie-dark to-movie-dark-light px-6 text-white">
      <div className={`flex flex-col items-center transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-5xl font-bold tracking-tight text-movie-primary">
            CinéApp
          </h1>
          <p className="text-xl text-white/70">
            Découvrez et réservez les meilleurs films
          </p>
        </div>
        
        <div className="mb-12 flex h-40 items-center justify-center gap-4 overflow-hidden">
          <div className="flex animate-[slide_15s_linear_infinite] gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-36 w-24 rounded-lg bg-gradient-to-br from-movie-dark-light to-movie-dark opacity-75"
                style={{
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
            ))}
          </div>
        </div>

        <Button onClick={handleStart} className="primary-button w-64">
          Commencer
        </Button>
      </div>
    </div>
  );
};

export default Home;
