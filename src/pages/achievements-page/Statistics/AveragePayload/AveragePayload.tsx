import { AchievementPeriod } from '@type/achievements/types';
import { TrainingItem } from '@type/calendar/types';
import { FC } from 'react';
import { AveragePayloadMonth } from './AveragePayloadMonth/AveragePayloadMonth';
import { AveragePayloadWeek } from './AveragePayloadWeek/AveragePayloadWeek';

type AveragePayloadProps = {
    period: AchievementPeriod;
    trainingsByDay: TrainingItem[][];
};

export const AveragePayload: FC<AveragePayloadProps> = ({ period, trainingsByDay }) => {
    return (
        <div>
            {period === 'week' && <AveragePayloadWeek trainingsByDay={trainingsByDay} />}
            {period === 'month' && <AveragePayloadMonth trainingsByDay={trainingsByDay} />}
        </div>
    );
};
