import { FC } from "react";
import s from './DownloadCard.module.css'
import { AndroidFilled, AppleFilled } from "@ant-design/icons";
import { Button, Divider } from "antd";

interface IDownloadCardProps {}

export const DownloadCard: FC<IDownloadCardProps> = () => {
    return (
        <div className={s.card}>
            <div className={s.body}>
                <a href="#" className={s.primaryLink}>Скачать на телефон</a>
                <p className={s.note}>Доступно в PRO-тарифе</p>
            </div>
            <Divider type="horizontal" style={{ margin: 0 }} />
            <div className={s.action}>
                <Button type="link" icon={<AndroidFilled style={{color: 'black'}} />}>Android OS</Button>
                <Button type="link" icon={<AppleFilled style={{color: 'black'}}  />}>Apple IOS</Button>
            </div>
        </div>
    )
}