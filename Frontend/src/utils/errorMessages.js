export const getCustomerErrorMessage = (error) => {
  if (error?.status === "FETCH_ERROR") {
    return "The server is unavailable. Please try again in a moment.";
  }
  
  if (error?.status === "TIMEOUT_ERROR") {
    return "The request took too long. Please try again.";
  }

  if (error?.status === 404) {
    return `${error.status} Customer records could not be found.`;
  }

  if (error?.status >= 500) {
    return "The server is currently unavailable. Please try again later.";
  }

  return error?.data?.message || "Unable to load customers. Please try again.";
};
