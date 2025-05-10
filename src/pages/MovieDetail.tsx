
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar } from "lucide-react";
import SeatsGrid from "@/components/SeatsGrid";
import { Movie } from "@/components/MovieCard";

interface SnackOption {
  id: string;
  name: string;
}

interface PaymentFormValues {
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedSnack, setSelectedSnack] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [bookingStep, setBookingStep] = useState<"seats" | "snacks" | "payment">("seats");
  const { toast } = useToast();
  const navigate = useNavigate();
  const apiKey = "43d9705d5f54dfcf69f305dc4581569e";

  const form = useForm<PaymentFormValues>({
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: ""
    }
  });

  const snackOptions: SnackOption[] = [
    { id: "popcorn", name: "Popcorn" },
    { id: "chocolate", name: "Chocolat" },
    { id: "water", name: "Eau" },
    { id: "soda", name: "Boisson" },
    { id: "nothing", name: "Rien" }
  ];

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=fr-FR`
        );
        
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du film");
        }
        
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Erreur:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails du film. Veuillez réessayer.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id, toast, apiKey]);

  const handleSeatSelection = (seats: string[]) => {
    setSelectedSeats(seats);
  };

  const nextStep = () => {
    if (bookingStep === "seats") {
      if (selectedSeats.length === 0) {
        toast({
          title: "Sélection requise",
          description: "Veuillez sélectionner au moins un siège.",
          variant: "destructive",
        });
        return;
      }
      setBookingStep("snacks");
    } else if (bookingStep === "snacks") {
      if (!selectedSnack) {
        toast({
          title: "Sélection requise",
          description: "Veuillez sélectionner une option de snack.",
          variant: "destructive",
        });
        return;
      }
      setBookingStep("payment");
    }
  };

  const prevStep = () => {
    if (bookingStep === "snacks") {
      setBookingStep("seats");
    } else if (bookingStep === "payment") {
      setBookingStep("snacks");
    }
  };

  const onSubmit = async (values: PaymentFormValues) => {
    try {
      setIsProcessingPayment(true);
      
      // Simuler un traitement de paiement
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast({
        title: "Paiement réussi",
        description: "Votre réservation a été confirmée.",
      });
      
      // Rediriger vers une page de ticket (à implémenter)
      navigate("/ticket", { 
        state: { 
          movie, 
          seats: selectedSeats, 
          snack: selectedSnack 
        } 
      });
    } catch (error) {
      console.error("Erreur de paiement:", error);
      toast({
        title: "Erreur de paiement",
        description: "Le paiement a échoué. Veuillez réessayer.",
        variant: "destructive",
      });
      setIsProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-movie-dark p-6">
        <div className="mt-12 flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-movie-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-movie-dark p-6">
        <div className="mt-12 text-center">
          <p className="text-lg text-white">Film non trouvé</p>
        </div>
      </div>
    );
  }

  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const rating = Math.round(movie.vote_average * 10) / 10;
  const formattedDate = movie.release_date ? new Date(movie.release_date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : "Date inconnue";

  return (
    <div className="min-h-screen bg-movie-dark pb-20">
      {/* Header with back button */}
      <div className="sticky top-0 z-10 bg-movie-dark bg-opacity-95 backdrop-blur-sm p-4">
        <Button
          variant="ghost"
          className="mb-2 flex items-center text-white"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Retour
        </Button>
      </div>

      {/* Movie Details */}
      <div className="px-4">
        <div className="relative mb-6 h-64 w-full overflow-hidden rounded-xl">
          <img
            src={posterUrl}
            alt={movie.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-movie-dark to-transparent"></div>
          <div className="absolute right-2 top-2 flex h-8 w-12 items-center justify-center rounded-md bg-movie-dark bg-opacity-80 text-movie-primary">
            <span className="text-sm font-bold">{rating}</span>
            <span className="ml-1 text-xs">★</span>
          </div>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-white">{movie.title}</h1>
        
        <div className="mb-4 flex items-center text-sm text-movie-text-muted">
          <Calendar className="mr-1 h-4 w-4" />
          <span>Sortie: {formattedDate}</span>
        </div>
        
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold text-white">Synopsis</h2>
          <p className="text-movie-text-muted">
            {movie.overview || "Aucune description disponible."}
          </p>
        </div>

        {/* Booking Section */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-white">Réservation</h2>
          
          <Card className="mb-6 border-none bg-movie-dark-light">
            <CardContent className="p-6">
              {bookingStep === "seats" && (
                <>
                  <h3 className="mb-4 text-lg font-semibold text-white">
                    Choisissez vos sièges
                  </h3>
                  <div className="mb-4">
                    <SeatsGrid onSeatSelection={handleSeatSelection} />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <Button
                      variant="outline"
                      className="border-movie-primary text-movie-primary"
                      onClick={() => navigate(-1)}
                    >
                      Annuler
                    </Button>
                    <Button
                      onClick={nextStep}
                      className="bg-movie-primary text-black hover:bg-movie-primary-hover"
                    >
                      Suivant
                    </Button>
                  </div>
                </>
              )}

              {bookingStep === "snacks" && (
                <>
                  <h3 className="mb-4 text-lg font-semibold text-white">
                    Choisissez un snack
                  </h3>
                  <RadioGroup
                    value={selectedSnack || ""}
                    onValueChange={setSelectedSnack}
                    className="space-y-3"
                  >
                    {snackOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`flex items-center rounded-lg border p-3 transition-all ${
                          selectedSnack === option.id
                            ? "border-movie-primary bg-movie-dark"
                            : "border-gray-700"
                        }`}
                      >
                        <RadioGroupItem
                          value={option.id}
                          id={option.id}
                          className="border-movie-primary text-movie-primary"
                        />
                        <label
                          htmlFor={option.id}
                          className="ml-3 flex-grow cursor-pointer text-white"
                        >
                          {option.name}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                  <div className="mt-6 flex justify-between">
                    <Button
                      variant="outline"
                      className="border-movie-primary text-movie-primary"
                      onClick={prevStep}
                    >
                      Retour
                    </Button>
                    <Button
                      onClick={nextStep}
                      className="bg-movie-primary text-black hover:bg-movie-primary-hover"
                    >
                      Suivant
                    </Button>
                  </div>
                </>
              )}

              {bookingStep === "payment" && (
                <>
                  <h3 className="mb-4 text-lg font-semibold text-white">
                    Paiement
                  </h3>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="cardName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Nom sur la carte</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="auth-input"
                                placeholder="Jean Dupont"
                                required
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Numéro de carte</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="auth-input"
                                placeholder="4242 4242 4242 4242"
                                required
                                maxLength={19}
                                onChange={(e) => {
                                  // Format card number with spaces
                                  const value = e.target.value
                                    .replace(/\s/g, '')
                                    .replace(/\D/g, '');
                                  const formattedValue = value
                                    .replace(/(\d{4})/g, '$1 ')
                                    .trim();
                                  field.onChange(formattedValue);
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="expiryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Date d'expiration</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="auth-input"
                                  placeholder="MM/AA"
                                  required
                                  maxLength={5}
                                  onChange={(e) => {
                                    // Format expiry date with slash
                                    let value = e.target.value.replace(/\D/g, '');
                                    if (value.length > 2) {
                                      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
                                    }
                                    field.onChange(value);
                                  }}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">CVV</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="auth-input"
                                  placeholder="123"
                                  required
                                  maxLength={3}
                                  type="password"
                                  onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    field.onChange(value);
                                  }}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="mt-6 flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          className="border-movie-primary text-movie-primary"
                          onClick={prevStep}
                          disabled={isProcessingPayment}
                        >
                          Retour
                        </Button>
                        <Button
                          type="submit"
                          className="bg-movie-primary text-black hover:bg-movie-primary-hover"
                          disabled={isProcessingPayment}
                        >
                          {isProcessingPayment ? (
                            <>
                              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
                              Traitement...
                            </>
                          ) : (
                            "Payer maintenant"
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
