import { useContext, createContext, Children, useState } from "react";

export const DebtContext = createContext(null)



export function useDebt () {
    const context = useContext(DebtContext);
    if (!context)
        throw new Error("useCustomers must be used within a CustomerProvider");
    
    return context;
}