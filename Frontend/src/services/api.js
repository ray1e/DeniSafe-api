export const fetchDebts = async () => {
  const res = await fetch("http://localhost:3000/api/v1/debts");

  if (!res.ok) {
    throw new Error(`Failed to fetch debts: ${res.status}`);
  }

  const payload = await res.json();
  return payload;
};