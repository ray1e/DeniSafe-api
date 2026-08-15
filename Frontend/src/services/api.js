export const fetchAllDebtAccounts = async () => {
  const res = await fetch("http://localhost:3000/api/v1/customers");

  if (!res.ok) {
    throw new Error(`Failed to fetch debts: ${res.status}`);
  }

  const payload = await res.json();
  return payload;
};

export const fetchCustomerDebts = async (accountId) => {
  const res = await fetch(
    `http://localhost:3000/api/v1/customers/${accountId}/debts`,
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch customer debts: ${res.status}`);
  }
  const payload = await res.json();
  return payload;
};
