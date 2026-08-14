import { useState } from "react";
import { ModalContext } from "../context/DebtModalContext";


 export function ModalProvider ({children}) {
    const [isDebtModalOpen, setIsDebtModalOpen] = useState(false);

    const openDebtModal = () => {setIsDebtModalOpen(true)};
    const closeDebtModal = () => {setIsDebtModalOpen(false)};
    const value = {
      isDebtModalOpen, 
      openDebtModal, 
      closeDebtModal
    }
    return(
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    )
}