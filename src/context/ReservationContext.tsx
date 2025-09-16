// ReservationContext.tsx
import { createContext, useContext, useState } from "react";

type ReservationContextType = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  return (
    <ReservationContext.Provider value={{ count, setCount }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservations() {
  const context = useContext(ReservationContext);
  if (!context) throw new Error("useReservations must be used within a ReservationProvider");
  return context;
}
