import { TrainingItem } from "@type/calendar/types";

export const calculateApproaches = (list: TrainingItem[][]) => {
    let approaches = 0;
    list.forEach((trainingArr) => {
        if (trainingArr && trainingArr.length) {
            for (let i = 0; i < trainingArr.length; i++) {
                if(trainingArr[i].exercises.length !== 0){
                    approaches += trainingArr[i].exercises.reduce(
                        (acc, exersice) => acc + exersice.approaches,
                        0,
                    );
                }
                
            }
        }
    });

    return approaches;
};