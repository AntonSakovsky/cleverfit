import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { TrainingRoutes } from '@type/TrainingPage/types';
import cn from 'classnames';
import { JointTrainings } from '../JointTrainings/JointTrainings';
import { Navigation } from '../Navigation/Navigation';
import { UserTrainings } from '../UserTrainigs/UserTrainings';
import style from './TrainingPageContent.module.css';
import { trainingPageSelector, trainingSelector } from '@redux/selectors';

const trainingRouter: Record<TrainingRoutes, JSX.Element> = {
    trainings: <UserTrainings />,
    joint: <JointTrainings />,
    maraphons: <div>To be continued...</div>,
};

export const TrainingPageContent = () => {
    const { trainingList } = useAppSelector(trainingSelector);
    const { route } = useAppSelector(trainingPageSelector);

    return (
        <div className={cn(style.content, { [style.empty]: trainingList?.length === 0 })}>
            <Navigation />
            <div className={style.trainingPageContent}>{trainingRouter[route]}</div>
        </div>
    );
};
