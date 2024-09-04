import { RootState } from "./configure-store";


export const trainingPageSelector = (state: RootState) => state.trainingPage;
export const trainingSelector = (state: RootState) => state.training;
export const achievementsSelector = (state: RootState) => state.achievements;