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
