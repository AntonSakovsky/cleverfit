import { CheckCircleFilled, CloseCircleOutlined } from '@ant-design/icons';
import { FC } from 'react';
import style from './TariffAdvatage.module.css';

type TariffsAdvatageProps = {
    advantageName: string;
    hasAdvantage: boolean[];
};

export const TariffsAdvatage: FC<TariffsAdvatageProps> = ({ advantageName, hasAdvantage }) => {
    return (
        <div className={style.advatage}>
            <div className={style.name}>{advantageName}</div>
            <div className={style.hasList}>
                {hasAdvantage.map((has, ind) => (
                    <div className={style.hasItem} key={ind}>
                        {has ? (
                            <CheckCircleFilled style={{ color: '#262626' }} />
                        ) : (
                            <CloseCircleOutlined style={{ color: '#BFBFBF' }} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
