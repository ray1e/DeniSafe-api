import DebtForm from "./DebtForm";
import { useState } from "react";

function AddDebt() {
  const [note, setNote] = useState("");
  return (
    <div className="tracking-wide fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-brand-background rounded-lg shadow-xl py-4 flex flex-col">
        <div className="flex justify-between border-b border-brand-border">
          <h2 className="text-brand-foreground tracking-wide">New Debt</h2>
          <span className="text-brand-muted-fg">x</span>
        </div>
        <div>
          <DebtForm />
        </div>
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
            Record Debt
          </button>
        </div>
      </div>
    </div>
  );
}
