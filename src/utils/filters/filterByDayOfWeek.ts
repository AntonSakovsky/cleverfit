import { TrainingItem } from "@type/calendar/types";
import moment from "moment";

export const filterByDayOfWeek = (trainingList: TrainingItem[], dayOfWeek: number) => {
    return trainingList.filter(
        (training) => moment(training.date, moment.ISO_8601).day() === dayOfWeek,
    );
}