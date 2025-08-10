import { baseApi } from "@/redux/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        register: builder.mutation({
            query: (userBody) => ({
                url: "/user/register",
                method: "POST",
                body: userBody
            })
        })

    })
});

export const { useRegisterMutation } = authApi;