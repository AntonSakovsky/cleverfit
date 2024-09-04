import { FC } from 'react';
import cn from 'classnames';
import style from './StatItem.module.css';

type StatItemProps = {
    indexContainercolor: 'red' | 'blue';
    text: string;
    index: number;
    value?: string;
};

export const StatItem: FC<StatItemProps> = ({ index, text, value, indexContainercolor }) => {
    return (
        <div className={style.stat}>
            <div
                className={cn(
                    style.index,
                    { [style.hasTraining]: value !== undefined },
                    { [style.red]: indexContainercolor === 'red' },
                    { [style.blue]: indexContainercolor === 'blue' },
                )}
            >
                {index}
            </div>
            <p className={style.text}>{text}</p>
            <p className={style.value}>{value}</p>
        </div>
    );
};
