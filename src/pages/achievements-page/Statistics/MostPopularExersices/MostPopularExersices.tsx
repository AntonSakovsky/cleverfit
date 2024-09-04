import { namesOfDay } from '@constants/constants';
import { AchievementPeriod } from '@type/achievements/types';
import { TrainingItem } from '@type/calendar/types';
import { findMostPopularExersice } from '@utils/achievements/findMostPopularExersice';
import { FC } from 'react';
import { DaysStatistics } from '../AveragePayload/DaysStatistics/DaysStatistics';
import { StatItem } from '../AveragePayload/StatItem/StatItem';
import style from './MostPopularExersices.module.css';
import { RingDiagram } from './RingDiagram/RingDiagram';

type MostPopularExersicesProps = {
    period: AchievementPeriod;
    trainingsByDay: TrainingItem[][];
};

export const MostPopularExersices: FC<MostPopularExersicesProps> = ({ period, trainingsByDay }) => {
    const exersices = new Map<string, number>();
    trainingsByDay.forEach((trainingsArr) => {
        if (trainingsArr.length !== 0) {
            for (const training of trainingsArr) {
                for (const exersice of training.exercises) {
                    if (exersices.has(exersice.name)) {
                        const value = Number(exersices.get(exersice.name));
                        exersices.set(exersice.name, value + 1);
                    } else {
                        exersices.set(exersice.name, 1);
                    }
                }
            }
        }
    });

    const exercisesArr = Array.from(exersices);

    const statItems = trainingsByDay.map((_, ind) => {
        const mostpopularTraining = findMostPopularExersice(trainingsByDay.slice(ind, ind + 1));
        return (
            <StatItem
                key={ind}
                index={ind + 1}
                text={namesOfDay[ind]}
                value={mostpopularTraining ? `${mostpopularTraining}` : undefined}
                indexContainercolor='red'
            />
        );
    });

    return (
        <div className={style.container}>
            <RingDiagram exercises={exercisesArr} />
            <DaysStatistics
                title={`Самые частые  упражнения по дням недели ${
                    period === 'month' ? 'за месяц' : ''
                }`}
                statData={statItems}
            />
        </div>
    );
};
