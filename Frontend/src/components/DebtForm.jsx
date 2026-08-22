import { useDebt } from "../context/DebtContext";

const INTERGER_REGEX = /^\d*$/; // Allows empty string + positive whole numbers
const DECIMAL_REGEX = /^\d*\.?\d{0,2}$/; // Allows empty string + up to 2 decimal places

function DebtForm() {
  const { debtData, setDebtData, today, dateTaken, setDateTaken } = useDebt();

  const handleAddOtherItem = () => {
    setDebtData([...debtData, { itemName: "", price: "", quantity: "1" }]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...debtData];
    updated[index][field] = value;
    setDebtData(updated);
  };

  const handlePriceQtyChange = (e, index, field) => {
    const value = e.target.value;

    const isValid =
      field === "quantity"
        ? INTERGER_REGEX.test(value)
        : DECIMAL_REGEX.test(value);
    if (isValid) {
      return updateItem(index, field, value);
    }
  };

  const handleRemoveItem = (index) => {
    if (debtData.length === 1) return;
    const updated = debtData.filter((_, i) => i !== index);
    setDebtData(updated);
  };

  return (
    <div className="flex flex-col gap-3 ">
      <div className="text-brand-muted-fg tracking-wide">
        <label className="block text-xs">DATE ITEMS WERE TAKEN</label>
        <input
          type="date"
          max={today}
          value={dateTaken || today}
          onChange={(e) => setDateTaken(e.target.value)}
          className=" text-brand-text  w-full flex-1 min-w-0 rounded-md border bg-white border-brand-border px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
        />
      </div>
      {debtData.map((item, index) => {
        return (
          <div
            key={index}
            className="bg-brand-muted rounded-xl p-3 flex flex-col gap-2"
          >
            <div className="flex justify-between">
              <h4 className="text-brand-muted-fg tracking-wide">ITEM 1</h4>

              {debtData.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="text-brand-primary text-xs  hover:text-brand-primary-hover"
                >
                  remove
                </button>
              )}
            </div>

            <input
              type="text"
              value={item?.itemName || ""}
              onChange={(e) => updateItem(index, "itemName", e.target.value)}
              placeholder="Item name"
              className="w-full rounded-md border bg-white border-brand-border px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
            />

            <div className="flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={item?.price || ""}
                onChange={(e) => handlePriceQtyChange(e, index, "price")}
                placeholder="Price (Ksh)"
                className="flex-1 min-w-0 bg-white rounded-md border border-brand-border px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
              />
              <input
                type="number"
                value={item?.quantity ?? 1}
                onChange={(e) => handlePriceQtyChange(e, index, "quantity")}
                placeholder="Qty"
                className="flex-1 min-w-0 rounded-md border bg-white border-brand-border px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
              />
            </div>
          </div>
        );
      })}

      <button
        type="button"
        className="self-start text-sm text-brand-red-border hover:underline font-semibold"
        onClick={handleAddOtherItem}
      >
        + Add another item
      </button>
    </div>
  );
}

export default DebtForm;
