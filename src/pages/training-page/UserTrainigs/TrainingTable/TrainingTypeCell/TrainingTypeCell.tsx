import { DownOutlined } from '@ant-design/icons';
import { indicatorColors } from '@constants/constants';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { ColoredTrainType } from '@pages/calendar-page/ColoredTrainType/ColoredTrainType';
import { setModalPosX, setModalPosY, setModalVisible } from '@redux/reducers/TrainingPageSlice';
import { setCurrentTraininig, setSelectedType } from '@redux/reducers/TrainingSlice';
import { TrainingItem } from '@type/calendar/types';
import { FC, MouseEvent } from 'react';
import style from './TrainingTypeCell.module.css';

type TrainingTypeCellProps = {
    training: TrainingItem;
};

export const TrainingTypeCell: FC<TrainingTypeCellProps> = ({ training }) => {
    const dispatch = useAppDispatch();

    const onIconClick = () => {
        dispatch(setSelectedType(training.name));
        dispatch(setModalVisible(true));
        dispatch(setCurrentTraininig(training));
    };

    const onClick = (e: MouseEvent<HTMLDivElement>) => {
        const clickedElem = e.currentTarget as HTMLDivElement;
        const { left, top } = clickedElem.getBoundingClientRect();
        dispatch(setModalPosX(left));
        dispatch(setModalPosY(top));
    };

    return (
        <div className={style.typeCell} onClick={onClick}>
            <ColoredTrainType
                color={indicatorColors[training.name]}
                smallTextSize={false}
                text={training.name}
            />
            <div className={style.iconWrap} onClick={onIconClick}>
                <DownOutlined style={{ color: '#262626', fontSize: 10 }} />
            </div>
        </div>
    );
};
