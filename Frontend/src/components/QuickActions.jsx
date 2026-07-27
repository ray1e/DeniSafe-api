function QuickActions ({ label, onClick, className = "" }) {
    return (
        <button
            onClick={onClick}
            className={`text-center bg-brand-red-border rounded-sm ${className}`}
        >
            <span className="text-brand-action-text">{label}</span>
        </button>
    )
}

export default QuickActions;