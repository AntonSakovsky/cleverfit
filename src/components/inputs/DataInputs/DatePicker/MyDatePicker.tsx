import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setCurrentTrainingDate } from '@redux/reducers/TrainingSlice';
import { DatePicker } from 'antd';
import ruRu from 'antd/es/date-picker/locale/ru_RU';
import cn from 'classnames';
import moment, { Moment } from 'moment';
import { FC } from 'react';
import style from './MyDatePicker.module.css';
import { trainingSelector } from '@redux/selectors';

const format = 'DD.MM.YYYY';

type MyDatePickerProps = {
    date?: Moment;
};

export const MyDatePicker: FC<MyDatePickerProps> = ({ date }) => {
    const { trainingList } = useAppSelector(trainingSelector);
    const dispatch = useAppDispatch();

    const dateInputChange = (_: Moment | null, dateString: string) => {
        dispatch(setCurrentTrainingDate(dateString));
    };
    const dateRender = (currentDate: Moment) => {
        const hasTraining = trainingList?.some(
            (trainingItem) =>
                new Date(trainingItem.date).toLocaleDateString('ru-Ru') ===
                currentDate.toDate().toLocaleDateString('ru-Ru'),
        );

        return <div className={cn({ [style.hasTraining]: hasTraining })}>{currentDate.date()}</div>;
    };
    const disabledDate = (current: Moment) => {
        return current && current.startOf('day') <= moment().startOf('day');
    };

    return (
        <DatePicker
            className={style.datePicker}
            format={format}
            locale={ruRu}
            value={date}
            onChange={dateInputChange}
            dateRender={dateRender}
            disabledDate={disabledDate}
            data-test-id='modal-drawer-right-date-picker'
        />
    );
};
