import { baseApi } from "@/redux/baseApi";




export const divisionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addDivision: builder.mutation({
            query: (tourTypeName) => ({
                url: "/division/create",
                method: "POST",
                data: tourTypeName
            }),
        }),

        // allTourTypes: builder.query({
        //     query: () => ({
        //         url: "/tour/tour-types",
        //         method: "GET",
        //     }),
        //     providesTags: ["tour"],
        //     transformResponse: (response) => response.data
        // }),

    })
});

export const {
    useAddDivisionMutation
} = divisionApi;