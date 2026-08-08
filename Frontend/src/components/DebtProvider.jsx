import { DebtContext } from "./DebtContext";
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

  const value = {
    debtData,
    setDebtData,
    today,
    dateTaken,
    setDateTaken
  };

  return <DebtContext.Provider value={value}>{children}</DebtContext.Provider>;
}
