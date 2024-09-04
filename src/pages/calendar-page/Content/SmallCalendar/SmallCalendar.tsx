import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks";
import { TrainingItem } from "@type/calendar/types";
import { Calendar } from "antd";
import { CalendarMode } from "antd/lib/calendar/generateCalendar";
import { Moment } from "moment";
import { FC, MouseEvent, useEffect } from "react";
import { SmallCalendarHeader } from "./Header/SmallCalendarHeader";
import style from './SmallCalendar.module.css';
import { SmallCell } from "./SmallCell/SmallCell";
import { setSelectedMonth } from "@redux/reducers/TrainingSlice";
import { trainingSelector } from "@redux/selectors";

type HeaderRenderProps = {
    value: Moment,
    type: CalendarMode,
    onChange: (date: Moment) => void,
    onTypeChange: (type: CalendarMode) => void
}

type SmallCalendarProps = {
    onCellSelect: (date: Moment) => void,
    cellClickHandler: (e: MouseEvent, date: Moment) => void
}

export const SmallCalendar: FC<SmallCalendarProps> = ({ onCellSelect, cellClickHandler }) => {
    const { trainingList } = useAppSelector(trainingSelector);
    const dispatch = useAppDispatch();

    const headerRender = ({ value, type, onChange, onTypeChange }: HeaderRenderProps) => {
        return (
            <SmallCalendarHeader value={value}
                type={type}
                onChange={onChange}
                onTypeChange={onTypeChange}
            />
        )

    }

    const fullCellRender = (date: Moment) => {
        return <SmallCell date={date}
            list={trainingList as TrainingItem[]}
            cellClickHandler={cellClickHandler}
        />
    }

    const onPanelChange = (date: Moment, _: CalendarMode)=>{
        dispatch(setSelectedMonth(date.month()));
    }

    useEffect(()=>{
        dispatch(setSelectedMonth(new Date().getMonth()))
    }, []);

    return (
        <div className={style.smallCalendarContainer}>
            <Calendar
                className={style.calendar}
                fullscreen={false}
                onPanelChange={onPanelChange}
                dateFullCellRender={fullCellRender}
                headerRender={headerRender}
                onSelect={onCellSelect} />
        </div>
    )
}