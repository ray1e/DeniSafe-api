import ActiveDebtTab from "./ActiveDebtTab";
import CustomerListing from "./CustomerListing";
import CustomerProfile from "./CustomerProfile";
import AddDebtModal from "./AddDebtModal";
import { useState } from "react";

function CustomerSplitView({onOpenDebtModal}) {
    
  return (

    <div className="flex flex-col md:flex-row w-full min-h-screen ">
      <div className="md:w-85 md:shrink-0 w-full">
        <CustomerListing />
      </div>

      <div className="flex-1 min-w-0 gap-3 flex flex-col">
        <CustomerProfile />
        <ActiveDebtTab />
        
      </div>
    </div>
  );
}

export default CustomerSplitView;
