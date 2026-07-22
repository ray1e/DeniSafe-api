function ActiveDebtTab({ initialDate, totalItems, item }) {
  return (
    <div className="rounded-md border-slate-200 border shadow-md ml-4 mr-4">
      {/*date and  item count */}
      <div className="flex flex-row p-2 gap-6 items-center  border-b border-brand-items-separator">
        <span className="text-gray-500 text-sm" >#001</span>
        <span className="text-gray-500 text-sm">8 jan 2026</span>
        <span className="border-red-200 border font-medium bg-red-100 text-brand-action rounded-xs text-xs px-2">
          3 items
        </span>
      </div>
      {/*table header row */}
      <div className="flex flex-row m-2 items-center text-sm text-gray-500 justify-between border-b border-brand-items-separator py-2 font-medium">
        <span className="w-2/5 text-left">ITEM</span>
        <span className="w-1/5 text-right">DATE</span>
        <span className="w-1/5 text-right">PRICE</span>
        <span className="w-1/12 text-right">QTY</span>
        <span className="w-1/5 text-right">TOTAL</span>
        <div className="w-14 shrink-0 text-right pr-1" ></div>
      </div>
      {/*items-row */}
      <div className="flex justify-between text-sm border-brand-items-separator last:border-b-0 mx-2 text-black py-2">
        <span className="w-2/5 text-base text-left">Tomato paste</span>
        <span className="w-1/5  text-right text-brand-graytext">10 Jan 2026</span>
        <span className="w-1/5  text-right">2,000</span>
        <span className="w-1/12  text-right">2</span>
        <span className="w-1/5  text-right">4,000</span>
        <span className="w-14 shrink-0"></span>
      </div>

      {/*grand total row */}
      <div className="flex justify-between  items-center pt-4 border-t m-2  border-slate-400 font-medium text-base">
        <span className="text-brand-graytext text-left w-4/5">GRAND TOTAL</span>
        <span className="text-brand-action text-right w-1/5">Ksh 20, 000</span>
        <span className="w-14 shrink-0"></span>
      </div>
    </div>
  );
}

export default ActiveDebtTab;
