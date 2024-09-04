import { TrainingItem } from "@type/calendar/types";

export const findMostPopularExersice = (trainings: TrainingItem[][])=> {
    const exersices = new Map<string, number>();
    trainings.forEach((trainingsArr) => {
        if(trainingsArr.length !== 0){
            for (const training of trainingsArr) {
                for (const exersice of training.exercises) {
                    if(exersices.has(exersice.name)){
                        const value = Number(exersices.get(exersice.name));
                        exersices.set(exersice.name, value + 1);
                    } else {
                        exersices.set(exersice.name, 1);
                    }
                }
            }
        }
    });

    const exercisesArr = Array.from(exersices);
    const mostPopularExersice =exercisesArr.length ? exercisesArr.reduce((popularItem, currItem)=> {
        if(currItem[1] > popularItem[1]){
            return currItem
        }else {
            return popularItem
        }
    }) : ['']

    return mostPopularExersice[0]
}