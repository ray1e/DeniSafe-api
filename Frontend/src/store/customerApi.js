import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const customerApi = createApi({
    reducerPath: "customerApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/v1"
    }),

    endpoints: (builder) => ({
        getCustomer: builder.query({
            query: (customerId) => `/customers/${customerId}`
        }),
    })
})

export const {useGetCustomerQuery} = customerApi;