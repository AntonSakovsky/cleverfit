import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ExersiceField, Exersise, TrainingItem, TrainingType } from '@type/calendar/types';

const initExersiceFields: () => ExersiceField = () => {
    return {
        approaches: 1,
        name: '',
        replays: 1,
        weight: 0,
        isImplementation: false,
        checked: false,
    };
};

const createTraining: (date: string, type: string) => TrainingItem = (date, type) => {
    const newTraining: TrainingItem = {
        date,
        isImplementation: false,
        exercises: [],
        name: type,
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
    };
    return newTraining;
};
type TrainingSliceType = {
    errorOnLoad: boolean;
    trainingList: TrainingItem[] | undefined;
    currentTraining: TrainingItem | null;
    allowedTrainigTypes: TrainingType[] | undefined;
    selectedDate: string;
    selectedType: string;
    exersiceFields: ExersiceField[];
    editTrainingMode: boolean;
    actualTrainings: TrainingItem[];
    updateMethod: boolean;
    isPastDay: boolean;
    selectedMonth: number;
    editExersiceMode: boolean;
};

const initialState: TrainingSliceType = {
    errorOnLoad: false,
    trainingList: [],
    currentTraining: null,
    allowedTrainigTypes: [],
    selectedDate: '',
    selectedType: '',
    exersiceFields: [initExersiceFields()],
    editTrainingMode: false,
    actualTrainings: [],
    updateMethod: false,
    isPastDay: false,
    selectedMonth: 0,
    editExersiceMode: false,
};

