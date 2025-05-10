
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface AuthProps {
  onSuccess: () => void;
}

const AuthForm = ({ onSuccess }: AuthProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate auth for now - would use Supabase in production
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // On réussit l'authentification (simulée)
      toast({
        title: isLogin ? "Connexion réussie" : "Inscription réussie",
        description: "Bienvenue sur CinéApp",
      });

      // Save user session to localStorage
      localStorage.setItem("user", JSON.stringify({ email, firstName, lastName }));

      // Navigate to movies page
      onSuccess();
      navigate("/movies");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue, veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md animate-fade-in px-6">
      <div className="mb-8 flex items-center justify-center space-x-2">
        <button
          onClick={() => setIsLogin(true)}
          className={`relative rounded-lg px-6 py-3 font-medium transition-colors ${
            isLogin ? "text-white" : "text-gray-400"
          }`}
        >
          Connexion
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`relative rounded-lg px-6 py-3 font-medium transition-colors ${
            !isLogin ? "text-white" : "text-gray-400"
          }`}
        >
          Inscription
        </button>
        <div
          className="absolute h-1 bg-movie-primary transition-all duration-300 ease-in-out"
          style={{
            width: "80px",
            bottom: "0px",
            left: isLogin ? "calc(50% - 90px)" : "calc(50% + 10px)",
            transform: "translateX(-50%)",
          }}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm text-gray-300">
                Prénom
              </label>
              <Input
                id="firstName"
                type="text"
                className="auth-input"
                placeholder="Entrez votre prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required={!isLogin}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm text-gray-300">
                Nom
              </label>
              <Input
                id="lastName"
                type="text"
                className="auth-input"
                placeholder="Entrez votre nom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required={!isLogin}
              />
            </div>
          </>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm text-gray-300">
            Email
          </label>
          <Input
            id="email"
            type="email"
            className="auth-input"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {!isLogin && (
          <div className="space-y-2">
            <label htmlFor="postalCode" className="text-sm text-gray-300">
              Code Postal
            </label>
            <Input
              id="postalCode"
              type="text"
              className="auth-input"
              placeholder="Entrez votre code postal"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required={!isLogin}
            />
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm text-gray-300">
            Mot de passe
          </label>
          <Input
            id="password"
            type="password"
            className="auth-input"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          className="primary-button mt-6"
          disabled={loading}
        >
          {loading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : isLogin ? (
            "Se connecter"
          ) : (
            "S'inscrire"
          )}
        </Button>
      </form>
    </div>
  );
};

export default AuthForm;
