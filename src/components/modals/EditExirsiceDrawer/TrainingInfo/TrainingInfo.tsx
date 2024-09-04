import { indicatorColors } from '@constants/constants';
import { FC } from 'react';
import style from './TrainingInfo.module.css';

type TrainingInfoProps = {
    type: string;
    date: string;
};

export const TrainingInfo: FC<TrainingInfoProps> = ({ type, date }) => {
    return (
        <div className={style.trainInfo}>
            <div className={style.type}>
                <div
                    className={style.indicator}
                    style={{ backgroundColor: indicatorColors[type] }}
                ></div>
                <p className={style.text}>{type}</p>
            </div>
            <div className={style.date}>{date}</div>
        </div>
    );
};
