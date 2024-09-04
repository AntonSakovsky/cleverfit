import { FC, ReactNode } from "react";
import cn from 'classnames';
import s from './ResultPanel.module.css';

type IResultPanelProps = {
    children: ReactNode,
    needSmallPaddings?: boolean
}

export const ResultPanel: FC<IResultPanelProps> = ({children, needSmallPaddings})=>{
    return(
        <div className={cn(s.resultPanel, {[s.smallPaddings]: needSmallPaddings})}>
            { children }
        </div>
    )
}