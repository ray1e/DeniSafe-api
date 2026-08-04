import { useDebt } from "./DebtContext";
import DebtForm from "./DebtForm";
import { useState } from "react";

function AddDebtModal({ isOpen, onClose }) {
  const [note, setNote] = useState("");
  const { today } = useDebt();

  if (!isOpen) return null;

  return (
    <div className="tracking-wide fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-brand-primary-fg rounded-lg shadow-xl py-4 flex flex-col gap-3">
        <div className="flex justify-between border-b border-brand-border px-3 mb-3 pb-4">
          <h3 className=" text-lg tracking-wide font-semibold">New Debt</h3>
          <button
            className="text-brand-muted-fg h-8 w-8 aspect-square inline-flex items-center justify-center hover:bg-brand-muted"
            type="button"
            onClick={onClose}

          >
            ×
          </button>
        </div>
        <div className="px-3">
          <DebtForm />
        </div>
        <div className="px-3">
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
        <div className="flex justify-end gap-3 mt-2 px-3">
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
            Record Debt
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddDebtModal;
