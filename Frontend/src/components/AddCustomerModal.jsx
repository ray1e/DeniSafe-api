import { useState } from "react";
import DebtForm from "./DebtForm";

function AddCustomerModal({ isOpen, onClose }) {
  const today = new Date().toISOString().split("T")[0];

  const [customerData, setCustomerData] = useState({
    name: "",
    note: "",
  });
  const [debtData, setDebtData] = useState([
    {
      itemName: "",
      price: "",
      quantity: "",
      date: today,
    },
  ]);

  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const isFormValid =
    customerData.name.trim() !== "" &&
    debtData.every(
      (item) => item.itemName.trim() !== "" && item.price.trim() !== "",
    );

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    if (!customerData.name.trim()) return;

    const payload = {
      ...customerData,
      ...debtData,
    };

    if (!isFormValid) return;

    try {
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

  const missingMessage =
    customerData.name.trim() === ""
      ? "Please enter the customer name."
      : debtData.some((item) => item.itemName === "")
        ? "Please enter the item name for all items."
        : debtData.some((item) => item.price === "")
          ? "Please enter a price for each item."
            : "";

  return (
    <div className="tracking-wide fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
      {/* Centered Modal Card */}
      <div className="w-full max-w-md bg-brand-background rounded-lg shadow-xl py-4 ">
        <div className="flex items-center justify-between border-b border-brand-border pb-3 px-3">
          <h3 className="text-lg font-semibold ">New Customer</h3>
          <button
            onClick={onClose}
            className="text-brand-muted-fg hover:text-slate-600 text-lg font-semibold"
          >
            x
          </button>
        </div>
        <div className="px-3">
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
            <DebtForm
              debtData={debtData}
              setDebtData={setDebtData}
              today={today}
            />
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
