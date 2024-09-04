import { useAppSelector } from "@hooks/typed-react-redux-hooks";
import { TrainingItem } from "@type/calendar/types";
import { Calendar } from "antd";
import { Moment } from "moment";
import { FC, MouseEvent } from "react";
import { FullCell } from "./FullCell/FullCell";
import style from './FullscreenCalendar.module.css';
import { trainingSelector } from "@redux/selectors";

type FullscreenCalendarProps = {
    onCellSelect: (date: Moment) => void,
    cellClickHandler: (e: MouseEvent, date: Moment) => void
}

export const FullscreenCalendar: FC<FullscreenCalendarProps> = ({ onCellSelect, cellClickHandler }) => {
    const { trainingList } = useAppSelector(trainingSelector);

    const renderDateFullCell = (date: moment.Moment) => {
        return <FullCell
            date={date}
            list={trainingList as TrainingItem[]}
            cellClickHandler={cellClickHandler}
        />
    };

    return (
        <Calendar className={style.calendar}
            dateFullCellRender={renderDateFullCell}
            onSelect={onCellSelect}

        />
    )
}