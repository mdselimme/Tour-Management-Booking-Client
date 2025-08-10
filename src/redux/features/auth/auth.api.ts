import { baseApi } from "@/redux/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        register: builder.mutation({
            query: (userBody) => ({
                url: "/user/register",
                method: "POST",
                data: userBody
            })
        }),

        login: builder.mutation({
            query: (userBody) => ({
                url: "/auth/login",
                method: "POST",
                data: userBody
            })
        })

    })
});

export const { useRegisterMutation, useLoginMutation } = authApi;