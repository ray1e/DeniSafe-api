import { useEffect, useState } from "react";
import QuickActions from "./QuickActions";
import StatItem from "./StatItem";
import { useCustomers } from "@/context/CustomerContext";
import { fetchDebtsSummary } from "@/services/api";

function Header({ onOPenAddCustomer }) {
  const { activeDebtors } = useCustomers();
  const [debtsSummary, setDebtsSummary] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadSummary = async () => {
      try {
        const summary = await fetchDebtsSummary();

        if (isMounted && summary?.success) {
          setDebtsSummary(summary.data);
        }
      } catch (error) {
        console.error("Failed to fetch debts summary:", error);
      }
    };

    loadSummary();

    return () => {
      isMounted = false;
    };
  }, []);

  const { totalOutstandingDebt = 0 } = debtsSummary || {};
  return (
    <div className="flex flex-row items-center justify-between border-b py-4 px-2">
      {/*app branding */}
      <div className="flex items-center">
        <h1 className="text-2xl font-extrabold text-brand-text tracking-tight">
          DeniSafe
        </h1>
      </div>
      {/*stats group */}
      <div className="flex flex-row gap-4">
        <StatItem
          value={totalOutstandingDebt}
          label="TOTAL OWNED"
          className="text-brand-action"
        />
        <div className="h-8 w-px bg-slate-200" aria-hidden="true" />
        <StatItem
          value={activeDebtors}
          label="ACTIVE DEBTORS"
          className="text-brand-text"
        />
        <div className="h-8 w-px bg-slate-200" aria-hidden="true" />
        <StatItem
          value={activeDebtors}
          label="CUSTOMERS"
          className="text-brand-text"
        />
      </div>
      <QuickActions
        label="+ New Customer"
        className="min-h-10 min-w-5 px-3 py-2"
        onClick={onOPenAddCustomer}
      />
    </div>
  );
}

export default Header;
