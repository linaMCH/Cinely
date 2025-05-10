
import { useState, useEffect } from "react";

interface SeatsGridProps {
  onSeatSelection: (seats: string[]) => void;
}

const SeatsGrid: React.FC<SeatsGridProps> = ({ onSeatSelection }) => {
  const rows = ["A", "B", "C", "D", "E", "F"];
  const seatsPerRow = 8;
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [occupiedSeats, setOccupiedSeats] = useState<string[]>([]);

  useEffect(() => {
    // Simulate some random occupied seats
    const generateRandomOccupiedSeats = () => {
      const occupied: string[] = [];
      const totalSeats = rows.length * seatsPerRow;
      const occupiedCount = Math.floor(totalSeats * 0.3); // 30% of seats are occupied
      
      while (occupied.length < occupiedCount) {
        const row = rows[Math.floor(Math.random() * rows.length)];
        const seat = Math.floor(Math.random() * seatsPerRow) + 1;
        const seatId = `${row}${seat}`;
        
        if (!occupied.includes(seatId)) {
          occupied.push(seatId);
        }
      }
      
      return occupied;
    };
    
    setOccupiedSeats(generateRandomOccupiedSeats());
  }, [rows.length, seatsPerRow]);

  const handleSeatClick = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) {
      return; // Can't select occupied seats
    }

    setSelectedSeats((prevSelectedSeats) => {
      const newSelectedSeats = prevSelectedSeats.includes(seatId)
        ? prevSelectedSeats.filter((id) => id !== seatId)
        : [...prevSelectedSeats, seatId];
      
      // Notify parent component about the selection
      onSeatSelection(newSelectedSeats);
      
      return newSelectedSeats;
    });
  };

  const getSeatColor = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return "bg-red-500 opacity-50 cursor-not-allowed";
    if (selectedSeats.includes(seatId)) return "bg-green-500 border-green-300";
    return "bg-gray-700 hover:bg-gray-600";
  };

  return (
    <div className="select-none">
      {/* Screen */}
      <div className="mb-8 flex flex-col items-center">
        <div className="h-2 w-4/5 rounded-lg bg-movie-primary opacity-70"></div>
        <p className="mt-2 text-xs text-movie-text-muted">ÉCRAN</p>
      </div>
      
      {/* Seats */}
      <div className="flex flex-col items-center space-y-3">
        {rows.map((row) => (
          <div key={row} className="flex items-center space-x-2">
            <div className="w-4 text-center text-xs text-movie-text-muted">
              {row}
            </div>
            <div className="flex space-x-2">
              {Array.from({ length: seatsPerRow }).map((_, index) => {
                const seatNumber = index + 1;
                const seatId = `${row}${seatNumber}`;
                
                return (
                  <button
                    key={seatId}
                    className={`h-7 w-7 rounded-t-lg border border-opacity-30 text-xs font-medium transition-colors ${getSeatColor(
                      seatId
                    )}`}
                    onClick={() => handleSeatClick(seatId)}
                    disabled={occupiedSeats.includes(seatId)}
                    aria-label={`Siège ${row}${seatNumber}`}
                  >
                    {seatNumber}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex justify-center space-x-6">
        <div className="flex items-center">
          <div className="mr-2 h-4 w-4 rounded bg-gray-700"></div>
          <span className="text-xs text-movie-text-muted">Disponible</span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-4 w-4 rounded bg-green-500"></div>
          <span className="text-xs text-movie-text-muted">Sélectionné</span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-4 w-4 rounded bg-red-500 opacity-50"></div>
          <span className="text-xs text-movie-text-muted">Occupé</span>
        </div>
      </div>
      
      {/* Selected seats summary */}
      {selectedSeats.length > 0 && (
        <div className="mt-4 rounded-lg bg-movie-dark p-3">
          <p className="text-sm text-white">
            {selectedSeats.length === 1
              ? "1 siège sélectionné"
              : `${selectedSeats.length} sièges sélectionnés`}
            : {selectedSeats.sort().join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default SeatsGrid;
