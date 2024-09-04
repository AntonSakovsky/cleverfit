import { FC, ReactNode } from 'react';
import style from './DaysStatistics.module.css';

type DaysStatisticsProps = {
    title: string;
    statData: ReactNode;
};

export const DaysStatistics: FC<DaysStatisticsProps> = ({ title, statData }) => {
    return (
        <div className={style.container}>
            <div className={style.title}>
                <p>{title}</p>
            </div>
            <div className={style.data}>{statData}</div>
        </div>
    );
};
