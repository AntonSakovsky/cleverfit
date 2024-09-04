import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UpdateUserDto } from '@type/user/types';

type ProfileInitialState = UpdateUserDto & {
    passwordRequired: boolean;
    bigFileError: boolean;
    uploadError: boolean;
};

const initialState: ProfileInitialState = {
    email: undefined,
    password: undefined,
    firstName: undefined,
    lastName: undefined,
    birthday: undefined,
    imgSrc: undefined,
    readyForJointTraining: undefined,
    sendNotification: undefined,
    passwordRequired: false,
    bigFileError: false,
    uploadError: false,
};

export const profileSlice = createSlice({
    name: 'profileSlice',
    initialState,
    reducers: {
        setProfileData(state, action: PayloadAction<UpdateUserDto>) {
            return { ...state, ...action.payload };
        },
        setPasswordRequired(state, action: PayloadAction<boolean>) {
            state.passwordRequired = action.payload;
        },
        setBigFileError(state, action: PayloadAction<boolean>) {
            state.bigFileError = action.payload;
        },
        setUploadError(state, action: PayloadAction<boolean>) {
            state.uploadError = action.payload;
        },
        resetProfileData(state, _: PayloadAction<null>) {
            state.email = '';
            state.password = '';
            state.firstName = '';
            state.lastName = '';
            state.birthday = '';
            state.imgSrc = '';
            state.readyForJointTraining = false;
            state.sendNotification = false;
        },
    },
});

export const {
    setProfileData,
    setPasswordRequired,
    setBigFileError,
    setUploadError,
    resetProfileData,
} = profileSlice.actions;
export default profileSlice.reducer;
