import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TariffDto } from "@type/tariff/types";

type TariffState = {
    availableTariffs: TariffDto[];
}

const initialState: TariffState = {
    availableTariffs: [],
}

const tariffSlice = createSlice({
    name: 'tarifSlice',
    initialState,
    reducers: {
        setAvailableTariffs(state, action: PayloadAction<TariffDto[]>){
            state.availableTariffs = action.payload
        }
    }
});

export const {setAvailableTariffs} = tariffSlice.actions;
export default tariffSlice.reducer;