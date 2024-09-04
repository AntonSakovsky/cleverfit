import { SettingOutlined } from '@ant-design/icons';
import { SiteHeader } from '@components/header/SiteHeader';
import { routes } from '@constants/constants';
import { Button } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './ProfileHeader.module.css';

type ProfileHeaderProps = {};

export const ProfileHeader: FC<ProfileHeaderProps> = ({}) => {
    const navigate = useNavigate();
    const clickHandler = () => {
        navigate(routes.SETTINGS);
    };
    return (
        <SiteHeader>
            <div className={style.headerContainer}>
                <h4 className={style.pageName}>Профиль</h4>
                <Button
                    className={style.settingsBtn}
                    type='default'
                    icon={<SettingOutlined />}
                    onClick={clickHandler}
                    data-test-id='header-settings'
                >
                    Настройки
                </Button>
            </div>
        </SiteHeader>
    );
};
