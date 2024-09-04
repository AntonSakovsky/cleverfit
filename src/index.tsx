import { routes } from '@constants/constants';
import { ChangePasswordPage } from '@pages/auth-page/ChangePasswordPage/ChangePasswordPage';
import { ConfirmEmailPage } from '@pages/auth-page/ConfirmEmailPage/ConfirmEmailPage';
import { ErrorChangePasswordPage } from '@pages/auth-page/ResultPages/ErrorChangePasswordPage/ErrorChangePasswordPage';
import { ErrorCheckEmailPage } from '@pages/auth-page/ResultPages/ErrorCheckEmailPage/ErrorCheckEmailPage';
import { ErrorEmailPage } from '@pages/auth-page/ResultPages/ErrorEmailPage/ErrorEmailPage';
import { ErrorLoginPage } from '@pages/auth-page/ResultPages/ErrorLoginPage/ErrorLoginPage';
import { ErrorUserExist } from '@pages/auth-page/ResultPages/ErrorUserExist/ErrorUserExist';
import { ResultErrorPage } from '@pages/auth-page/ResultPages/ResultErrorPage/ResultErrorPage';
import { SuccessChangePasswordPage } from '@pages/auth-page/ResultPages/SuccessChangePasswordPage/SuccessChangePasswordPage';
import { SuccessPage } from '@pages/auth-page/ResultPages/SuccessPage/SuccessPage';
import { CalendarPage } from '@pages/calendar-page/CalendarPage';
import { FeedbackPage } from '@pages/feedback-page/FeedbackPage';
import { AppLayout } from '@pages/layout/AppLayout';
import { history, store } from '@redux/configure-store';
import 'antd/dist/antd.css';
import 'normalize.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { HistoryRouter } from "redux-first-history/rr6";
import { AllowedPathProtection } from './hoc/AllowedPathProtection';
import { AuthNotRequired } from './hoc/AuthNotRequired';
import { AuthRequired } from './hoc/AuthRequired';
import { RedirectToMain } from './hoc/RedirectToMain';
import './index.css';
import { LoginPage, MainPage, RegistrationPage } from './pages';
import { ProfilePage } from '@pages/profile-page/ProfilePage';
import { NotFound } from '@pages/not-found-page/NotFound';
import { SettingsPage } from '@pages/settings-page/SettingsPage';
import { TrainingPage } from '@pages/training-page/TrainingPage';
import { AchievementsPage } from '@pages/achievements-page/AchievementsPage';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <Provider store={store}>
        <HistoryRouter history={history} >
            <Routes>
                <Route path='' element={<AppLayout />}>
                    <Route path='/' element={
                        <RedirectToMain />
                    } />
                    <Route path={routes.MAIN} element={<AuthRequired>
                        <MainPage />
                    </AuthRequired>} />
                    <Route path={routes.FEEDBACKS} element={<AuthRequired>
                        <FeedbackPage />
                    </AuthRequired>} />
                    <Route path={routes.CALENDAR} element={<AuthRequired>
                        <CalendarPage />
                    </AuthRequired>} />
                    <Route path={routes.PROFILE} element={<AuthRequired>
                        <ProfilePage />
                    </AuthRequired>} />
                    <Route path={routes.SETTINGS} element={<AuthRequired>
                        <SettingsPage />
                    </AuthRequired>} />
                    <Route path={routes.TRAINING} element={<AuthRequired>
                        <TrainingPage />
                    </AuthRequired>} />
                    <Route path={routes.ACHIEVEMENTS} element={<AuthRequired>
                        <AchievementsPage  />
                    </AuthRequired>} />
                    <Route path={routes.NOT_FOUND} element={<NotFound />}/> 
                </Route>

                <Route path={routes.AUTH}>
                    <Route index element={<AuthNotRequired>
                        <LoginPage />
                    </AuthNotRequired>} />
                    <Route path={routes.REGISTRATION} element={<AuthNotRequired>
                        <RegistrationPage />
                    </AuthNotRequired>} />
                    <Route path={routes.CONFIRM_EMAIL} element={<AllowedPathProtection allowedFromPaths={["/auth"]}>
                        <ConfirmEmailPage />
                    </AllowedPathProtection>} />
                    <Route path={routes.CHANGE_PASSWORD} element={<AllowedPathProtection allowedFromPaths={['/auth/confirm-email', '/result/error-change-password']}>
                        <ChangePasswordPage />
                    </AllowedPathProtection>} />
                </Route>

                <Route path={routes.RESULT}>
                    <Route path={routes.RESULT_ERROR} element={<AllowedPathProtection allowedFromPaths={['/auth/registration']}>
                        <ResultErrorPage />
                    </AllowedPathProtection>} />
                    <Route path={routes.ERROR_LOGIN} element={<AllowedPathProtection allowedFromPaths={["/auth"]}>
                        <ErrorLoginPage />
                    </AllowedPathProtection>} />
                    <Route path={routes.ERROR_USER_EXIST} element={<AllowedPathProtection allowedFromPaths={['/auth/registration']}>
                        <ErrorUserExist />
                    </AllowedPathProtection>} />
                    <Route path={routes.RESULT_SUCCESS} element={<AllowedPathProtection allowedFromPaths={['/auth/registration']}>
                        <SuccessPage />
                    </AllowedPathProtection>} />
                    <Route path={routes.ERROR_EMAIL_NO_EXIST} element={<AllowedPathProtection allowedFromPaths={["/auth"]}>
                        <ErrorEmailPage />
                    </AllowedPathProtection>} />
                    <Route path={routes.ERROR_CHECK_EMAIL} element={<AllowedPathProtection allowedFromPaths={["/auth"]}>
                        <ErrorCheckEmailPage />
                    </AllowedPathProtection>} />
                    <Route path={routes.ERROR_CHANGE_PASSWORD} element={<AllowedPathProtection allowedFromPaths={['/auth/change-password']}>
                        <ErrorChangePasswordPage />
                    </AllowedPathProtection>} />
                    <Route path={routes.SUCCESS_CHANGE_PASSWORD} element={<AllowedPathProtection allowedFromPaths={['/auth/change-password']}>
                        <SuccessChangePasswordPage />
                    </AllowedPathProtection>} />
                </Route>
            </Routes>
        </HistoryRouter>
    </Provider>
);
