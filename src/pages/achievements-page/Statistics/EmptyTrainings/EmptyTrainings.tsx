import noFound from '@public/img/no-found.png';
import { AchievementPeriod } from '@type/achievements/types';
import { FC } from 'react';
import style from './EmptyTrainings.module.css';

type EmptyTrainingsProps = {
    period: AchievementPeriod;
};

export const EmptyTrainings: FC<EmptyTrainingsProps> = ({ period }) => {
    let text = '';
    switch (period) {
        case 'week':
            text = 'Ой, такой тренировки на этой неделе не было.';
            break;
        case 'month':
            text = 'Ой, такой тренировки в этом месяце не было.';
            break;
        case 'all':
            break;
        default:
            break;
    }
    return (
        <div className={style.emptytrainings}>
            <div className={style.imgWrap}>
                <img src={noFound} alt='No found' />
            </div>
            <h3 className={style.title}>{text}</h3>
        </div>
    );
};
