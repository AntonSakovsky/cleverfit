import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setCurrPartner } from '@redux/reducers/TrainingPageSlice';
import { TrainingPalDto } from '@type/calendar/types';
import { FC } from 'react';
import { FriendCard } from '../FriendCard/FriendCard';
import style from './PartnersList.module.css';

type PartnersListProps = {
    partners: TrainingPalDto[];
    extraAction: () => void;
};

export const PartnersList: FC<PartnersListProps> = ({ partners, extraAction }) => {
    const dispatch = useAppDispatch();

    return (
        <div className={style.panelWrap}>
            <h4 className={style.title}>Мои партнёры по тренировкам</h4>
            <div className={style.partners}>
                {partners.length !== 0 ? (
                    partners.map((partner, ind) => {
                        const onCardClick = () => {
                            dispatch(setCurrPartner(partner));
                            extraAction();
                        };

                        return (
                            <FriendCard
                                key={partner.id}
                                imgSrc={partner.imageSrc as string}
                                nickName={partner.name}
                                payload={partner.avgWeightInWeek}
                                trainType={partner.trainingType}
                                onClick={onCardClick}
                                dataTestId={`joint-training-cards${ind}`}
                            />
                        );
                    })
                ) : (
                    <p className={style.emptyMessage}>
                        У вас пока нет партнёров для совместных тренировок
                    </p>
                )}
            </div>
        </div>
    );
};
