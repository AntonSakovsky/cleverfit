import { TrainingItem } from "@type/calendar/types";
import { filterByDayOfWeek } from "@utils/filters/filterByDayOfWeek";

export const createTrainingsArrByDayWeek = (list: TrainingItem[])=> {

    const array: TrainingItem[][] = [];

    for (let i = 0; i < 7; i++) {
        if (i % 7 < 6) {
            array.push(filterByDayOfWeek(list, i % 7 + 1));
        } else {
            array.push(filterByDayOfWeek(list, 0));
        }
    }
    return array;

}