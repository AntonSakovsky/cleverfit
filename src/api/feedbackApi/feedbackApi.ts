import { baseURL } from '@constants/constants';
import { feedbackApiRoutes } from '@constants/forApi/constants';
import { RootState } from '@redux/configure-store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddFeedbackBody, FeedbackResponse } from '@type/feedback/types';

export const feedbackApi = createApi({
    reducerPath: 'feedbackApi',
    tagTypes: ['FeedbackList'],
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL+feedbackApiRoutes.BaseUrl,
        prepareHeaders: (headers: Headers, {getState}) => {
            const state = getState() as RootState;
            headers.set('authorization', `Bearer ${state.user.token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getFeedbacks: builder.query<FeedbackResponse[], null>({
            query: () => '',
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'FeedbackList' as const, id })),
                          { type: 'FeedbackList', id: 'LIST' },
                      ]
                    : [{ type: 'FeedbackList', id: 'LIST' }],
        }),
        createFeedback: builder.mutation<{}, AddFeedbackBody>({
            query: (body) => ({
                url: '',
                method: 'POST',
                credentials: 'include',
                body,
            }),
            invalidatesTags: [{ type: 'FeedbackList', id: 'LIST' }],

        }),
    }),
});

export const { useGetFeedbacksQuery, useCreateFeedbackMutation } =
    feedbackApi;
