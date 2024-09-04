import { SettingOutlined } from '@ant-design/icons';
import { routes } from '@constants/constants';
import { Button } from 'antd';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './SettingButton.module.css';

export const SettingButton = () => {
    const [width, setWidth] = useState(window.innerHeight);
    const navigate = useNavigate();
    const location = useLocation();

    const clickHandler = () => {
        navigate(routes.SETTINGS, {
            state: {
                from: location.pathname,
            },
        });
    };

    useEffect(() => {
        const onResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    });
    return (
        <div className={style.wrap}>
            {width > 561 ? (
                <Button
                    type='link'
                    icon={<SettingOutlined />}
                    className={cn(style.btnLarge)}
                    data-test-id='header-settings'
                    onClick={clickHandler}
                >
                    Настройки
                </Button>
            ) : (
                <Button
                    type='link'
                    icon={<SettingOutlined />}
                    className={cn(style.btnSmall)}
                    data-test-id='header-settings'
                    onClick={clickHandler}
                ></Button>
            )}
        </div>
    );
};
