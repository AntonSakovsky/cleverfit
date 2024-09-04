import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setTrainingRoute } from '@redux/reducers/TrainingPageSlice';
import { TrainingRoutes } from '@type/TrainingPage/types';
import cn from 'classnames';
import { MouseEvent } from 'react';
import style from './Navigation.module.css';
import { trainingPageSelector } from '@redux/selectors';

export const Navigation = () => {
    const dispatch = useAppDispatch();
    const { route, invitationsArr } = useAppSelector(trainingPageSelector);

    const clickHandler = (e: MouseEvent, routeName: TrainingRoutes) => {
        dispatch(setTrainingRoute(routeName));
        scroll(e);
    };

    const scroll = (e: MouseEvent) => {
        const elem = e.target as HTMLDivElement;
        elem.scrollIntoView({
            block: 'end',
            behavior: 'smooth',
            inline: 'center',
        });
    };

    return (
        <div className={style.navigationContainer}>
            <nav className={style.nav}>
                <div
                    className={cn(style.navItem, { [style.active]: route === 'trainings' })}
                    onClick={(e: MouseEvent) => clickHandler(e, 'trainings')}
                >
                    <h3>Мои тренировки</h3>
                </div>

                <div
                    className={cn(style.navItem, style.navItemWithBadge, {
                        [style.active]: route === 'joint',
                    })}
                    onClick={(e: MouseEvent) => clickHandler(e, 'joint')}
                >
                    <h3>Совместные тренировки</h3>

                    {invitationsArr.length !== 0 && (
                        <div className={style.badge}>{invitationsArr.length}</div>
                    )}
                </div>

                <div
                    className={cn(style.navItem, { [style.active]: route === 'maraphons' })}
                    onClick={(e: MouseEvent) => clickHandler(e, 'maraphons')}
                >
                    <h3>Марафоны</h3>
                </div>
            </nav>
        </div>
    );
};
