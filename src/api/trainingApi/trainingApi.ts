import { baseURL } from '@constants/constants';
import { trainingApiRoutes } from '@constants/forApi/constants';
import { RootState } from '@redux/configure-store';
import { setTrainingList } from '@redux/reducers/TrainingSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateTrainingBody, DeleteTrainingPath, TrainingItem, UpdateTrainingBody } from '@type/calendar/types';

export const trainingApi = createApi({
    reducerPath: 'trainingApi',
    tagTypes: ['Trainings'],
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL+trainingApiRoutes.BaseUrl,
        prepareHeaders: (headers: Headers, { getState }) => {
            const state = getState() as RootState;
            headers.set('authorization', `Bearer ${state.user.token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTraining: builder.query<TrainingItem[], null>({
            query: () => '',
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    
                    if (data) {
                        dispatch(setTrainingList(data));
                    }
                } catch (error) {
                    dispatch(setTrainingList([]));
                }
            },
           
            providesTags: ['Trainings'],
        }),
        createTraining: builder.mutation<TrainingItem, CreateTrainingBody>({
            query: (body) => ({
                url: '',
                body,
                method: 'POST',
            }),
            invalidatesTags: ['Trainings'],
        }),
        updateTraining: builder.mutation<
            TrainingItem,
            { trainingId: string; body: UpdateTrainingBody }
        >({
            query: ({ body, trainingId }) => ({
                url: `${trainingId}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Trainings'],
        }),
        deleteTraining: builder.mutation<
            {},
            DeleteTrainingPath
        >({
            query: ({ trainingId }) => ({
                url: `${trainingId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Trainings'],
        }),
    }),
});

export const {
    useGetTrainingQuery,
    useLazyGetTrainingQuery,
    useCreateTrainingMutation,
    useUpdateTrainingMutation,
    useDeleteTrainingMutation,
} = trainingApi;
