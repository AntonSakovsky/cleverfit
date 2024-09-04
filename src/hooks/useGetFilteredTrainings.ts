import { achievementsSelector, trainingSelector } from "@redux/selectors";
import { TrainingItem } from "@type/calendar/types";
import { filterByType } from "@utils/filters/filterByType";
import { filterTrainingsByPeriod } from "@utils/filters/filterTrainingsByDate";
import { useAppSelector } from "./typed-react-redux-hooks";

export const useGetFilteredTrainings = ()=> {
    const { trainingList } = useAppSelector(trainingSelector);
    const { filter, period } = useAppSelector(achievementsSelector);

    let trainings = filterTrainingsByPeriod(trainingList as TrainingItem[], period);
    trainings = filterByType(trainings, filter);
    return trainings;
}