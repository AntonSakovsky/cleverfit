import { TrainingItem } from '@type/calendar/types';
import moment from 'moment';

export const getWeekTrainingMapForMonth = (trainingsByDay: TrainingItem[][]) => {
    const weekTrainingMap = new Map<string, TrainingItem[]>();
    for (let i = 0; i < 4; i++) {
        const startDay = moment().subtract(4 - i, 'week');
        const endDay = moment().subtract(4 - i - 1, 'week');
        if (startDay.day() !== 1) {
            const addedDays = 7 - (startDay.day() % 7);
            startDay.add(addedDays + 1, 'day');
            endDay.add(addedDays, 'day');
        }
        const mapKey = `${startDay.format('DD.MM.YYYY')}-${endDay.format('DD.MM.YYYY')}`;
        weekTrainingMap.set(mapKey, []);
        trainingsByDay.forEach((trainingArr) => {
            if (trainingArr.length !== 0) {
                for (const training of trainingArr) {
                    const trainingDate = moment(training.date, moment.ISO_8601);
                    if (
                        trainingDate.isSameOrAfter(startDay, 'day') &&
                        trainingDate.isSameOrBefore(endDay, 'day')
                    ) {
                        let trainArr = weekTrainingMap.get(mapKey) as TrainingItem[];
                        trainArr.push(training);
                        weekTrainingMap.set(mapKey, trainArr);
                    }
                }
            }
        });
    }
    return weekTrainingMap;
};
