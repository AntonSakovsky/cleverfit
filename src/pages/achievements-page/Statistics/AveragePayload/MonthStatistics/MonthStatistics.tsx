import { TrainingItem } from '@type/calendar/types';
import { createTrainingsArrByDayWeek } from '@utils/achievements/createTrainingsArrByDayWeek';
import { FC } from 'react';
import style from './MonthStatistics.module.css';
import { MonthStatItem } from './MonthStatItem/MonthStatItem';

type MonthStatisticsProps = {
    weekTrainingMap: Map<string, TrainingItem[]>;
};

export const MonthStatistics: FC<MonthStatisticsProps> = ({ weekTrainingMap }) => {
    const renderList = () => {
        const weekTrainingarray = Array.from(weekTrainingMap);
        return weekTrainingarray.map((item, ind) => {
            return (
                <MonthStatItem
                    date={item[0]}
                    trainingsByDay={createTrainingsArrByDayWeek(item[1])}
                    key={ind}
                />
            );
        });
    };
    return (
        <div className={style.container}>
            <div className={style.dataList}>{renderList()}</div>
        </div>
    );
};
