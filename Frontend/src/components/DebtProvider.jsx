import { DebtContext } from "./DebtContext";
import { useState } from "react";

export function DebtProvider({ children }) {
  const today = new Date().toISOString().split("T")[0];
  const [debtData, setDebtData] = useState([
    {
      itemName: "",
      price: "",
      quantity: "",
      date: today,
    },
  ]);

  const value = {
    debtData,
    setDebtData,
    today,
  };

  return <DebtContext.Provider value={value}>{children}</DebtContext.Provider>;
}
