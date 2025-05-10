
import { useState } from "react";
import AuthForm from "@/components/AuthForm";

const Auth = () => {
  const [success, setSuccess] = useState(false);
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-movie-dark px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="mb-2 text-3xl font-bold text-movie-primary">
          Bienvenue
        </h1>
        <p className="text-white/70">
          Connectez-vous pour découvrir les films
        </p>
      </div>

      <div className="glass-card w-full max-w-md p-6">
        <AuthForm onSuccess={() => setSuccess(true)} />
      </div>
    </div>
  );
};

export default Auth;
