import { AchievementPeriod } from '@type/achievements/types';
import { TrainingItem } from '@type/calendar/types';
import moment, { Moment } from 'moment';

export const filterTrainingsByPeriod = (
    trainingList: TrainingItem[],
    period: AchievementPeriod,
) => {
    let today = moment();
    let startDay: Moment;

    if (period === 'week') {
        startDay = moment().subtract(6, 'day');
    }

    if (period === 'month') {
        startDay = moment().subtract(4, 'week');
        if (startDay.day() !== 1) {
            const addedDays = 7 - (startDay.day() % 7);
            startDay.add(addedDays, 'day');
            today.add(addedDays, 'day');
        }
    }

    const trainings = trainingList?.filter(
        (training) =>
            moment(training.date, moment.ISO_8601).isSameOrAfter(startDay, 'day') &&
            moment(training.date, moment.ISO_8601).isSameOrBefore(today, 'day'),
    );
    return trainings;
};
