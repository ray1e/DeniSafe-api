function QuickActions ({label,onClick, className=""}) {
    return (
        <button className={`text-center bg-brand-action rounded-sm ${className}`}>
           <span className="text-brand-action-text">{label}</span> 
        </button>
    )
}

export default QuickActions;