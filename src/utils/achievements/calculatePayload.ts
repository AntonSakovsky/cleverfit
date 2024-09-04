import { TrainingItem } from '@type/calendar/types';

export const calculatePayload = (list: TrainingItem[][]) => {
    let payload = 0;
    list.forEach((trainingArr) => {
        if (trainingArr && trainingArr.length) {
            let sum = 0;
            for (let i = 0; i < trainingArr.length; i++) {
                if (trainingArr[i].exercises.length !== 0) {
                    sum += trainingArr[i].exercises.reduce(
                        (acc, exersice) =>
                            acc + exersice.approaches * exersice.weight * exersice.replays,
                        0,
                    );
                }
            }
            payload += sum;
        }
    });
    return payload;
};
