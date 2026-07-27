import { useState } from "react";

function DebtForm() {
  const [date, setDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="flex flex-col gap-2 ">
      <div className="bg-brand-muted rounded-xl p-3 flex flex-col gap-2">
        <h4 className="text-brand-muted-fg tracking-wide">ITEM 1</h4>

        <input
          type="text"
          value={name}
          placeholder="Item name"
          className="w-full rounded-md border bg-white border-brand-border px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
        />

        <div className="flex gap-2">
          <input
            type="text"
            value={name}
            placeholder="Price"
            className="flex-1 min-w-0 bg-white rounded-md border border-brand-border px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
          />
          <input
            type="text"
            value={name}
            placeholder="Qty"
            className="flex-1 min-w-0 rounded-md border bg-white border-brand-border px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
          />
          <input
            type="date"
            max={today}
            value={name}
            onChange={(e) => {setDate(e.target.value)}}
            placeholder={e.target.value}
            className="flex-1 min-w-0 rounded-md border bg-white border-brand-border px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
          />
        </div>
      </div>
      <button className="self-start text-sm text-brand-red-border font-semibold">
        + Add another item
      </button>
    </div>
  );
}

export default DebtForm;
