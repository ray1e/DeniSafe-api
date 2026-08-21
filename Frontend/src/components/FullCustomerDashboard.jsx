import CustomerSplitView from "./CustomerSplitView";
import { useModal } from "../context/DebtModalContext";
import Header from "./Header";
import { useState } from "react";
import AddCustomerModal from "./AddCustomerModal";
import AddDebtModal from "./AddDebtModal";
import { useDebt } from "../context/DebtContext";

function FullCustomerDashboard() {
 

  const {isDebtModalOpen, closeDebtModal} = useModal();
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false)
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="shrink-0">
        <Header onOPenAddCustomer={() => setIsCustomerModalOpen(true)}/>
      </div>

      <div className="min-h-0 flex-1">
        <CustomerSplitView/>
      </div>

      <AddCustomerModal isOpen={isCustomerModalOpen} onClose={() => {setIsCustomerModalOpen(false)}}/>
      <AddDebtModal isOpen={isDebtModalOpen} onClose={closeDebtModal}/>
    </div>
  );
}

export default FullCustomerDashboard;
