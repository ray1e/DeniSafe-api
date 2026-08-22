const currencyFormatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
    currency: "KES",
});

export const formatCurrency = (value) => {
    if (!value) return "N/A";
    return Number.isNaN(value) ? "N/A" : currencyFormatter.format(value)
}