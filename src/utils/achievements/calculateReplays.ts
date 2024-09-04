import { TrainingItem } from '@type/calendar/types';

export const calculateReplays = (list: TrainingItem[][]) => {
    let replays = 0;
    list.forEach((trainingArr) => {
        if (trainingArr && trainingArr.length) {
            for (let i = 0; i < trainingArr.length; i++) {
                if (trainingArr[i].exercises.length !== 0) {
                    replays += trainingArr[i].exercises.reduce(
                        (acc, exersice) => acc + exersice.replays,
                        0,
                    );
                }
            }
        }
    });

    return replays;
};
