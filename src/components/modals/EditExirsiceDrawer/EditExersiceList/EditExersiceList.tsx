import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setEditExersiceMode, setExersiceFields } from '@redux/reducers/TrainingSlice';
import { ExersiceField } from '@type/calendar/types';
import { FC, useEffect } from 'react';
import { EditTrainingItem } from '../EditTrainingItem/EditTrainingItem';
import style from './EditExerciseList.module.css';
import { trainingSelector } from '@redux/selectors';

type EditTrainingListProps = {
    list: ExersiceField[];
};

export const EditExersiceList: FC<EditTrainingListProps> = ({ list }) => {
    const dispatch = useAppDispatch();
    const { currentTraining, editExersiceMode } = useAppSelector(trainingSelector);
    let exersices = currentTraining?.exercises;
    useEffect(() => {
        if (exersices && exersices.length !== 0) {
            if (!editExersiceMode) {
                dispatch(setExersiceFields(exersices));
                dispatch(setEditExersiceMode(true));
            }
        }
    }, []);

    return (
        <div className={style.list}>
            {list.length !== 0 ? (
                list.map((exersice, ind) => (
                    <EditTrainingItem key={ind} ind={ind} exersice={exersice} />
                ))
            ) : (
                <EditTrainingItem key={0} ind={0} exersice={null} />
            )}
        </div>
    );
};
