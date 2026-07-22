function StatItem ({value, label, className=""}) {
    return (
        <div className="flex flex-col items-center text-center">
            <span className={`text-xl font-semibold ${className}`}>{value}</span>
            <span className="text- font-light text-xs text-brand-text">{label}</span>
        </div>
    )
}

export default StatItem