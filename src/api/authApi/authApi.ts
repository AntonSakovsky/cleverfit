import { baseURL } from '@constants/constants';
import { authApiRoutes } from '@constants/forApi/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    ChangePasswordBodyType,
    CheckEmailBodyType,
    ConfirmEmailBodyType,
    LoginBodyType,
    RegistrationBodyType,
} from '@type/auth/types';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}auth/` }),
    endpoints: (builder) => ({
        login: builder.mutation<{accessToken: string}, LoginBodyType>({
            query: (body: LoginBodyType) => ({
                url: authApiRoutes.Login,
                method: 'POST',
                body,
            }),
        }),
        registration: builder.mutation({
            query: (body: RegistrationBodyType) => ({
                url: authApiRoutes.Registration,
                method: 'POST',
                body,
            }),
        }),
        checkEmail: builder.mutation({
            query: (body: CheckEmailBodyType) => ({
                url: authApiRoutes.CheckEmail,
                method: 'POST',
                body,
            }),
        }),
        confirmEmail: builder.mutation({
            query: (body: ConfirmEmailBodyType) => ({
                url: authApiRoutes.ConfirmEmail,
                method: 'POST',
                body,
                credentials: 'include'
            }),
        }),
        changePassword: builder.mutation({
            query: (body: ChangePasswordBodyType) => ({
                url: authApiRoutes.ChangePassword,
                method: 'POST',
                body,
                credentials: 'include'
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegistrationMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePasswordMutation,
} = authApi;
