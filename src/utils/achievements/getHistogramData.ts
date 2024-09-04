import { AchievementPeriod } from '@type/achievements/types';
import { TrainingItem } from '@type/calendar/types';
import moment from 'moment';

type HistogramData = {
    date: string;
    value: number;
};

export const getHistogramData = (trainingsByDay: TrainingItem[][], period: AchievementPeriod) => {
    const startDay = moment().subtract(period === 'week' ? 7 : 28, 'day');
    if (period === 'month') {
        if (startDay.day() !== 1) {
            const addedDays = 7 - (startDay.day() % 7);
            startDay.add(addedDays, 'day');
        }
    }

    let data: HistogramData[] = [];
    const daysCount = period === 'week' ? 7 : 28;

    let daysTrainingMap = new Map<string, TrainingItem[]>();
    for (let i = 0; i < daysCount; i++) {
        startDay.add(1, 'day');
        const mapKey = `${startDay.format('DD.MM.YYYY')}`;
        daysTrainingMap.set(mapKey, []);
        trainingsByDay.forEach((trainingArr) => {
            if (trainingArr.length !== 0) {
                for (const training of trainingArr) {
                    const trainingDate = moment(training.date, moment.ISO_8601);
                    if (trainingDate.isSame(startDay, 'day')) {
                        let trainArr = daysTrainingMap.get(mapKey) as TrainingItem[];
                        trainArr.push(training);
                        daysTrainingMap.set(mapKey, trainArr);
                    }
                }
            }
        });
    }

    const daysTrainingArr = Array.from(daysTrainingMap);
    startDay.subtract(daysCount, 'day');
    daysTrainingArr.forEach((trainItem) => {
        const trainingArr = trainItem[1];
        let payload = 0;
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

        data.push({
            date: startDay.add(1, 'day').format('DD.MM'),
            value: payload,
        });
    });

    return data;
};
