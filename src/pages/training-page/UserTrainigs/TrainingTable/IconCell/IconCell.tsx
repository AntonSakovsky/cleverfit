import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setCurrentTraininig, setIsPastDay } from '@redux/reducers/TrainingSlice';
import { TrainingItem } from '@type/calendar/types';
import { Button } from 'antd';
import { FC, ReactNode } from 'react';
import style from './IconCell.module.css';

type IconCellProps = {
    icon: ReactNode;
    training: TrainingItem;
    dataTestId?: string;
    onClick: () => void;
};

export const IconCell: FC<IconCellProps> = ({ icon, training, dataTestId, onClick }) => {
    const dispatch = useAppDispatch();
    const clickHandler = () => {
        dispatch(setCurrentTraininig(training));
        const currDate = new Date().toLocaleDateString('ru-Ru');
        const currTrainDate = new Date(training?.date as string).toLocaleDateString('ru-Ru');
        dispatch(setIsPastDay(currDate === currTrainDate));
        onClick();
    };

    return (
        <div className={style.iconCell}>
            <Button
                className={style.btn}
                icon={icon}
                disabled={training.isImplementation}
                onClick={clickHandler}
                data-test-id={dataTestId}
            ></Button>
        </div>
    );
};
