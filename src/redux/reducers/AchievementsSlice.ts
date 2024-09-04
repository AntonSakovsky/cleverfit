import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AchievementPeriod } from '@type/achievements/types';
import { TrainingType } from '@type/calendar/types';

const initialState = {
    period: 'week' as AchievementPeriod,
    filter: {
        name: 'Все',
        key: 'all',
    } as TrainingType,
    contentWidth: 0,
};

export const achievementsSlice = createSlice({
    name: 'achievements',
    initialState,
    reducers: {
        setPeriod(state, action: PayloadAction<AchievementPeriod>) {
            state.period = action.payload;
        },
        setFilter(state, action: PayloadAction<TrainingType>) {
            state.filter = action.payload;
        },
        setContetnWidth(state, action: PayloadAction<number>) {
            state.contentWidth = action.payload;
        },
    },
});

export default achievementsSlice.reducer;
export const { setPeriod, setFilter, setContetnWidth } = achievementsSlice.actions;
