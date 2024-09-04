import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setCurrentTrainingType, setSelectedType } from '@redux/reducers/TrainingSlice';
import { Select } from 'antd';
import { FC, useEffect } from 'react';
import { SelectOptions } from '../EditExersiceDrawer';
import style from './TrainingTypeSelect.module.css';
import { trainingSelector } from '@redux/selectors';

type TrainingTypeSelectProps = {
    options: SelectOptions[];
};

export const TrainingTypeSelect: FC<TrainingTypeSelectProps> = ({ options }) => {
    const dispatch = useAppDispatch();
    const { currentTraining, editTrainingMode } = useAppSelector(trainingSelector);

    const onSelect = (_: SelectOptions, selectObj: SelectOptions) => {
        dispatch(setCurrentTrainingType(selectObj.label));
    };

    const defaultValue = options.find((option) => option.label === currentTraining?.name);

    useEffect(() => {
        return () => {
            dispatch(setSelectedType(''));
        };
    }, []);

    return (
        <div className={style.wrapper}>
            <Select
                className={style.select}
                value={defaultValue}
                placeholder={defaultValue ? '' : 'Выбор типа тренировки'}
                options={options}
                onSelect={onSelect}
                disabled={editTrainingMode}
                data-test-id='modal-create-exercise-select'
            />
        </div>
    );
};
