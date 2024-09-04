import { ArrowLeftOutlined } from '@ant-design/icons';
import { SiteHeader } from '@components/header/SiteHeader';
import { history } from '@redux/configure-store';
import { Button } from 'antd';
import style from './SettingsHeader.module.css';

export const SettingsHeader = () => {
    const clickHandler = () => {
        history.back();
    };

    return (
        <SiteHeader>
            <Button
                type='default'
                icon={<ArrowLeftOutlined />}
                className={style.button}
                onClick={clickHandler}
                data-test-id='settings-back'
            >
                Настройки
            </Button>
        </SiteHeader>
    );
};
