import ActiveDebtTab from "./ActiveDebtTab";
import CustomerListing from "./CustomerListing";
import CustomerProfile from "./CustomerProfile";
import AddDebtModal from "./AddDebtModal";
import { useState } from "react";

function CustomerSplitView({onOpenDebtModal}) {
    const [selectedCustomerId, setSelectedCustomerId] = useState("")
  return (

    <div className="flex flex-col md:flex-row w-full min-h-screen ">
      <div className="md:w-85 md:shrink-0 w-full">
        <CustomerListing onSelectCustomer={setSelectedCustomerId}/>
      </div>

      <div className="flex-1 min-w-0 gap-3 flex flex-col">
        <CustomerProfile selectedCustomerId={selectedCustomerId}/>
        <ActiveDebtTab selectedCustomerId={selectedCustomerId}/>
        
      </div>
    </div>
  );
}

export default CustomerSplitView;
