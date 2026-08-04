import CustomerListing from "./CustomerListing";
import CustomerSplitView from "./CustomerSplitView";
import { useModal } from "./DebtModalContext";
import Header from "./Header";
import { useState } from "react";
import AddCustomerModal from "./AddCustomerModal";
import AddDebtModal from "./AddDebtModal";
import { useDebt } from "./DebtContext";

function FullCustomerDashboard() {
 

  const {isDebtModalOpen, closeDebtModal} = useModal();
  const {today} = useDebt()
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false)
  return (
    <div>
      <div>
        <Header onOPenAddCustomer={() => setIsCustomerModalOpen(true)}/>
      </div>

      <div>
        <CustomerSplitView/>
      </div>

      <AddCustomerModal isOpen={isCustomerModalOpen} onClose={() => {setIsCustomerModalOpen(false)}}/>
      <AddDebtModal isOpen={isDebtModalOpen} onClose={closeDebtModal}/>
    </div>
  );
}

export default FullCustomerDashboard;
