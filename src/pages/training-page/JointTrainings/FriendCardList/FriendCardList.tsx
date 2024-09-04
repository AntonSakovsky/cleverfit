import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setInvitationInfo } from '@redux/reducers/TrainingPageSlice';
import {
    setCurrentTrainingType,
    setCurrentTraininig,
    setEditTraningMode,
} from '@redux/reducers/TrainingSlice';
import { UserJointDto } from '@type/calendar/types';
import { FC } from 'react';
import { FriendCard } from '../FriendCard/FriendCard';
import { CardExtra } from './CardExtra/CardExtra';
import style from './FriendCardList.module.css';
import { trainingPageSelector } from '@redux/selectors';

type FriendCardListProps = {
    jointList: UserJointDto[];
    extraCardAction: () => void;
    onReject: (id: string) => void;
};

export const FriendCardList: FC<FriendCardListProps> = ({
    jointList,
    extraCardAction,
    onReject,
}) => {
    const dispatch = useAppDispatch();
    const { allDisabled } = useAppSelector(trainingPageSelector);

    return (
        <div className={style.friendCardList}>
            {jointList.map((item, ind) => {
                const onClick = () => {
                    extraCardAction();
                    dispatch(setCurrentTraininig(undefined));
                    dispatch(setCurrentTrainingType(item.trainingType));
                    dispatch(setEditTraningMode(true));
                    dispatch(
                        setInvitationInfo({
                            img: item.imageSrc,
                            name: item.name,
                            trainingType: item.trainingType,
                            id: item.id,
                        }),
                    );
                };
                return (
                    <FriendCard
                        key={item.name}
                        imgSrc={item.imageSrc}
                        nickName={item.name}
                        payload={item.avgWeightInWeek}
                        trainType={item.trainingType}
                        wrapperClassName={style.cardWrapper}
                        extra={
                            <CardExtra
                                allDisabled={allDisabled}
                                onReject={onReject}
                                extraAction={onClick}
                                jointUser={item}
                            />
                        }
                        dataTestId={`joint-training-cards${ind}`}
                    />
                );
            })}
        </div>
    );
};
