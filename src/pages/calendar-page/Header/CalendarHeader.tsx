import { SiteHeader } from "@components/header/SiteHeader";
import { SettingButton } from "@components/settingButton/SettingButton";
import { routes } from "@constants/constants";
import Breadcrumb, { Route } from "antd/lib/breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";
import style from './CalendarHeader.module.css';

export const CalendarHeader = () => {
    const itemRender = (route: Route, params: any, items: Route[], paths: string[]) => {
        return <Link to={route.path}>{route.breadcrumbName}</Link>
    }
    const breadcrumbRoutes: Route[] = [
        {
            breadcrumbName: 'Главная',
            path: routes.MAIN,
        },
        {
            breadcrumbName: 'Календарь',
            path: routes.CALENDAR,
        },
    ]
    return (
        <SiteHeader>
            <div className={style.headerContainer}>
                <Breadcrumb itemRender={itemRender} routes={breadcrumbRoutes} />
                <SettingButton />
            </div>

        </SiteHeader>
    )
}