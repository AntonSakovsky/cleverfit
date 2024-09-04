import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    sendNotification: false,
    readyForJoin: false,
    darkTheme: false,
}
export type SettingsPageState = typeof initialState;

export const settingsSlice = createSlice({
    name: 'settingsSlice',
    initialState,
    reducers: {
        setSendNotification(state, action: PayloadAction<boolean>){
            state.sendNotification = action.payload;
        },
        setReadyForJoin(state, action: PayloadAction<boolean>){
            state.readyForJoin = action.payload;
        },
        setDarkTheme(state, action: PayloadAction<boolean>){
            state.darkTheme = action.payload;
        },
        setSettingsData(state, action: PayloadAction<SettingsPageState>){
            state.readyForJoin = action.payload.readyForJoin;
            state.sendNotification = action.payload.sendNotification;
            state.darkTheme = action.payload.darkTheme;
        },
    }
});

export default settingsSlice.reducer;
export const {setDarkTheme, setReadyForJoin, setSendNotification, setSettingsData} = settingsSlice.actions;