import { TrainingItem } from '@type/calendar/types';
import { calculateApproaches } from '@utils/achievements/calculateApproaches';
import { calculatePayload } from '@utils/achievements/calculatePayload';
import { calculateReplays } from '@utils/achievements/calculateReplays';
import { FC } from 'react';
import { StatisticCard } from './StatisticCard/StatisticCard';
import style from './StatisticCardList.module.css';
import { AchievementPeriod } from '@type/achievements/types';

type StatisticCardListProps = {
    trainingsByDay: TrainingItem[][],
    period: AchievementPeriod,
};

export const StatisticCardList: FC<StatisticCardListProps> = ({ period, trainingsByDay }) => {
    const payload = calculatePayload(trainingsByDay);
    const days = period === 'week' ? 7 : 28;
    const payloadPerDday = (payload / days).toFixed(1);

    const replays = calculateReplays(trainingsByDay);
    const approaches = calculateApproaches(trainingsByDay);

    return (
        <div className={style.list}>
            <StatisticCard value={payload} description={['Общая', 'нагрузка, кг']} />
            <StatisticCard
                value={Number(payloadPerDday)}
                description={['Нагрузка', 'в день, кг']}
            />
            <StatisticCard value={replays} description={['Количество', 'повторений, раз']} />
            <StatisticCard value={approaches} description={['Подходы,', 'раз']} />
        </div>
    );
};
