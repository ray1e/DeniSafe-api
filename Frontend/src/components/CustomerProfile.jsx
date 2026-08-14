import { useEffect, useState } from "react";
import CustomerStat from "./CustomerStat";
import StatusTabs from "./StatusTabs";
import { useCustomers } from "@/context/CustomerContext";

function CustomerProfile({ onOpenDebtModal }) {
  const [loading, setLoading] = useState(true);
  const [debt, setDebts] = useState([]);
  const [error, setError] = useState(null);
  const {setSelectedCustomerData} = useCustomers();
  const {selectedCustomerId} = useCustomers();

  useEffect(() => {
    if (!selectedCustomerId) return;

    const getDebts = async () => {
      setLoading(true);
      setError(null);
      //fetch customer debts
      try {
        const debtResponse = await fetch(`http://localhost:3000/api/v1/customers/${selectedCustomerId}/debts`);
        const debtData = await debtResponse.json()
        if (debtResponse.ok && debtData?.success) {
          setDebts(debtData?.data || [])
          setSelectedCustomerData(debtData?.data || [])
          
        } else {
          setError("Failed to get debts for this customer")
        }
        
      } catch (err) {
        console.error(err);
        setError("Failed to get debts for this customer");
      } finally {
        setLoading(false)
      }
    };
    getDebts();
  }, [selectedCustomerId]);

  const customerName = debt.length > 0 ? debt[0].name : "Customer";
  return (
    <div className="flex flex-col gap-1">
      {/*customer detail and debt balance */}
      <div className="flex flex-row items-baseline justify-between p-4">
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
            Ksh. 1,000
          </span>
          <span className="text-brand-graytext text-xs">OUTSTANDING</span>
        </div>
      </div>

      {/*customer stats */}
      <div className="flex flex-row gap-4 border-b border-brand-items-separator pb-2 p-4">
        <CustomerStat value="1" label="active debt" />
        <div className="h-4 w-px bg-slate-200" aria-hidden="true" />
        <CustomerStat value="1" label="paid" />
        <div className="h-4 w-px bg-slate-200" aria-hidden="true" />
        <CustomerStat label="since 8 jan 2026" />
      </div>

      {/*customer debt history */}
      <StatusTabs onOpenDebtModal={onOpenDebtModal} />
    </div>
  );
}

export default CustomerProfile;
