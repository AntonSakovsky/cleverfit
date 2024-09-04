import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FeedbackResponse } from '@type/feedback/types';

export type FeedbackData = {
    data: FeedbackResponse[];
    limit: number;
    error403: boolean;
    successModal: boolean;
    dataNotSavedModal: boolean;
    fields: {
        message: string;
        rating: number | null ;
    };
};

const initialState: FeedbackData = {
    data: [] as FeedbackResponse[],
    limit: 4,
    error403: false,
    successModal: false,
    dataNotSavedModal: false,
    fields: {
        message: '',
        rating: null,
    },
};

const feedbackSlice = createSlice({
    name: 'feedbackSlice',
    initialState,
    reducers: {
        setData(state, action: PayloadAction<FeedbackResponse[]>) {
            state.data = action.payload;
        },
        setLimit(state, action: PayloadAction<number>) {
            state.limit = action.payload;
        },
        setError403(state, action: PayloadAction<boolean>) {
            state.error403 = action.payload;
        },
        setSuccessModal(state, action: PayloadAction<boolean>) {
            state.successModal = action.payload;
        },
        setDataNotSavedModal(state, action: PayloadAction<boolean>) {
            state.dataNotSavedModal = action.payload;
        },

        setFeedbackFormFields(state, action: PayloadAction<{ message: string; rating: number | null}>) {
            state.fields = action.payload;
        },
    },
});

export default feedbackSlice.reducer;
export const {
    setData,
    setDataNotSavedModal,
    setError403,
    setLimit,
    setSuccessModal,
    setFeedbackFormFields,
} = feedbackSlice.actions;
