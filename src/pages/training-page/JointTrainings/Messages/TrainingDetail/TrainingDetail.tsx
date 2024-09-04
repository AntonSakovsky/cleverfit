import { CloseOutlined } from '@ant-design/icons';
import { indicatorColors } from '@constants/constants';
import { Exersise } from '@type/calendar/types';
import cn from 'classnames';
import { FC, MouseEvent } from 'react';
import style from './TrainingDetail.module.css';

type TrainingDetailProps = {
    type: string;
    period: string;
    date: string;
    exersices: Exersise[];
    toTop?: boolean;
    onClose: (e: MouseEvent) => void;
};

export const TrainingDetail: FC<TrainingDetailProps> = ({
    date,
    exersices,
    period,
    type,
    toTop,
    onClose,
}) => {
    const trainingDate = new Date(date).toLocaleDateString('ru-Ru');

    let periodText = '';
    switch (+period) {
        case 1:
            periodText = `Через 1 день`;
            break;
        case 2:
        case 3:
        case 4:
            periodText = `Через ${period} дня`;
            break;
        case 5:
        case 6:
            periodText = `Через ${period} дней`;
            break;
        default:
            periodText = `1 раз в неделю`;
            break;
    }

    return (
        <div
            className={cn(style.modal, { [style.toTop]: toTop })}
            data-test-id='joint-training-review-card'
        >
            <div className={style.header}>
                <div className={style.trainingType}>
                    <div
                        className={style.indicator}
                        style={{ backgroundColor: indicatorColors[type] }}
                    ></div>
                    <div className={style.trainType}>{type}</div>
                </div>
                <div className={style.closeIcon} onClick={onClose}>
                    <CloseOutlined style={{ fontSize: 14 }} />
                </div>
            </div>
            <div className={style.trainInfo}>
                <div className={style.timeBlock}>
                    <div className={style.period}>{periodText}</div>
                    <div className={style.date}>{trainingDate}</div>
                </div>
                <div className={style.exersices}>
                    {exersices.map((exersice) => {
                        const info = `${exersice.approaches} x (${
                            exersice.weight !== 0 ? exersice.weight + ' кг' : exersice.replays
                        })`;

                        return (
                            <div className={style.exersice} key={info}>
                                <p className={style.exersiceName}>{exersice.name}</p>
                                <p className={style.exersiceInfo}>{info}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
