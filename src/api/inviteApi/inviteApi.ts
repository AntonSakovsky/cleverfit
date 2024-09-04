import { baseURL } from '@constants/constants';
import { RootState } from '@redux/configure-store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    AcceptInvitationDto,
    DeleteInvitationPath,
    InvitationDto,
    InvitationResponse,
    JointTrainig,
} from '@type/invite/types';

export const inviteApi = createApi({
    reducerPath: 'inviteApi',
    tagTypes: ['Invitation'],
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL + 'invite',
        prepareHeaders: (headers: Headers, { getState }) => {
            const state = getState() as RootState;
            const token = state.user.token;
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getInvites: builder.query<InvitationResponse, null>({
            query: () => '',
            transformResponse: (request: JointTrainig[]) => ({
                invitations: request,
            }),
            providesTags: ['Invitation'],
        }),
        creaeteInvitation: builder.mutation<JointTrainig, InvitationDto>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Invitation'],
        }),
        acceptInvitation: builder.mutation<JointTrainig, AcceptInvitationDto>({
            query: (body) => ({
                url: '',
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Invitation'],
        }),
        deleteInvitation: builder.mutation<{}, DeleteInvitationPath>({
            query: ({ inviteId }) => ({
                url: `${inviteId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Invitation'],
        }),
    }),
});

export const {
    useGetInvitesQuery,
    useLazyGetInvitesQuery,
    useCreaeteInvitationMutation,
    useAcceptInvitationMutation,
    useDeleteInvitationMutation,
} = inviteApi;
