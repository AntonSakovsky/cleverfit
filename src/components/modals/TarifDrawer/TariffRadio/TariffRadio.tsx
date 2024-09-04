import { Radio } from 'antd';
import { FC } from 'react';
import style from './TariffRadio.module.css';

type TariffRadioProps = {
    duration: string;
    price: number;
    days: number;
    tariffId: string;
};

export const TariffRadio: FC<TariffRadioProps> = ({ duration, price, days, tariffId }) => {
    const newPrice = String(price).replace('.', ',');
    return (
        <div className={style.radioItem}>
            <div className={style.radioField}>
                <div className={style.duration}>{duration}</div>
                <div className={style.priceAndRadio}>
                    <div className={style.price}>{newPrice} $</div>
                    <Radio
                        className={style.radio}
                        value={JSON.stringify({
                            tariffId,
                            days,
                        })}
                        data-test-id={`tariff-${price}`}
                    />
                </div>
            </div>
        </div>
    );
};
