import { TrainingItem } from "@type/calendar/types";
import cn from 'classnames';
import moment, { Moment } from "moment";
import { FC, MouseEvent } from "react";
import style from './SmallCell.module.css';

type SmallCellProps = {
    date: Moment,
    list: TrainingItem[],
    cellClickHandler: (e: MouseEvent, date: Moment) => void,
}

export const SmallCell: FC<SmallCellProps> = ({ date, list, cellClickHandler }) => {
    const active = date.date() === moment().date() && date.month() === moment().month();
    const hasTrainings = list.some(trainingItem => new Date(trainingItem.date).toLocaleDateString('ru-Ru') === date.toDate().toLocaleDateString('ru-Ru'));


    const clickHandler = (e: MouseEvent) => {
        cellClickHandler(e, date);
    }
    return (
        <div className={cn(style.cell, { [style.active]: active }, { [style.withTrainings]: hasTrainings })}
            onClick={clickHandler}>
            {date.date()}
        </div>

    )
}