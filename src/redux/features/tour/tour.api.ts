import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITour } from "@/types";




export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addTour: builder.mutation({
            query: (tour) => ({
                url: "/tour/create",
                method: "POST",
                data: tour
            }),
            // invalidatesTags: ["tour"]
        }),

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

        allTours: builder.query<ITour[], unknown>({
            query: (params) => ({
                url: "/tour",
                method: "GET",
                params
            }),
            providesTags: ["tour"],
            transformResponse: (response: IResponse<ITour[]>) => response.data
        }),

        getASingleTour: builder.query<ITour[], unknown>({
            query: (params) => ({
                url: "/tour",
                method: "GET",
                params
            }),
            transformResponse: (response: IResponse<ITour[]>) => response.data
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
    useDeleteTourTypeMutation,
    useAddTourMutation,
    useAllToursQuery
} = tourApi;