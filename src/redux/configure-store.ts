import { authApi } from '@api/authApi/authApi';
import { catalogApi } from '@api/catalogApi/catalogApi';
import { feedbackApi } from '@api/feedbackApi/feedbackApi';
import { tariffApi } from '@api/tariffApi/tariffApi';
import { trainingApi } from '@api/trainingApi/trainingApi';
import { userApi } from '@api/userApi/userApi';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import feedbackReducer from './reducers/FeedbackSlice';
import loaderReducer from './reducers/LoaderSlice';
import profileReducer from './reducers/ProfileSlice';
import settingsReducer from './reducers/SettingsSlice';
import tariffReducer from './reducers/TariffSlice';
import trainingReducer from './reducers/TrainingSlice';
import userReducer from './reducers/UserSlice';
import trainingPageReducer from './reducers/TrainingPageSlice';
import achievementsReducer from './reducers/AchievementsSlice';
import { inviteApi } from '@api/inviteApi/inviteApi';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

const rootReducer = combineReducers({
    router: routerReducer,
    user: userReducer,
    feedbacks: feedbackReducer,
    training: trainingReducer,
    loader: loaderReducer,
    tariff: tariffReducer,
    profile: profileReducer,
    settings: settingsReducer,
    trainingPage: trainingPageReducer,
    achievements: achievementsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    [trainingApi.reducerPath]: trainingApi.reducer,
    [tariffApi.reducerPath]: tariffApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [catalogApi.reducerPath]: catalogApi.reducer,
    [inviteApi.reducerPath]: inviteApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(routerMiddleware)
            .concat(authApi.middleware)
            .concat(feedbackApi.middleware)
            .concat(trainingApi.middleware)
            .concat(userApi.middleware)
            .concat(catalogApi.middleware)
            .concat(tariffApi.middleware)
            .concat(inviteApi.middleware)
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
