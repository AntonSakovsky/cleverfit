import { LS_TOKEN } from "@constants/constants";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInfoDto, Tarif } from "@type/user/types";
import { LocalStorage } from "@utils/localStorage/localStorage";

export type IUserData = {
    email: string;
    password: string;
    token: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    birthday: string;
    imgSrc: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
    tariff: Tarif | undefined;
}

const initialState: IUserData = {
    email: '',
    password: '',
    token: LocalStorage.get(LS_TOKEN) ?? '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    birthday: '',
    imgSrc: '',
    readyForJointTraining: false,
    sendNotification: false,
    tariff: undefined,
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setEmail(state, action: PayloadAction<string>){
            state.email = action.payload;
        },
        setPassword(state, action: PayloadAction<string>){
            state.password = action.payload;
        },
        setConfirmPassword(state, action: PayloadAction<string>){
            state.confirmPassword = action.payload;
        },
        setAccessToken(state, action: PayloadAction<string>){
            state.token = action.payload;
        },
        setUserInfo(state, action: PayloadAction<UserInfoDto>){
            const info = action.payload;
            state.email = info.email;
            state.firstName = info.firstName;
            state.lastName = info.lastName;
            state.imgSrc = info.imgSrc;
            state.birthday = info.birthday;
            state.readyForJointTraining = info.readyForJointTraining;
            state.sendNotification = info.sendNotification;
            state.tariff = info.tariff;
        },
    }
});

export default userSlice.reducer;
export const {setEmail, setPassword,setConfirmPassword, setAccessToken, setUserInfo } = userSlice.actions;