import CustomerStat from "./CustomerStat";
import StatusTabs from "./StatusTabs";
import { useSelector } from "react-redux";
import { useGetCustomerQuery } from "@/store/customerApi";

function CustomerProfile({ onOpenDebtModal }) {
  //const [loading, setLoading] = useState(true);
  // const [debtAccount, setDebtAccount] = useState([]);
  //const [error, setError] = useState(null);
  //const { setSelectedCustomerData } = useCustomers();
  //const { earliestDate } = useCustomers();
  //const { currentDebtCount } = useDebt();

  const selectedCustomerId = useSelector(
    (state) => state.customer.selectedCustomerId,
  );

  const {
    data: customerResponse,
    isLoading,
    isError,
    error,
  } = useGetCustomerQuery(selectedCustomerId, {
    skip: !selectedCustomerId,
  });

  const customer = customerResponse?.data;
  const customerName = customer?.name || "Customer";
  const grandTotal = (customer?.grandTotal ?? 0).toLocaleString("en-KE", {
    style: "currency",
    currency: "KES",
  });
  const activeDebtCount = customer?.debts.length ?? 0;

  const convertDateToString = (customer) => {
    if (!customer?.debts?.length) {
      return "N/A";
    }

    const dates = customer.debts
      .map((debt) => {
        return new Date(debt.dateTaken).getTime();
      })
      .filter((value) => !Number.isNaN(value))
      .sort((a, b) => a - b);

    if (!dates.length) {
      return "N/A";
    }
    return new Date(dates[0]).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  };
  const earliestDate = convertDateToString(customer);

  return (
    <div className="flex flex-col gap-1">
      {/*customer detail and debt balance */}
      <div className="flex flex-row items-baseline justify-between px-4 py-2 mt-4">
        {/*Customer detail */}
        <div className="flex flex-row gap-4 items-center justify-center">
          {/*Profile circle */}
          <div className="flex rounded-full items-center justify-center bg-blue-800 h-12 w-12">
            <span className="text-white text-center font-semibold">AO</span>
          </div>
          <span className="font-bold text-lg text-black">{customerName}</span>
        </div>
        {/*customer balance */}
        <div className="flex flex-col item-center text-right">
          <span className="text-lg text-brand-action font-bold">
            {grandTotal}
          </span>
          <span className="text-brand-graytext text-xs">OUTSTANDING</span>
        </div>
      </div>

      {/*customer stats */}
      <div className="flex flex-row gap-4 border-b border-brand-items-separator py-2 p-4">
        <CustomerStat
          value={activeDebtCount}
          label={activeDebtCount > 1 ? "active debts" : "active debt"}
        />
        <div className="h-4 w-px bg-slate-200" aria-hidden="true" />
        <CustomerStat value="1" label="paid" />
        <div className="h-4 w-px bg-slate-200" aria-hidden="true" />
        <CustomerStat label={`since ${earliestDate} `} />
      </div>

      {/*customer debt history */}
      <StatusTabs onOpenDebtModal={onOpenDebtModal} />
    </div>
  );
}

export default CustomerProfile;
