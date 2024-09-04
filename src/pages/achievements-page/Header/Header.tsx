import { SiteHeader } from "@components/header/SiteHeader";
import { SettingButton } from "@components/settingButton/SettingButton";
import { routes } from "@constants/constants";
import Breadcrumb, { Route } from "antd/lib/breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";
import style from './Header.module.css';

export const Header = () => {
    const itemRender = (route: Route) => {
        return <Link to={route.path}>{route.breadcrumbName}</Link>;
    };
    const breadcrumbRoutes: Route[] = [
        {
            breadcrumbName: 'Главная',
            path: routes.MAIN,
        },
        {
            breadcrumbName: 'Достижения',
            path: routes.ACHIEVEMENTS,
        },
    ];
    return (
        <SiteHeader>
            <div className={style.headerContainer}>
                <div className={style.breadCrumbContainer}>
                    <Breadcrumb itemRender={itemRender} routes={breadcrumbRoutes} />
                </div>

                <SettingButton />
            </div>
        </SiteHeader>
    );
}