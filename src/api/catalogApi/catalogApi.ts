import { baseURL } from '@constants/constants';
import { catalogApiRoutes } from '@constants/forApi/constants';
import { RootState } from '@redux/configure-store';
import { setAllDisabled } from '@redux/reducers/TrainingPageSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetJointListRequest, TrainingPalDto, TrainingType, UserJointDto } from '@type/calendar/types';
import { TariffDto } from '@type/tariff/types';
import { calculateStatusCount } from '@utils/apiUtils/apiUtils';

export const catalogApi = createApi({
    reducerPath: 'catalogApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL + 'catalogs',
        prepareHeaders: (headers: Headers, { getState }) => {
            const state = getState() as RootState;
            const token = state.user.token;
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTrainingList: builder.query<TrainingType[], null>({
            query: () => catalogApiRoutes.GetTrainingList,
        }),
        getTariffList: builder.query<TariffDto[], null>({
            query: () => ({
                url: catalogApiRoutes.GetTariffList,
                credentials: 'include',
            }),
        }),
        getTrainingPals: builder.query<{pertners: TrainingPalDto[]}, undefined>({
            query: () => ({
                url: catalogApiRoutes.GetTrainingPals,
            }),
            transformResponse: (response: TrainingPalDto[]) =>  {
                return  {
                    pertners: response
                }
            }
        }),
        getUserJointTrainingList: builder.query<{ userJointList : UserJointDto[]}, GetJointListRequest | null>({
            query: (arg) => ({
                url: catalogApiRoutes.GetUserJointTrainingList,
                params: {
                    'trainingType': arg?.trainingType,
                    'status': arg?.status,
                }
            }),
            transformResponse: (response: UserJointDto[]) =>  {
                return  {
                    userJointList: response
                }
            },
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    const count = calculateStatusCount(data.userJointList)
                    if(count >= 4) {
                        dispatch(setAllDisabled(true))
                    } else {
                        dispatch(setAllDisabled(false))
                    }
                    
                } catch (error) {
                    
                }
            }
        }),
    }),
});

export const {
    useLazyGetTrainingListQuery,
    useGetTrainingListQuery,
    useGetTariffListQuery,
    useLazyGetTariffListQuery,
    useGetTrainingPalsQuery,
    useLazyGetTrainingPalsQuery,
    useLazyGetUserJointTrainingListQuery
} = catalogApi;
