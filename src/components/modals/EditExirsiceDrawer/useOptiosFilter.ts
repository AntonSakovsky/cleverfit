import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { SelectOptions } from './EditExersiceDrawer';
import { TrainingItem } from '@type/calendar/types';
import { trainingSelector } from '@redux/selectors';

const ru = 'ru-Ru';

export const useOptionsFilter = (options: SelectOptions[]) => {
    const { trainingList, currentTraining, editTrainingMode } = useAppSelector(trainingSelector);
    if (!editTrainingMode) {
        options = options.filter(
            (option) =>
                !trainingList?.some(
                    (training) =>
                        training.name === option.label &&
                        new Date(training.date).toLocaleDateString(ru) ===
                            new Date((currentTraining as TrainingItem)?.date).toLocaleDateString(
                                ru,
                            ),
                ),
        );
    }

    return options;
};
