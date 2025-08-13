import { baseApi } from "@/redux/baseApi";




export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addTourType: builder.mutation({
            query: (tourTypeName) => ({
                url: "/tour/create-tour-type",
                method: "POST",
                data: tourTypeName
            }),
            invalidatesTags: ["tour"]
        }),

        allTourTypes: builder.query({
            query: () => ({
                url: "/tour/tour-types",
                method: "GET",
            }),
            providesTags: ["tour"],
            transformResponse: (response) => response.data
        }),

        deleteTourType: builder.mutation({
            query: (id) => ({
                url: `/tour/tour-types/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["tour"],
        }),

    })
});

export const {
    useAddTourTypeMutation,
    useAllTourTypesQuery,
    useDeleteTourTypeMutation
} = tourApi;