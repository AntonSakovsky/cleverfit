import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrainingPalDto, UserJointDto } from '@type/calendar/types';
import { JointTrainig } from '@type/invite/types';
import { TrainingRoutes } from '@type/TrainingPage/types';

const initialState = {
    modalPosX: 0,
    modalPosY: 0,
    modalVisible: false,
    alertText: '',
    route: 'trainings' as TrainingRoutes,
    searchString: '',
    jointTrainingList: [] as UserJointDto[],
    invitationTrainingType: '',
    invitationImg: '',
    invitationName: '',
    invitationUserId: '',
    currPartner: {} as TrainingPalDto,
    invitationsArr: [] as JointTrainig[],
    allDisabled: false,
    pendingUser: '',
    partnersArr: [] as TrainingPalDto[],
};

export type TrainingPageSliceType = typeof initialState;

const trainingPageSlice = createSlice({
    name: 'createTrainingSlice',
    initialState,
    reducers: {
        setModalPosX(state, action: PayloadAction<number>) {
            state.modalPosX = action.payload;
        },
        setModalPosY(state, action: PayloadAction<number>) {
            state.modalPosY = action.payload;
        },
        setModalVisible(state, action: PayloadAction<boolean>) {
            state.modalVisible = action.payload;
        },
        setAlertText(state, action: PayloadAction<string>) {
            state.alertText = action.payload;
        },
        setTrainingRoute(state, action: PayloadAction<TrainingRoutes>) {
            state.route = action.payload;
        },
        setSearchString(state, action: PayloadAction<string>) {
            state.searchString = action.payload;
        },
        setJointTriningList(state, action: PayloadAction<UserJointDto[]>) {
            state.jointTrainingList = action.payload;
        },
        setInvitationInfo(state, action: PayloadAction<{img: string, name: string, trainingType: string, id: string}>) {
            const {img, name, trainingType, id} = action.payload;
            state.invitationName = name;
            state.invitationImg = img;
            state.invitationTrainingType = trainingType;
            state.invitationUserId = id;
        },
        setCurrPartner(state, action: PayloadAction<TrainingPalDto>) {
            state.currPartner = action.payload;
        },
        setInvitations(state, action: PayloadAction<JointTrainig[]>) {
            state.invitationsArr = action.payload;
        },
        deleteInvitationInArr(state, action: PayloadAction<string>) {
            state.invitationsArr = state.invitationsArr.filter((invitation)=> invitation._id !== action.payload);
        },
        setAllDisabled(state, action: PayloadAction<boolean>) {
            state.allDisabled = action.payload;
        },
        setPendingUser(state, action: PayloadAction<string>) {
            state.pendingUser = action.payload;
        },
        setPartnersArr(state, action: PayloadAction<TrainingPalDto[]>) {
            state.partnersArr = action.payload;
        },
        addPartner(state, action: PayloadAction<TrainingPalDto>) {
            state.partnersArr.push(action.payload)
        },
        deletePartnersInArr(state, action: PayloadAction<string>) {
            state.partnersArr = state.partnersArr.filter((partner)=> partner.inviteId !== action.payload);
        },
    },
});

export default trainingPageSlice.reducer;
export const {
    setModalPosX,
    setModalPosY,
    setModalVisible,
    setAlertText,
    setTrainingRoute,
    setSearchString,
    setJointTriningList,
    setInvitationInfo,
    setCurrPartner,
    setInvitations,
    setAllDisabled,
    setPendingUser,
    deleteInvitationInArr,
    setPartnersArr,
    deletePartnersInArr,
} = trainingPageSlice.actions;
