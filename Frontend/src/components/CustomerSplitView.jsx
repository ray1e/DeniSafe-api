import ActiveDebtTab from "./ActiveDebtTab";
import CustomerListing from "./CustomerListing";
import CustomerProfile from "./CustomerProfile";
import { useState } from "react";
import { useCustomers } from "@/context/CustomerContext";

function CustomerSplitView({onOpenDebtModal}) {
    const {selectedCustomerId, setSelectedCustomerId} = useCustomers();
  return (

    <div className="flex flex-col md:flex-row w-full min-h-screen ">
      <div className="md:w-85 md:shrink-0 w-full">
        <CustomerListing/>
      </div>

      <div className="flex-1 min-w-0 gap-3 flex flex-col">
        <CustomerProfile selectedCustomerId={selectedCustomerId}/>
        <ActiveDebtTab selectedCustomerId={selectedCustomerId}/>
        
      </div>
    </div>
  );
}

export default CustomerSplitView;
