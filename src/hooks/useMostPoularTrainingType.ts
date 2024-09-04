import { trainingSelector } from '@redux/selectors';
import { Exersise } from '@type/calendar/types';
import { useEffect, useState } from 'react';
import { useAppSelector } from './typed-react-redux-hooks';

export const useMostPopularTrainingType = () => {
    const { allowedTrainigTypes, trainingList } = useAppSelector(trainingSelector);
    const [trainType, setTrainType] = useState<string>('');

    useEffect(() => {
        if (allowedTrainigTypes && trainingList) {
            let trainingType = '';
            let maxPayload = 0;
            for (const type of allowedTrainigTypes) {
                for (const training of trainingList) {
                    if (training.name === type.name) {
                        if (training.exercises.length !== 0) {
                            const sum = training.exercises.reduce(
                                (acc: number, exersice: Exersise) =>
                                    acc + exersice.approaches * exersice.replays * exersice.weight,
                                0,
                            );
                            if (sum > maxPayload) {
                                maxPayload = sum;
                                trainingType = type.key;
                            }
                        }
                    }
                }
            }
            setTrainType(trainingType);
        }
    }, [trainingList]);

    return trainType;
};
