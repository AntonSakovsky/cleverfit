import { TrainingItem } from '@type/calendar/types';
import { getWeekTrainingMapForMonth } from '@utils/achievements/getWeekTrainingMapForMonth';
import { FC } from 'react';
import { VerticalHistogram } from '../../VerticalHistogram/VerticalHistogram';
import { MonthStatistics } from '../MonthStatistics/MonthStatistics';
import style from './AveragePayloadMonth.module.css';

type AveragePayloadWeekProps = {
    trainingsByDay: TrainingItem[][];
};

export const AveragePayloadMonth: FC<AveragePayloadWeekProps> = ({ trainingsByDay }) => {
    const weekTrainingMap = getWeekTrainingMapForMonth(trainingsByDay);

    return (
        <div className={style.payloadContainerMonth}>
            <h5 className={style.title}>Средняя нагрузка по дням недели</h5>
            <VerticalHistogram trainingsByDay={trainingsByDay} />
            <MonthStatistics weekTrainingMap={weekTrainingMap} />
        </div>
    );
};
