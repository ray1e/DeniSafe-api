import QuickActions from "./QuickActions";

function StatusTabs() {
  return (
    <div className="flex gap-4 border-b border-brand-items-separator pr-4 py-2 pl-9 items-center justify-between">
      <div className="flex gap-9">
        <button className="text-base font-semibold transition-colors bg-transparent border-none p-0 cursor-pointer">
          Active
        </button>
        <button className="text-base font-semibold transition-colors bg-transparent border-none p-0 cursor-pointer">
          History
        </button>
      </div>

      <QuickActions
        label="+ New Debt"
        className="min-h-5 min-w-15 text-xs px-2 py-1"
      />
    </div>
  );
}

export default StatusTabs;
