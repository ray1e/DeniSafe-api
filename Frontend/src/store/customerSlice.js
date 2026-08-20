import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerData: {
    name: "",
    note: "",
  },
  selectedCustomerId: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomerName(state, action) {
      state.customerData.name = action.payload;
    },
    setCustomerNote(state, action) {
      state.customerData.note = action.payload;
    },
    setSelectedCustomerId(state, action) {
      state.selectedCustomerId = action.payload;
    },
    resetCustomerForm(state) {
      state.customerData = initialState.customerData;
    },
  },
});

export const {
  setCustomerName,
  setCustomerNote,
  setSelectedCustomerId,
  resetCustomerForm,
} = customerSlice.actions;

export default customerSlice.reducer;