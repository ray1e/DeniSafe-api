import { useCustomers } from "@/context/CustomerContext";
import { useDebt } from "@/context/DebtContext";
import { fetchCustomerDebts } from "@/services/api";
import { useEffect, useState } from "react";

function ActiveDebtTab() {
  const { selectedCustomerId } = useCustomers();

  const [loading, setLoading] = useState(false);
  const [debtsData, setDebtsData] = useState(null);
  const { setCurrentDebtCount } = useDebt();
  const { setEarliestDate, earliestDate } = useCustomers();

  // runs every time the customer selected changes
  useEffect(() => {
    if (!selectedCustomerId) {
      setDebtsData(null);
      return;
    }

    let isMounted = true;
    setLoading(true);

    const loadCustomerDebts = async () => {
      try {
        const response = await fetchCustomerDebts(selectedCustomerId);
        if (isMounted && response?.success) {
          const { grandTotal, debts = [] } = response.data;
          const normalizedDebts = debts.map((debt) => ({
            ...debt,
            formattedDate: new Date(debt.dateTaken).toLocaleDateString(
              "en-GB",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              },
            ),
          }));
          setDebtsData({
            grandTotal,
            debts: normalizedDebts,
          });
        } else if (isMounted) {
          console.error("Failed to fetch customer debts");
        }
      } catch (err) {
        console.error("error retrieving debts", err);
      } finally {
        setLoading(false);
      }
    };

    loadCustomerDebts();
    return () => {
      isMounted = false;
    };
  }, [selectedCustomerId]);

  const { grandTotal, debts = [] } = debtsData || {};

  useEffect(() => {
    setCurrentDebtCount(debts?.length ?? 0);
  }, [debts, setCurrentDebtCount]);

  useEffect(() => {
    if (!debts || debts.length === 0) {
      setEarliestDate(null);
      return;
    }

    const allDates = debts
      .map((debt) => new Date(debt.dateTaken).getTime())
      .filter((value) => !Number.isNaN(value))
      .sort((a, b) => a - b);

    if (allDates.length === 0) {
      setEarliestDate(null);
      return;
    }

    const earliest = new Date(allDates[0]);
    setEarliestDate(
      earliest.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }),
    );
  }, [debts, setEarliestDate]);

  if (!selectedCustomerId) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-gray-400">
        <p className="text-sm font-medium">
          Select a customer from the left list to view their debts
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8 text-gray-500">
        <p className="text-sm font-medium animate-pulse">Loading debts...</p>
      </div>
    );
  }

  return (
    <>
      {!Array.isArray(debts) || debts.length === 0 ? (
        <p className="text-gray-500 text-sm font-medium">
          No customer records available.
        </p>
      ) : (
        debts.map((debt, index) => {
          return (
            <div
              className="rounded-md border-slate-200 border shadow-md ml-4 mr-4"
              key={debt._id}
            >
              {/*date and  item count */}
              <div className="flex flex-row p-2 gap-6 items-center  border-b border-brand-items-separator">
                <span className="text-gray-500 text-sm">{`# ${String(index + 1).padStart(3, "0")}`}</span>
                <span className="text-gray-500 text-sm">
                  {debt.formattedDate}
                </span>
                <span className="border-red-200 border font-medium bg-red-100 text-brand-action rounded-xs text-xs px-2">
                  {`${debt.items.length} ${debt.items.length > 1 ? "items" : "item"}`}
                </span>
              </div>

              {/*table header row */}
              <div className="flex flex-row m-2 items-center text-sm text-gray-500 justify-between border-b border-brand-items-separator py-2 font-medium">
                <span className="w-2/5 text-left">ITEM</span>
                <span className="w-1/5 text-right">PRICE</span>
                <span className="w-1/12 text-right">QTY</span>
                <span className="w-1/5 text-right">TOTAL</span>
                <div className="w-14 shrink-0 text-right pr-1"></div>
              </div>

              {debt.items.map((item, index) => (
                <div
                  key={`${debt._id}-${item.name}-${index}`}
                  className="flex justify-between text-sm border-brand-items-separator last:border-b-0 mx-2 text-black py-2"
                >
                  <span className="w-2/5 text-base text-left">{item.name}</span>
                  <span className="w-1/5  text-right">{item.price}</span>
                  <span className="w-1/12  text-right">{item.quantity}</span>
                  <span className="w-1/5  text-right">4,000</span>
                  <span className="w-14 shrink-0"></span>
                </div>
              ))}

              {/*items-row */}

              {/*grand total row */}
              <div className="flex justify-between  items-center pt-4 border-t m-2  border-slate-400 font-medium text-base">
                <span className="text-brand-graytext text-left w-4/5">
                  TOTAL
                </span>
                <span className="text-brand-action text-right w-1/5">
                  {debt.debtTotal}
                </span>
                <span className="w-14 shrink-0"></span>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}

export default ActiveDebtTab;
