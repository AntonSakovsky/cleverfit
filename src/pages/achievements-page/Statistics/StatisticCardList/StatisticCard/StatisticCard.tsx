import { FC } from 'react';
import style from './StatisticCard.module.css';

type StatisticCardProps = {
    value: number;
    description: string[];
};

export const StatisticCard: FC<StatisticCardProps> = ({ value, description }) => {
    return (
        <div className={style.card}>
            <h1 className={style.statValue}>{value}</h1>
            <div className={style.textWrap}>
                {description.map((text) => (
                    <p className={style.statDescription} key={text}>
                        {text}
                    </p>
                ))}
            </div>
        </div>
    );
};
