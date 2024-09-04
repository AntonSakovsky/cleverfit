import { FC } from 'react';
import style from './PeriodCell.module.css';

type PeriodCellProps = {
    period?: number;
};

export const PeriodCell: FC<PeriodCellProps> = ({ period }) => {
    let text = '';
    if (period) {
        switch (period) {
            case 1:
                text = `Через ${period} день`;
                break;
            case 2:
            case 3:
            case 4:
                text = `Через ${period} дня`;
                break;
            case 5:
            case 6:
                text = `Через ${period} дней`;
                break;
            default:
                text = `1 раз в неделю`;
                break;
        }
        
    }
    return <div className={style.periodCell}>{text}</div>;
};
