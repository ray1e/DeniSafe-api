import {CustomerContext} from "./CustomerContext"
import { useState } from "react";

export function CustomerProvider({children}) {
  const [customerData, setCustomerData] = useState({
    name: "",
    note: "",
  });

  const value={
    customerData,
    setCustomerData,
  }

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}