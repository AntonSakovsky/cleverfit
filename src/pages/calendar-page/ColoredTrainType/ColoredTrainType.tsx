import cn from 'classnames';
import { FC } from "react";
import style from './ColoredTrainType.module.css';

type ColoredTrainTypeProps = {
    text: string,
    color: string,
    disabled?: boolean,
    smallTextSize: boolean
}

export const ColoredTrainType: FC<ColoredTrainTypeProps> = ({ text, color, smallTextSize, disabled = false }) => {
    return (
        <div className={style.type}>
            <div className={style.indicator} style={{ backgroundColor: color }}></div>
            <div className={cn(style.text, { [style.small]: smallTextSize }, { [style.normal]: !smallTextSize }, { [style.disabled]: disabled })} >{text}</div>
        </div>
    )
}