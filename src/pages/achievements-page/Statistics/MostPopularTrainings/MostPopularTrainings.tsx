import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { achievementsSelector, trainingSelector } from '@redux/selectors';
import { TrainingItem, TrainingType } from '@type/calendar/types';
import { findMostPopularExersice } from '@utils/achievements/findMostPopularExersice';
import { findMostPopularTraining } from '@utils/achievements/findMostPopularTraining';
import { FC } from 'react';
import style from './MostPopularTrainings.module.css';

type MostPopularTrainingsProps = {
    trainingsByDay: TrainingItem[][];
};

export const MostPopularTrainings: FC<MostPopularTrainingsProps> = ({ trainingsByDay }) => {
    const { filter } = useAppSelector(achievementsSelector);
    const { allowedTrainigTypes } = useAppSelector(trainingSelector);

    const mostPopularTraining =
        filter.key === 'all'
            ? findMostPopularTraining(trainingsByDay, allowedTrainigTypes as TrainingType[])
            : '';
    const mostPopularExersice = findMostPopularExersice(trainingsByDay);

    return (
        <div className={style.container}>
            {filter.key === 'all' && (
                <div className={style.itemWrap}>
                    <div className={style.statName}>
                        <p>Самая частая</p>
                        <p>тренировка</p>
                    </div>
                    <h3 className={style.value}>{mostPopularTraining}</h3>
                </div>
            )}
            <div className={style.itemWrap}>
                <div className={style.statName}>
                    <p>Самое частое</p>
                    <p>упражнеие</p>
                </div>
                <h3 className={style.value}>{mostPopularExersice}</h3>
            </div>
        </div>
    );
};
