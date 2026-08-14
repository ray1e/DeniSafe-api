import {CustomerContext} from "../context/CustomerContext"
import { useState } from "react";

export function CustomerProvider({children}) {
  const [customerData, setCustomerData] = useState({
    name: "",
    note: "",
  });

  const [selectedCustomerData, setSelectedCustomerData] = useState(""); 
  const [selectedCustomerId, setSelectedCustomerId] = useState("")
  const value={
    customerData,
    setCustomerData,
    selectedCustomerData,
    setSelectedCustomerData,
    selectedCustomerId,
    setSelectedCustomerId
  }

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}