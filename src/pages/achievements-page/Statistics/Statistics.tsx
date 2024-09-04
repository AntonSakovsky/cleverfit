import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useGetFilteredTrainings } from '@hooks/useGetFilteredTrainings';
import { setPeriod } from '@redux/reducers/AchievementsSlice';
import { AchievementPeriod } from '@type/achievements/types';
import { createTrainingsArrByDayWeek } from '@utils/achievements/createTrainingsArrByDayWeek';
import { FC, useEffect } from 'react';
import { AveragePayload } from './AveragePayload/AveragePayload';
import { EmptyTrainings } from './EmptyTrainings/EmptyTrainings';
import { MostPopularExersices } from './MostPopularExersices/MostPopularExersices';
import { MostPopularTrainings } from './MostPopularTrainings/MostPopularTrainings';
import { StatisticCardList } from './StatisticCardList/StatisticCardList';
import style from './Statistics.module.css';
import { TrainingTypesFilter } from './TrainingTypesFilter/TrainingTypesFilter';

type StatisticsProps = {
    period: AchievementPeriod;
};

export const Statistics: FC<StatisticsProps> = ({ period }) => {
    const dispatch = useAppDispatch();

    const trainings = useGetFilteredTrainings();
    const trainingsByDay = createTrainingsArrByDayWeek(trainings);

    useEffect(() => {
        dispatch(setPeriod(period));
    }, [period]);

    return (
        <div className={style.statisticsWrap}>
            <TrainingTypesFilter />
            {trainings.length === 0 ? (
                <EmptyTrainings period={period} />
            ) : (
                <>
                    <AveragePayload period={period} trainingsByDay={trainingsByDay} />
                    <StatisticCardList period={period} trainingsByDay={trainingsByDay} />
                    <MostPopularTrainings trainingsByDay={trainingsByDay} />
                    <MostPopularExersices period={period} trainingsByDay={trainingsByDay} />
                </>
            )}
        </div>
    );
};