const trainingSlice = createSlice({
    name: 'triainingSlice',
    initialState,
    reducers: {
        setErrorOnLoad(state, action: PayloadAction<boolean>) {
            state.errorOnLoad = action.payload;
        },
        setTrainingList(state, action: PayloadAction<TrainingItem[] | undefined>) {
            state.trainingList = action.payload;
        },
        setAllowedTrainingTypes(state, action: PayloadAction<TrainingType[] | undefined>) {
            state.allowedTrainigTypes = action.payload;
        },

        setSelectedDate(state, action: PayloadAction<string>) {
            state.selectedDate = action.payload;
        },
        setSelectedType(state, action: PayloadAction<string>) {
            state.selectedType = action.payload;
        },
        addTraining(state, action: PayloadAction<TrainingItem>) {
            state.trainingList?.push(action.payload);
        },
        updateTrainingList(state, action: PayloadAction<TrainingItem>) {
            state.trainingList = state.trainingList?.map((training) => {
                if (training._id === action.payload._id) {
                    return action.payload;
                }
                return training;
            });
        },
        setExersiceFields(state, action: PayloadAction<Exersise[]>) {
            const fields: ExersiceField[] = action.payload.map((exersice) => {
                return {
                    ...exersice,
                    checked: false,
                };
            });
            state.exersiceFields = fields;
        },
        addExersiceField(state, _: PayloadAction<null>) {
            state.exersiceFields.push(initExersiceFields());
        },
        resetExersiceFields(state, _: PayloadAction<null>) {
            state.exersiceFields = [initExersiceFields()];
        },
        changeExersiceName(state, action: PayloadAction<{ ind: number; value: string }>) {
            const { ind, value } = action.payload;
            state.exersiceFields[ind].name = value;
        },
        changeExerciseApproaches(state, action: PayloadAction<{ ind: number; value: number }>) {
            const { ind, value } = action.payload;
            state.exersiceFields[ind].approaches = value;
        },
        changeExersiceWeight(state, action: PayloadAction<{ ind: number; value: number }>) {
            const { ind, value } = action.payload;
            state.exersiceFields[ind].weight = value;
        },
        changeExersiceReplays(state, action: PayloadAction<{ ind: number; value: number }>) {
            const { ind, value } = action.payload;
            state.exersiceFields[ind].replays = value;
        },
        setFieldChecked(state, action: PayloadAction<{ ind: number; value: boolean }>) {
            const { ind, value } = action.payload;
            state.exersiceFields[ind].checked = value;
        },
        deleteFields(state, _: PayloadAction<null>) {
            state.exersiceFields = state.exersiceFields.filter((exersice) => !exersice.checked);
            if (state.exersiceFields.length === 0) {
                state.exersiceFields = [initExersiceFields()];
            }
        },
        setEditTraningMode(state, action: PayloadAction<boolean>) {
            state.editTrainingMode = action.payload;
        },
        setActualTrainings(state, action: PayloadAction<TrainingItem[]>) {
            state.actualTrainings = action.payload;
        },
        setUpdateMethod(state, action: PayloadAction<boolean>) {
            state.updateMethod = action.payload;
        },
        setIsPastDay(state, action: PayloadAction<boolean>) {
            state.isPastDay = action.payload;
        },
        setCurrentTraininig(state, action: PayloadAction<TrainingItem | null | undefined>) {
            if (action.payload === undefined) {
                const dateArr = state.selectedDate.split('.');
                let currentDate: Date;
                let isoDate = '';
                if (dateArr.length === 1) {
                    currentDate = new Date();
                } else {
                    currentDate = new Date(+dateArr[2], +dateArr[1] - 1, +dateArr[0]);
                    const timezoneOffset = -180;
                    currentDate.setMinutes(currentDate.getMinutes() - timezoneOffset);
                    isoDate = currentDate.toISOString();
                }
                state.currentTraining = createTraining(isoDate, state.selectedType);
            } else {
                state.currentTraining = action.payload;
            }
        },
        setCurrentTraininigExersices(state, action: PayloadAction<Exersise[]>) {
            if (state.currentTraining) {
                state.currentTraining.exercises = action.payload;
            }
        },
        setCurrentTrainingDate(state, action: PayloadAction<string>) {
            if (action.payload) {
                const dateArr = action.payload.split('.');
                const currentDate = new Date(+dateArr[2], +dateArr[1] - 1, +dateArr[0]);
                const timezoneOffset = -180;
                currentDate.setMinutes(currentDate.getMinutes() - timezoneOffset);
                const isoDate = currentDate.toISOString();
                if (state.currentTraining) {
                    state.currentTraining.date = isoDate;
                }
            } else {
                if (state.currentTraining) {
                    state.currentTraining.date = '';
                }
            }
        },
        setCurrentTrainingImplementation(state, action: PayloadAction<boolean>) {
            if (state.currentTraining) {
                state.currentTraining.isImplementation = action.payload;
            }
        },
        setCurrentTrainingType(state, action: PayloadAction<string>) {
            if (state.currentTraining) {
                state.currentTraining.name = action.payload;
            }
        },
        setCurrentTrainingRepeat(state, action: PayloadAction<boolean>) {
            if (state.currentTraining?.parameters) {
                state.currentTraining.parameters.repeat = action.payload;
            }
        },
        setEditDisabledForTraining(state, action: PayloadAction<{ id: string }>) {
            state.trainingList = state.trainingList?.map((trainItem) => {
                if (trainItem._id === action.payload.id) {
                    trainItem.isImplementation = true;
                }
                return trainItem;
            });
        },
        setSelectedMonth(state, action: PayloadAction<number>) {
            state.selectedMonth = action.payload;
        },
        setEditExersiceMode(state, action: PayloadAction<boolean>) {
            state.editExersiceMode = action.payload;
        },
        setCurrentTrainingPeriod(state, action: PayloadAction<number | null>) {
            if (state.currentTraining && state.currentTraining.parameters) {
                state.currentTraining.parameters.period = action.payload;
            }
        },
    },
});

export default trainingSlice.reducer;
export const {
    setErrorOnLoad,
    setAllowedTrainingTypes,
    setTrainingList,
    setSelectedDate,
    setSelectedType,
    setExersiceFields,
    changeExersiceName,
    changeExerciseApproaches,
    changeExersiceReplays,
    changeExersiceWeight,
    addTraining,
    updateTrainingList,
    addExersiceField,
    resetExersiceFields,
    setEditTraningMode,
    setFieldChecked,
    deleteFields,
    setActualTrainings,
    setUpdateMethod,
    setIsPastDay,
    setCurrentTraininig,
    setCurrentTraininigExersices,
    setEditDisabledForTraining,
    setSelectedMonth,
    setEditExersiceMode,
    setCurrentTrainingPeriod,
    setCurrentTrainingDate,
    setCurrentTrainingImplementation,
    setCurrentTrainingRepeat,
    setCurrentTrainingType,
} = trainingSlice.actions;
