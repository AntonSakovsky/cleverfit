import { SiteHeader } from '@components/header/SiteHeader';
import { SettingButton } from '@components/settingButton/SettingButton';
import { routes } from '@constants/constants';
import { Breadcrumb, Typography } from 'antd';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import s from './Header.module.css';

const { Title } = Typography;

export const MainHeader = () => {
    const itemRender = (route: Route, params: any, items: Route[], paths: string[]) => {
        return <Link to={route.path}>{route.breadcrumbName}</Link>;
    };
    const rt: Route[] = [
        {
            breadcrumbName: 'Главная',
            path: routes.MAIN,
        },
    ];
    return (
        <SiteHeader>
            <Breadcrumb itemRender={itemRender} routes={rt} />
            <div className={s.contentWrap}>
                <div className={s.headingLeft}>
                    <Title className={cn(s.headerTitle, s.h1)} level={1}>
                        Приветствуем тебя в CleverFit — приложении, <br /> которое поможет тебе
                        добиться своей мечты!
                    </Title>
                    <Title className={cn(s.headerTitle, s.h3)} level={3}>
                        Приветствуем тебя в CleverFit — приложении, <br /> которое поможет тебе
                        добиться своей мечты!
                    </Title>
                    <Title className={cn(s.headerTitle, s.h4)} level={4}>
                        Приветствуем тебя в CleverFit — приложении, <br /> которое поможет тебе
                        добиться своей мечты!
                    </Title>
                </div>
                <SettingButton />
            </div>
        </SiteHeader>
    );
};
