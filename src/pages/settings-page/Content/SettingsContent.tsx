import { BuyTariffInfoModal } from '@components/modals/BuyTariffInfoModal/BuyTariffInfoModal';
import { TarifDrawer } from '@components/modals/TarifDrawer/TarifDrawer';
import { LS_TOKEN, routes } from '@constants/constants';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { resetProfileData } from '@redux/reducers/ProfileSlice';
import { setAccessToken } from '@redux/reducers/UserSlice';
import { LocalStorage } from '@utils/localStorage/localStorage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SettingsFooter } from '../Footer/SettingsFooter';
import { Settings } from './ContentSetting/Settings';
import style from './SettingsContent.module.css';
import { TarifList } from './Tarifs/TarifList';

export const SettingsContent = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    const moreInfoClickHandler = () => {
        setDrawerVisible(true);
    };

    const buyTariffClickHandler = () => {
        setModalOpen(true);
    };

    const closeModalHandler = () => {
        LocalStorage.remove(LS_TOKEN);
        dispatch(setAccessToken(''));
        dispatch(resetProfileData(null));
        navigate(routes.AUTH);
    };

    const closeDrawerHandler = () => setDrawerVisible(false);

    return (
        <>
            <BuyTariffInfoModal open={modalOpen} closeHandler={closeModalHandler} />
            <div className={style.content}>
                <h4 className={style.title}>Мой тариф</h4>
                <div className={style.settingsContent}>
                    <TarifList
                        extraClickHandler={moreInfoClickHandler}
                        actionClickHandler={moreInfoClickHandler}
                    />
                    <Settings />
                    <SettingsFooter />
                </div>
                <TarifDrawer
                    open={drawerVisible}
                    submitAction={buyTariffClickHandler}
                    closeHandler={closeDrawerHandler}
                />
            </div>
        </>
    );
};
