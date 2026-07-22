function CustomerListing() {
  return (
    <div className="flex flex-col border-r border-brand-items-separator bg-gray-100">
      <form className="p-3 border-b border-brand-items-separator">
        <input className="focus:outline-none focus:border-transparent px-3 py-2 focus:ring-1 focus:ring-red-300 w-full text-sm bg-slate-50 rounded-md text-slate-900 transition-all" type="text" placeholder="Search customers..." />
      </form>
      <div className="flex p-3 border-b border-brand-items-separator justify-between">
        <div className="flex gap-3">
          {/*customer Initials */}
          <span className="flex w-8 h-8 rounded-full bg-blue-700 justify-center items-center text-xs text-white">
            AO
          </span>
          {/*name and debt number */}
          <div className="flex flex-col items-start justify-between">
            {/*name*/}
            <span className="text-sm">Adaeze Okafor</span>
            {/*debt number */}
            <span className="text-brand-graytext text-xs">1 debt</span>
          </div>
        </div>

        {/*total debt amount */}
        <span className="text-brand-action text-base font-medium">Ksh 12,000</span>
      </div>
    </div>
  );
}

export default CustomerListing;
