import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./customerSlice";
import { customerApi } from "./customerApi";

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    [customerApi.reducerPath]: customerApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(customerApi.middleware)
});