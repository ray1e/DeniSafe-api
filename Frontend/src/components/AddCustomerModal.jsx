import { useState } from "react";
import DebtForm from "./DebtForm";
import { useCustomers } from "./CustomerContext";
import { useDebt } from "./DebtContext";

function AddCustomerModal({ isOpen, onClose }) {
  const { customerData, setCustomerData } = useCustomers();
  const { today, debtData, dateTaken, setDateTaken } = useDebt();
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [missingMessage, setMissingMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    if (!customerData.name.trim()) return;

    const payload = {
      name: customerData.name,
      note: customerData.note,
      dateTaken,
      items: debtData.map((item) => ({
        ...item,
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
      })),
    };

    const error =
      customerData.name.trim() === ""
        ? "Please enter the customer name."
        : debtData.some((item) => item.itemName === "")
          ? "Please enter the item name for all items."
          : debtData.some((item) => item.price === "")
            ? "Please enter a price for each item."
            : debtData.some((item) => item.quantity === "")
              ? "Please enter the quantity of each item"
              : "";

    setMissingMessage(error);

    if (error) return;

    try {
      console.log("Sending items:", debtData);
      const res = await fetch("http://localhost:3000/api/v1/debts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Failed to create debt: ${res.status}`);
      }

      const result = await res.json();
      console.log(result);
      onClose();
    } catch (error) {
      console.error("Error creating debt:", error);
    }
  };

  return (
    <div className="tracking-wide fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      {/* Centered Modal Card */}
      <div className="flex h-[75vh] max-h-[calc(100vh-2rem)] w-full max-w-md flex-col overflow-hidden rounded-lg bg-brand-background py-4 shadow-xl">
        <div className="flex shrink-0 items-center justify-between border-b border-brand-border px-3 pb-3">
          <h3 className="text-lg font-semibold">New Customer</h3>
          <button
            onClick={onClose}
            className="text-brand-muted-fg hover:text-slate-600 text-lg font-semibold"
          >
            x
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-3 [scrollbar-thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-track]:bg-transparent">
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
            {/*customer name */}
            <div>
              <label className="block text-sm font-normal text-brand-muted-fg uppercase mb-1">
                FULL NAME
              </label>
              <input
                type="text"
                value={customerData.name}
                onChange={(e) =>
                  setCustomerData({ ...customerData, name: e.target.value })
                }
                placeholder="e.g. Collins Kimani"
                className="w-full bg-white rounded-md border border-brand-border px-3 py-2 text-sm focus:border-brand-primary focus:outline-none "
              />
            </div>
            <DebtForm />
            <div>
              <label className="block text-sm font-normal text-brand-muted-fg uppercase mb-1">
                NOTE (OPTIONAL)
              </label>
              <input
                type="text"
                value={customerData.note}
                placeholder="e.g. Paid Ksh 200, upfront"
                onChange={(e) =>
                  setCustomerData({ ...customerData, note: e.target.value })
                }
                className="w-full rounded-md border border-brand-border px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
              />
            </div>

            {missingMessage && hasAttemptedSubmit && (
              <p className="text-sm text-brand-primary">{missingMessage}</p>
            )}

            <div className="flex justify-end gap-3 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md px-4 py-2 text-sm font-normal text-brand-foreground hover:bg-brand-muted border border-brand-border"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`rounded-md  px-4 py-2 text-sm font-normal bg-brand-primary text-white hover:bg-brand-primary-hover cursor-pointer`}
              >
                Save Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCustomerModal;
