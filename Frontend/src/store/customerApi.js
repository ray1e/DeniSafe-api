import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customerApi = createApi({
  reducerPath: "customerApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
  }),

  tagTypes: ["customer"],

  endpoints: (builder) => ({
    getCustomer: builder.query({
      query: (customerId) => `/customers/${customerId}`,
      providesTags: (customerId) => [
        { type: "customer", id: customerId },
      ],
    }),
    createCustomer: builder.mutation({
        query: (customer) => ({
            url: "/customers",
            method: "POST",
            body: customer,
        }),
        invalidatesTags: ["customer"],
    })
  }),
});

export const { useGetCustomerQuery, useCreateCustomerMutation } = customerApi;
