import { ActionButton } from "@components/ActionButton/ActionButton";
import Title from "antd/lib/typography/Title";
import { FC, ReactNode } from "react";
import s from './ResultCard.module.css';

type IResultCard = {
    title: string,
    message: string | string[],
    textBtn: string,
    clickHandler: () => void,
    icon?: ReactNode,
    image?: ReactNode,
    dataTestBtnId?: string,
    btnStretch: boolean
}

export const ResultCard: FC<IResultCard> = ({ clickHandler, message, textBtn, title, icon, btnStretch, image, dataTestBtnId }) => {
    return (
        <div className={s.body}>
            <div className={s.imgWrap}>
                {icon && icon}
                {image && image}
            </div>
            <div className={s.textBlock}>
                <Title level={3} className={s.title}>{title}</Title>
                <p className={s.message}>{(typeof message === 'object') ?
                    message.map((mes, ind) => <span key={ind}>{mes}</span>)
                    :
                    message}</p>
            </div>
            <ActionButton htmlType="button" isAlt={false} text={textBtn} type="primary" fontSize={14} stretch={btnStretch} onClick={clickHandler} dataTestId={dataTestBtnId}/>
        </div>
    )
}