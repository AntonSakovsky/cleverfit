import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,

}

const LoaderSlice = createSlice({
    name: 'catalogSlice',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>){
            state.loading = action.payload;
        }
    }
})

export default LoaderSlice.reducer;
export const {setLoading} = LoaderSlice.actions;