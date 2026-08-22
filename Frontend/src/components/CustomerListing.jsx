import { useDispatch } from "react-redux";
import { setSelectedCustomerId } from "@/store/customerSlice";
import { useGetAllCustomersQuery } from "@/store/customerApi";

function CustomerListing() {
  const dispatch = useDispatch();
  const { data: debts, isLoading, isError, error } = useGetAllCustomersQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col border-r h-full min-h-0 border-brand-items-separator bg-gray-100 overflow-hidden">
        <div className=" flex flex-1 min-h-0 justify-center items-center">
          <div className="p-4 text-sm text-slate-500 text-center font-semibold">
            Loading debts...
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col border-r h-full min-h-0 border-brand-items-separator bg-gray-100 overflow-hidden">
        <div className=" flex flex-1 min-h-0 justify-center items-center">
          <div className="p-4 text-sm text-brand-warning text-center font-semibold">
            <p>Failed to load customers!</p>
            <p>
              {error?.data?.message ||
                `HTTP Error: ${error?.status || "Unknown"}`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  //Grab initials from customer names
  const getInitials = (name) => {
    if (!name) return "??";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <div className="flex flex-col border-r h-full min-h-0 border-brand-items-separator bg-gray-100 overflow-hidden">
      <form className="p-3 border-b border-brand-items-separator">
        <input
          className="focus:outline-none focus:border-transparent px-3 py-2 focus:ring-1 focus:ring-red-300 w-full text-sm bg-slate-50 rounded-md text-slate-900 transition-all"
          type="text"
          placeholder="Search customers..."
        />
      </form>
      <div className=" flex-1 min-h-0 overflow-y-auto">
        {debts.length === 0 ? (
          <div className="p-4 text-xs text-slate-500 text-center">
            No debts found.
          </div>
        ) : (
          debts.map((debt) => {
            const initials = getInitials(debt.name);
            return (
              <div
                key={debt._id}
                onClick={() => dispatch(setSelectedCustomerId(debt._id))}
                className="flex p-3 border-b border-brand-items-separator cursor-default justify-between hover:bg-brand-card"
              >
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
                      {debt.items?.length}{" "}
                      {debt.items?.length === 1 ? "item" : "items"}
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
