import { FC, ReactNode } from "react";
import s from './WhiteBoard.module.css';


interface IWhiteBoardProps {
    children: ReactNode,
}

export const WhiteBoard: FC<IWhiteBoardProps> = ({ children }) => {
    return (
        <div className={s.whiteBoard}>
            <div className={s.body}>
                {children}
            </div>

        </div>
    )
}