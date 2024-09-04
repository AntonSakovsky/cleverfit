import { baseURL } from '@constants/constants';
import { RootState } from '@redux/configure-store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UpdateUserDto, UserInfoDto } from '@type/user/types';

export const userApi = createApi({
    reducerPath: 'userApi',
    tagTypes: ['UserInfo'],
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL+'user',
        prepareHeaders: (headers: Headers, { getState }) => {
            const state = getState() as RootState;
            const token = state.user.token;
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUserInfo: builder.query<UserInfoDto, null>({
            query: () => ({
                url: 'me',
                credentials: 'include'
            }),
            providesTags: ['UserInfo'],
        }),
        updateUser: builder.mutation<UserInfoDto, UpdateUserDto>({
            query: (body) => ({
                url: '',
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['UserInfo'],
        }),
    }),
});

export const { useGetUserInfoQuery, useLazyGetUserInfoQuery, useUpdateUserMutation } = userApi;
