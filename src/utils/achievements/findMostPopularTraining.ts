import { TrainingItem, TrainingType } from "@type/calendar/types";

export const findMostPopularTraining = (trainings: TrainingItem[][], allowedTypes: TrainingType[])=> {
    const trainingfrequence = allowedTypes?.map((type) => {
        let amount = 0;
        trainings.forEach((trainingArr) => {
            if (trainingArr.length !== 0) {
                for (const training of trainingArr) {
                    if (training.name === type.name) {
                        amount++;
                    }
                }
            }
        });

        return {
            traingType: type.name,
            amount,
        };
    });

    const mostPopularTraining = trainingfrequence.length ? trainingfrequence?.reduce((mostPopularItem, currItem) => {
        if (currItem.amount > mostPopularItem.amount) {
            return currItem;
          } else {
            return mostPopularItem;
          }
    }) : {traingType: ''};
    return mostPopularTraining.traingType;
}