import QuickActions from "./QuickActions"
import StatItem from "./StatItem"


function Header () {
    return(
        <div className="flex flex-row items-center justify-between border-b py-4 px-2">
            {/*app branding */}
            <div className="flex items-center">
                <h1 className="text-2xl font-extrabold text-brand-text tracking-tight">
                    DeniSafe
                </h1>
            </div>
            {/*stats group */}
            <div className="flex flex-row gap-4">
                <StatItem value="Ksh 10,200" label="TOTAL OWNED" className="text-brand-action"/>
                <div className="h-8 w-px bg-slate-200" aria-hidden="true" />
                <StatItem value="2" label="ACTIVE DEBTORS" className="text-brand-text"/>
                <div className="h-8 w-px bg-slate-200" aria-hidden="true" />
                <StatItem value="5" label="CUSTOMERS" className="text-brand-text"/>
            </div>
            <QuickActions
                label="+ New Customer" className="min-h-10 min-w-5 px-3 py-2"
            />
        </div>
    )
}

export default Header