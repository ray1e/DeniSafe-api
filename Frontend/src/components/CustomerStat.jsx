function CustomerStat({value, label}) {
    return(
        <div className="flex items-center gap-1.5">
            <span className="text-sm text-black">{value}</span>
            <span className="text-sm text-brand-graytext">{label}</span>
        </div>
    )
}

export default CustomerStat;