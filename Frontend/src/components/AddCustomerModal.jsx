import { useState } from "react";
import DebtForm from "./DebtForm";

function AddCustomerModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const formData = {
      name: e.target.name.value,
      price
      quantity
      //note: e.target.note.value,
      dateTaken:

    };

    const res = await fetch("http://localhost:3000/api/v1/debts", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    console.log(result);

    onClose();
  };

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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={note}
                placeholder="e.g. Paid Ksh 200, upfront"
                onChange={(e) => setNote(e.target.value)}
                className="w-full rounded-md border border-brand-border px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
              />
            </div>
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
                className="rounded-md bg-brand-primary px-4 py-2 text-sm font-normal text-white hover:bg-brand-primary-hover"
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
