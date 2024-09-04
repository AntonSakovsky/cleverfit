import { useLazyGetTariffListQuery } from '@api/catalogApi/catalogApi';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setAvailableTariffs } from '@redux/reducers/TariffSlice';
import { useEffect } from 'react';
import { SettingsContent } from './Content/SettingsContent';
import { SettingsHeader } from './Header/SettingsHeader';

export const SettingsPage = () => {
    const dispatch = useAppDispatch();
    const [getTariffList] = useLazyGetTariffListQuery();

    useEffect(() => {
        const fetchTariffList = async () => {
            try {
                const response = await getTariffList(null, false).unwrap();
                dispatch(setAvailableTariffs(response));
            } catch (error) {}
        };
        fetchTariffList();
    }, []);

    return (
        <>
            <SettingsHeader />
            <SettingsContent />
        </>
    );
};
