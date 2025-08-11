import { baseApi } from "@/redux/baseApi";
import type { IResponse, ISendOtp } from "@/types";



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
        }),

        sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
            query: (userBody) => ({
                url: "/otp/send",
                method: "POST",
                data: userBody
            })
        })

    })
});

export const { useRegisterMutation, useLoginMutation, useSendotpMutation } = authApi;