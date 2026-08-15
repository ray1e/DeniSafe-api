import { DebtContext } from "../context/DebtContext";
import { useState } from "react";

export function DebtProvider({ children }) {
  const today = new Date().toISOString().split("T")[0];
  const [dateTaken, setDateTaken] = useState(today)
  const [debtData, setDebtData] = useState([
    {
      itemName: "",
      price: "",
      quantity: "",
    },
  ]);
  const [currentDebtCount, setCurrentDebtCount] = useState(null);

  const value = {
    debtData,
    setDebtData,
    today,
    dateTaken,
    setDateTaken,
    currentDebtCount,
    setCurrentDebtCount,
  };

  return <DebtContext.Provider value={value}>{children}</DebtContext.Provider>;
}
