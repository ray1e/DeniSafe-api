import { useEffect, useState } from "react";
import { fetchDebts } from "../services/api";

function CustomerListing() {
  const [debts, setDebts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadDebts = async () => {
      try {
        const debtResponse = await fetchDebts();

        if (isMounted && debtResponse?.success) {
          setDebts(debtResponse.data ?? []);
        } else if (isMounted) {
          setError(debtResponse?.message || "Failed to get debts");
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
          setError("Failed to get debts");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadDebts();

    return () => {
      isMounted = false;
    };
  }, []);

  //Grab initials for customer names
  const getInitials = (name) => {
    if (!name) return "??";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <div className="flex flex-col border-r border-brand-items-separator bg-gray-100">
      <form className="p-3 border-b border-brand-items-separator">
        <input
          className="focus:outline-none focus:border-transparent px-3 py-2 focus:ring-1 focus:ring-red-300 w-full text-sm bg-slate-50 rounded-md text-slate-900 transition-all"
          type="text"
          placeholder="Search customers..."
        />
      </form>
      <div className="overflow-y-auto flex-1">
        {loading ? (
          <div className="p-4 text-xs text-slate-500 text-center">
            Loading debts...
          </div>
        ) : debts.length === 0 ? (
          <div className="p-4 text-xs text-slate-500 text-center">
            No debts found.
          </div>
        ) : (
          debts.map((debt) => {
            const initials = getInitials(debt.name);
            return (
              <div key={debt._id} className="flex p-3 border-b border-brand-items-separator justify-between">
                <div className="flex gap-3">
                  {/*Initials avatar*/}
                  <span className="flex w-8 h-8 rounded-full bg-blue-700 justify-center items-center text-xs text-white">
                    {initials}
                  </span>
                  {/*name and debt number */}
                  <div className="flex flex-col items-start justify-between">
                    {/*name*/}
                    <span className="text-sm">{debt.name}</span>
                    {/*debt number */}
                    <span className="text-brand-graytext text-xs">
                      {debt.items.length}{" "}
                      {debt.items.length === 1 ? "item" : "items"}
                    </span>
                  </div>
                </div>

                {/*total debt amount */}
                <span className="text-brand-action text-base font-medium">
                  Ksh 12,000
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default CustomerListing;
