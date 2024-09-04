import { useUpdateUserMutation } from '@api/userApi/userApi';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setReadyForJoin, setSendNotification } from '@redux/reducers/SettingsSlice';
import { UpdateUserDto } from '@type/user/types';
import { SettingItem } from './SettingItem/SettingItem';
import style from './Settings.module.css';

export const Settings = () => {
    const { tariff: userTariff } = useAppSelector((state) => state.user);
    const { readyForJoin, darkTheme, sendNotification } = useAppSelector((state) => state.settings);
    const availableTariffs = useAppSelector((state) => state.tariff.availableTariffs);
    const proIsActive = Boolean(availableTariffs.find((tariff) => tariff._id === userTariff?.tariffId));

    const [updateUser] = useUpdateUserMutation();
    const dispatch = useAppDispatch();

    const updateUserJointTraining = async (checked: boolean) => {
        const updateUserDto: UpdateUserDto = {
            readyForJointTraining: checked,
        };
        dispatch(setReadyForJoin(checked));
        try {
            updateUser(updateUserDto).unwrap();
        } catch (error) {
            dispatch(setReadyForJoin(!checked));
        }
    };

    const updateSendNotification = async (checked: boolean) => {
        const updateUserDto: UpdateUserDto = {
            sendNotification: checked,
        };
        dispatch(setSendNotification(checked));
        try {
            await updateUser(updateUserDto).unwrap();
        } catch (error) {
            dispatch(setSendNotification(!checked));
        }
    };

    const settingsItems = [
        {
            text: 'Открыт для совместных тренировок',
            hintText: 'включеная функция позволит участвовать в совместных тренировках',
            hintWidth: 200,
            disabled: false,
            checked: readyForJoin,
            dataTestIdSwitch: 'tariff-trainings',
            dataTestIdIcon: 'tariff-trainings-icon',
            switchHandler: updateUserJointTraining,
        },
        {
            text: 'Уведомления',
            hintText: 'включеная функция позволит получать уведомления об активностях',
            hintWidth: 220,
            disabled: false,
            checked: sendNotification,
            dataTestIdSwitch: 'tariff-notifications',
            dataTestIdIcon: 'tariff-notifications-icon',
            switchHandler: updateSendNotification,
        },
        {
            text: 'Тёмная тема',
            hintText: 'темная тема доступна для PRO tarif',
            hintWidth: 110,
            disabled: !proIsActive,
            checked: darkTheme,
            dataTestIdSwitch: 'tariff-theme',
            dataTestIdIcon: 'tariff-theme-icon',
            switchHandler: console.log,
        },
    ];

    return (
        <div className={style.settingsContainer}>
            {settingsItems.map((item) => (
                <SettingItem
                    key={item.text}
                    text={item.text}
                    hintText={item.hintText}
                    hintStyle={{ width: item.hintWidth }}
                    switchHandler={item.switchHandler}
                    disabled={item.disabled}
                    checked={item.checked}
                    dataTestIdSwitch={item.dataTestIdSwitch}
                    dataTestIdIcon={item.dataTestIdIcon}
                />
            ))}
        </div>
    );
};
