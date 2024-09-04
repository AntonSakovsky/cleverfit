import { CheckCircleOutlined } from '@ant-design/icons';
import { AdvatageList } from '@constants/constants';
import { FC } from 'react';
import { TariffsAdvatage } from '../TariffAdvantage/TariffAdvatage';
import style from './TariffAdvatageList.module.css';

type TariffAdvatageListProps = {
    proIsActive: boolean;
};

export const TariffAdvatageList: FC<TariffAdvatageListProps> = ({ proIsActive }) => {
    return (
        <>
            <div className={style.tariffsName}>
                <span className={style.free}>FREE</span>
                <span className={style.pro}>
                    PRO
                    {proIsActive && (
                        <CheckCircleOutlined
                            style={{ color: '#52C41A', marginRight: 1, fontSize: 14 }}
                        />
                    )}
                </span>
            </div>
            <div className={style.tariffAdvantages}>
                {AdvatageList.map((advantage) => (
                    <TariffsAdvatage
                        key={advantage.name}
                        advantageName={advantage.name}
                        hasAdvantage={advantage.hasAdvatage}
                    />
                ))}
            </div>
        </>
    );
};
