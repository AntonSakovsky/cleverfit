import { SiteHeader } from "@components/header/SiteHeader";
import { routes } from "@constants/constants";
import { Breadcrumb } from "antd";
import { Route } from "antd/lib/breadcrumb/Breadcrumb";
import { FC } from "react";
import { Link } from "react-router-dom";

type FeedbackHeaderProps = {}

export const FeedbackHeader: FC<FeedbackHeaderProps> = ({}) => {
    const itemRender = (route: Route, params:any, items: Route[], paths: string[])=>{
        return <Link to={route.path}>{route.breadcrumbName}</Link>
    }
    const breadcrumbRoutes: Route[] = [
        {
            breadcrumbName: 'Главная',
            path: routes.MAIN
        },
        {
            breadcrumbName: 'Отзывы пользователей',
            path: routes.FEEDBACKS
        }
    ]

    return(
        <SiteHeader>
            <Breadcrumb routes={breadcrumbRoutes} itemRender={itemRender} />
        </SiteHeader>
    )
}