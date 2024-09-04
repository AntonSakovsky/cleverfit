import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Form, Radio } from 'antd';
import { TariffRadio } from '../TariffRadio/TariffRadio';
import style from './TariffCost.module.css';

export const TariffCost = () => {
    const { availableTariffs } = useAppSelector((state) => state.tariff);

    const periods = availableTariffs.length !== 0 ? availableTariffs[0].periods : [];
    return (
        <div className={style.tariffCost} data-test-id='tariff-cost'>
            <h4 className={style.title}>Стоимость тарифа</h4>
            <Form.Item name='buyTariffDto'>
                <Radio.Group className={style.radioGroup}>
                    {periods?.map((period) => (
                        <TariffRadio
                            duration={period.text}
                            price={period.cost}
                            days={period.days}
                            tariffId={availableTariffs[0]._id}
                            key={period.days}
                        />
                    ))}
                </Radio.Group>
            </Form.Item>
        </div>
    );
};
