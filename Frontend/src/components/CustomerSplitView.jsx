import ActiveDebtTab from "./ActiveDebtTab";
import CustomerListing from "./CustomerListing";
import CustomerProfile from "./CustomerProfile";
import { useCustomers } from "@/context/CustomerContext";
import { useSelector } from "react-redux";
import {useGetCustomerQuery} from "@/store/customerApi"

function CustomerSplitView({ onOpenDebtModal }) {
  //const {selectedCustomerId} = useCustomers();
  const selectedCustomerId = useSelector(
    (state) => state.customer.selectedCustomerId,
  );

  const { data: customerResponse, isLoading, isError, error } = useGetCustomerQuery(
    selectedCustomerId,
    { skip: !selectedCustomerId },
  );

  return (
    <div className="flex h-full min-h-0 w-full flex-col md:flex-row">
      <div className="h-full min-h-0 md:w-85 md:shrink-0">
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
