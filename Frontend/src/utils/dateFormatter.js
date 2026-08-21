const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export const formatDate = (dateValue) => {
  if (!dateValue) return "N/A";
  const date = new Date(dateValue);
  return Number.isNaN(date.getTime()) ? "NAN" : dateFormatter.format(date);
};
