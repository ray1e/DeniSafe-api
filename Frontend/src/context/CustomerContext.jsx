import { createContext, useContext, useState } from "react";

export const CustomerContext = createContext(null);


export function useCustomers() {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomers must be used within a CustomerProvider");
  }
  return context;
}
