import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import moment from 'moment';
import { FC } from 'react';
import { TarifCard } from './TarifCard';
import style from './Tarifs.module.css';

type TarifListProps = {
    extraClickHandler: () => void;
    actionClickHandler: () => void;
};

export const TarifList: FC<TarifListProps> = ({ extraClickHandler, actionClickHandler }) => {
    const { availableTariffs } = useAppSelector((state) => state.tariff);
    const tariffInfo = useAppSelector((state) => state.user.tariff);
    const tariffId = tariffInfo?.tariffId;

    const date = tariffInfo
        ? moment(tariffInfo.expired, moment.ISO_8601).toDate().toLocaleDateString('ru-Ru')
        : undefined;
    const dateArr = date?.split('.');
    const expired = dateArr?.slice(0, 2).join('.');
    return (
        <div className={style.tarifList}>
            <TarifCard extraClickHandler={extraClickHandler} />
            {availableTariffs?.map((tariff) => (
                <TarifCard
                    free={false}
                    name={tariff.name}
                    isActive={tariff._id === tariffId}
                    extraClickHandler={extraClickHandler}
                    actionClickHandler={actionClickHandler}
                    key={tariff._id}
                    expired={expired}
                />
            ))}
        </div>
    );
};
