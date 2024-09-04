import { Header } from "antd/lib/layout/layout";
import { FC, ReactNode } from "react";
import s from './SiteHeader.module.css'

type SiteHeaderProps = {
    children: ReactNode,
}

export const SiteHeader: FC<SiteHeaderProps> = ({children}) => {
    return(
        <Header className={s.header}>
            {children}
        </Header>
    )
}