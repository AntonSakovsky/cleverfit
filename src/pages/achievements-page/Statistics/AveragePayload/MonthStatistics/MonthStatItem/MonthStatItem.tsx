import { UpOutlined } from '@ant-design/icons';
import { TrainingItem } from '@type/calendar/types';
import cn from 'classnames';
import moment from 'moment';
import { FC, useEffect, useRef, useState } from 'react';
import { StatItem } from '../../StatItem/StatItem';
import style from './MonthStatItem.module.css';

type MonthStatItemProps = {
    date: string;
    trainingsByDay: TrainingItem[][];
};

export const MonthStatItem: FC<MonthStatItemProps> = ({ date, trainingsByDay }) => {
    const [collapsed, setCollapsed] = useState(true);
    const [arrowVisible, setArrowVisible] = useState(false);
    const statsRef = useRef<HTMLDivElement>(null);

    const [firstDay, secondDay] = date.split('-');
    const [startDay, startMonth] = firstDay.split('.');
    const [endDay, endMonth] = secondDay.split('.');
    const weekPeriod = `${startDay}.${startMonth}-${endDay}.${endMonth}`;
    const trainDate = moment(firstDay, 'DD.MM.YYYY').subtract(1, 'day');

    const toggleCollapse = () => setCollapsed((prev) => !prev);

    useEffect(() => {
        const onResize = () => {
            const width = window.innerWidth;
            if (width <= 461) {
                setArrowVisible(true);
            } else {
                setArrowVisible(false);
            }
        };
        onResize();
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);
    return (
        <div className={style.weekItem}>
            <div className={style.header}>
                <p className={style.period}>Неделя {weekPeriod}</p>
                {arrowVisible && (
                    <div className={style.arrowWrap} onClick={toggleCollapse}>
                        <UpOutlined className={cn(style.arrow, { [style.reversed]: !collapsed })} />
                    </div>
                )}
            </div>
            <div
                className={style.statsWrap}
                style={{
                    height: arrowVisible
                        ? collapsed
                            ? 0
                            : Number(statsRef.current?.offsetHeight) + 20
                        : 'auto',
                }}
            >
                <div className={style.stats} ref={statsRef}>
                    {trainingsByDay.map((trainingArr, ind) => {
                        let payload = undefined;
                        if (trainingArr && trainingArr.length) {
                            let sum = 0;

                            for (let i = 0; i < trainingArr.length; i++) {
                                if (trainingArr[i].exercises.length !== 0) {
                                    sum +=
                                        trainingArr[i].exercises.reduce(
                                            (acc, exersice) =>
                                                acc +
                                                exersice.approaches *
                                                    exersice.weight *
                                                    exersice.replays,
                                            0,
                                        ) / trainingArr[i].exercises.length;
                                }
                            }
                            payload = sum;
                        }
                        return (
                            <StatItem
                                key={ind}
                                index={ind + 1}
                                text={trainDate.add(1, 'day').format('DD.MM.YYYY')}
                                value={payload !== undefined ? `${payload} кг` : undefined}
                                indexContainercolor='blue'
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
