import { baseApi } from "@/redux/baseApi";




export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        createBooking: builder.mutation({
            query: (bookingData) => ({
                url: "/booking/create",
                method: "POST",
                data: bookingData
            }),
            invalidatesTags: ["division"]
        }),

        // getAllDivision: builder.query({
        //     query: () => ({
        //         url: "/division",
        //         method: "GET",
        //     }),
        //     providesTags: ["division"],
        //     transformResponse: (response) => response.data
        // }),

    })
});

export const {
    useCreateBookingMutation
} = bookingApi;