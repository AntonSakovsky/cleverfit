import { namesOfDay } from '@constants/constants';
import { TrainingItem } from '@type/calendar/types';
import { FC } from 'react';
import { VerticalHistogram } from '../../VerticalHistogram/VerticalHistogram';
import { DaysStatistics } from '../DaysStatistics/DaysStatistics';
import { StatItem } from '../StatItem/StatItem';
import style from './AveragePayloadWeek.module.css';

type AveragePayloadWeekProps = {
    trainingsByDay: TrainingItem[][];
};

export const AveragePayloadWeek: FC<AveragePayloadWeekProps> = ({ trainingsByDay }) => {
    const statItems = trainingsByDay.map((trainingArr, ind) => {
        let payload = undefined;
        if (trainingArr && trainingArr.length) {
            let sum = 0;

            for (let i = 0; i < trainingArr.length; i++) {
                if (trainingArr[i].exercises.length !== 0) {
                    sum +=
                        trainingArr[i].exercises.reduce(
                            (acc, exersice) =>
                                acc + exersice.approaches * exersice.weight * exersice.replays,
                            0,
                        ) / trainingArr[i].exercises.length;
                }
            }
            payload = sum;
        }
        return (
            <StatItem
                key={ind}
                index={ind + 1}
                text={namesOfDay[ind]}
                value={payload !== undefined ? `${payload} кг` : undefined}
                indexContainercolor='blue'
            />
        );
    });
    return (
        <div className={style.payloadContainerWeek}>
            <VerticalHistogram trainingsByDay={trainingsByDay} />
            <DaysStatistics statData={statItems} title='Средняя нагрузка по дням недели' />
        </div>
    );
};
