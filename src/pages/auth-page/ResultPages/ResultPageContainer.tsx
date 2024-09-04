import { FC, ReactNode } from "react";
import s from './ResultPageContainer.module.css';

type IResultPageContainerProps = {
    children: ReactNode
}

export const ResultPageContainer: FC<IResultPageContainerProps> = ({children})=>{
    return(
        <div className={s.container}>
            <div className={s.blur}>
                {children}
            </div>
        </div>
    )
}

