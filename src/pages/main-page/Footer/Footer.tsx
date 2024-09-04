import { routes } from "@constants/constants";
import { FC } from "react";
import { Link } from "react-router-dom";
import { DownloadCard } from "./DownloadCard/DownloadCard";
import s from './Footer.module.css';

interface IFooterProps {}

export const MainFooter: FC<IFooterProps> = ()=> {
    
    return(
        <>
        <div className={s.container}>
            <Link to={routes.FEEDBACKS} className={s.feedbacks} data-test-id='see-reviews'>Смотреть отзывы</Link>
            <DownloadCard />
        </div>
        </>
        
    )
}