import { useLazyGetTariffListQuery } from '@api/catalogApi/catalogApi';
import { useLazyGetInvitesQuery } from '@api/inviteApi/inviteApi';
import { useLazyGetUserInfoQuery } from '@api/userApi/userApi';
import { Loader } from '@components/loader/Loader';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Sidebar } from '@pages/main-page/Sidebar/Sidebar';
import { setProfileData } from '@redux/reducers/ProfileSlice';
import { setSettingsData, SettingsPageState } from '@redux/reducers/SettingsSlice';
import { setAvailableTariffs } from '@redux/reducers/TariffSlice';
import { setInvitations } from '@redux/reducers/TrainingPageSlice';
import { setUserInfo } from '@redux/reducers/UserSlice';
import { Layout } from 'antd';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import s from './AppLayout.module.css';

export const AppLayout = () => {
    const loading = useAppSelector((state) => state.loader.loading);
    const dispatch = useAppDispatch();
    const [userMe] = useLazyGetUserInfoQuery();
    const [getTariffList] = useLazyGetTariffListQuery();
    const [getInvitations] = useLazyGetInvitesQuery();

    useEffect(() => {
        const fetchTariffList = async () => {
            try {
                const response = await getTariffList(null).unwrap();
                dispatch(setAvailableTariffs(response));
            } catch (error: any) {
            }
        };

        fetchTariffList();   
        
    }, []);

    useEffect(() => {
        const fetchUserInfo = async () => {

            try {
                const response = await userMe(null).unwrap();
                dispatch(setUserInfo(response));
                dispatch(setProfileData(response));
                const settingsData: SettingsPageState = {
                    darkTheme: response.darkTheme as boolean,
                    readyForJoin: response.readyForJointTraining,
                    sendNotification: response.sendNotification,
                };
                dispatch(setSettingsData(settingsData));
            } catch (error) {
            }
        };
        fetchUserInfo();
    }, []);

    useEffect(()=> {
        const fetchInvitations = async ()=> {
            try {
                const response = await getInvitations(null, false).unwrap();
                dispatch(setInvitations(response.invitations))
            } catch (error) {
                
            }
        }
        fetchInvitations();
    }, [])

    return (
        <>
            {loading && <Loader />}
            <div className={s.mainPageContainer}>
                <Layout className={s.mainLayout}>
                    <Sidebar />
                    <Layout
                    className={s.contentLayout}
                    >
                        <Outlet />
                    </Layout>
                </Layout>
            </div>
        </>
    );
};
