import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setFilter } from '@redux/reducers/AchievementsSlice';
import { achievementsSelector, trainingSelector } from '@redux/selectors';
import { TrainingType } from '@type/calendar/types';
import { Button } from 'antd';
import cn from 'classnames';
import { FC } from 'react';
import style from './TrainingTypesFilter.module.css';

type TrainingTypesFilterProps = {};

export const TrainingTypesFilter: FC<TrainingTypesFilterProps> = ({}) => {
    const dispatch = useAppDispatch();
    const { allowedTrainigTypes } = useAppSelector(trainingSelector);
    const { filter } = useAppSelector(achievementsSelector);
    const changeFilter = (filter: TrainingType) => {
        dispatch(setFilter(filter));
    };

    return (
        <div className={style.filterContainer}>
            <p className={style.text}>Тип тренировки :</p>
            <div className={style.filters}>
                <Button
                    type='default'
                    className={cn(style.btn, { [style.active]: filter.name === 'Все' })}
                    onClick={() => changeFilter({ name: 'Все', key: 'all' })}
                >
                    Все
                </Button>

                {allowedTrainigTypes &&
                    allowedTrainigTypes.map((type) => (
                        <Button
                            type='default'
                            className={cn(style.btn, { [style.active]: filter.name === type.name })}
                            onClick={() => changeFilter(type)}
                            key={type.key}
                        >
                            {type.name}
                        </Button>
                    ))}
            </div>
        </div>
    );
};
