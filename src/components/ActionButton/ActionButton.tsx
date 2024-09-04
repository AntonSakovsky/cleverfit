import { Button } from "antd";
import cn from 'classnames';
import { FC, ReactNode } from "react";
import s from './ActionButton.module.css';

type IActionButtonProps = {
    type: "primary" | "default",
    icon?: ReactNode,
    text: string,
    isAlt?: boolean,
    htmlType: 'submit' | 'button' | 'reset',
    disabled?: boolean,
    fontSize?: number,
    stretch?: boolean,
    dataTestId?: string,
    onClick?: () => void,
}

export const ActionButton: FC<IActionButtonProps> = ({ type, icon, text, isAlt, onClick, htmlType, disabled, fontSize = 16, stretch=false, dataTestId }) => {
    return (
        <div className={s.btnWrap}>
            <Button
                type={type}
                icon={icon && icon}
                htmlType={htmlType}
                disabled={disabled}
                style={{ fontSize }}
                className={cn(s.actionButton, { [s.mainLoginBtn]: !isAlt }, { [s.altLoginBtn]: isAlt }, {[s.stretch]: stretch})}
                data-test-id={dataTestId}
                onClick={onClick}
            >{text}</Button>
        </div>

    )
}