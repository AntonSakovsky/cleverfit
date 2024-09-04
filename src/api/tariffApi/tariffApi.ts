import { baseURL } from "@constants/constants";
import { RootState } from "@redux/configure-store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BuyTariffDto } from "@type/tariff/types";

export const tariffApi = createApi({
    reducerPath: 'tariffApi',
    baseQuery: fetchBaseQuery({baseUrl: baseURL, 
        prepareHeaders: (headers: Headers, {getState}) => {
            const state = getState() as RootState;
            headers.set('authorization', `Bearer ${state.user.token}`);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        buyTariff: builder.mutation<any, BuyTariffDto>({
            query: (body)=> ({
                url: 'tariff',
                method: 'POST',
                body,
            })
        })
    })
    
});

export const {useBuyTariffMutation} = tariffApi