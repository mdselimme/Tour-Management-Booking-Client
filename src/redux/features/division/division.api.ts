import { baseApi } from "@/redux/baseApi";




export const divisionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addDivision: builder.mutation({
            query: (tourTypeName) => ({
                url: "/division/create",
                method: "POST",
                data: tourTypeName
            }),
            invalidatesTags: ["division"]
        }),

        getAllDivision: builder.query({
            query: () => ({
                url: "/division",
                method: "GET",
            }),
            providesTags: ["division"],
            transformResponse: (response) => response.data
        }),

    })
});

export const {
    useAddDivisionMutation,
    useGetAllDivisionQuery
} = divisionApi;