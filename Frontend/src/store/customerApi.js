import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customerApi = createApi({
  reducerPath: "customerApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
  }),

  tagTypes: ["Customer"],

  endpoints: (builder) => ({
    getAllCustomers: builder.query({
      query: () => "/customers",

      transformResponse: (response) => response.data,

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "customer",
                id: _id,
              })),
              { type: "Customer", id: "LIST" },
            ]
          : [{ type: "Customer", id: "LIST" }],
    }),

    getCustomer: builder.query({
      query: (customerId) => `/customers/${customerId}`,
      providesTags: (customerId) => [{ type: "Customer", id: customerId }],
    }),

    createCustomer: builder.mutation({
      query: (customer) => ({
        url: "/customers",
        method: "POST",
        body: customer,
      }),
      invalidatesTags: [{ type: "Customer", id: "LIST" }],
    }),
  }),
});

export const { useGetAllCustomersQuery, useGetCustomerQuery, useCreateCustomerMutation } = customerApi;
