import { baseApi } from "@/redux/baseApi";
import type { IResponse, ISendOtp, IVerifyOtp } from "@/types";



export const authApi = baseApi.injectEndpoints({
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

        logOut: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["user"]
        }),

        sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
            query: (userBody) => ({
                url: "/otp/send",
                method: "POST",
                data: userBody
            })
        }),

        verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
            query: (userBody) => ({
                url: "/otp/verify",
                method: "POST",
                data: userBody
            })
        }),

        userInfo: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            providesTags: ["user"]
        }),

    })
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useSendOtpMutation,
    useVerifyOtpMutation,
    useUserInfoQuery,
    useLogOutMutation } = authApi;