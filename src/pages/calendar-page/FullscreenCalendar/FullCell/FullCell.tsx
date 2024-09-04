import { indicatorColors } from "@constants/constants";
import { ColoredTrainType } from "@pages/calendar-page/ColoredTrainType/ColoredTrainType";
import { TrainingItem } from "@type/calendar/types";
import cn from 'classnames';
import moment, { Moment } from "moment";
import { FC, MouseEvent } from "react";
import style from './FullCell.module.css';

type FullCellProps = {
    date: Moment,
    list: TrainingItem[],
    cellClickHandler: (e: MouseEvent, date: Moment) => void,
}

export const FullCell: FC<FullCellProps> = ({ date, list, cellClickHandler }) => {
    const today = date.date() === moment().date() && date.month() === moment().month();

    const clickHandler = (e: MouseEvent) => {
        cellClickHandler(e, date);
    }

    return (
        <div className={cn(style.fullcell, { [style.active]: today })} onClick={clickHandler}>
            <div className={cn(style.container, { [style.active]: today }, { [style.inactive]: !today })}>
                <div className={cn(style.date, { [style.active]: today })}>{date.date()}</div>
                <div
                    className={style.content}
                >
                    {
                        list.map((trainingItem, ind) => {
                            const currDate = date.toDate().toLocaleDateString('ru-Ru');
                            const trainDate = new Date(trainingItem.date).toLocaleDateString('ru-Ru');
                            if (currDate === trainDate) {
                                return <ColoredTrainType disabled={trainingItem.isImplementation}
                                    key={ind}
                                    text={trainingItem.name}
                                    color={indicatorColors[trainingItem.name]}
                                    smallTextSize={true} />

                            }
                            return null;
                        })
                    }
                </div>
            </div>
        </div>
    )
}