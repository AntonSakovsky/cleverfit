import { Button, Divider } from "antd";
import { FC } from "react";
import s from './ActionCard.module.css';

interface IActionCardProps {
    icon: JSX.Element,
    textButton: string,
    textBody: string,
    dataTestId?: string,
    onClick?: ()=>void
}

export const ActionCard: FC<IActionCardProps> = ({ icon, textButton, textBody, dataTestId, onClick }) => {
    return (
        <div className={s.card}>
            <div className={s.contentWrap}>
                <div className={s.body}>
                    {textBody}
                </div>
                <Divider type="horizontal" style={{ margin: 0 }} />
                <div className={s.action}>
                    <Button type="link" 
                    icon={icon} 
                    data-test-id={dataTestId}
                    onClick={onClick}>{textButton}</Button>
                </div>

            </div>

        </div>
    )
}