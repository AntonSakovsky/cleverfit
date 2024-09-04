import { CloseOutlined } from '@ant-design/icons';
import { useBuyTariffMutation } from '@api/tariffApi/tariffApi';
import { ActionButton } from '@components/ActionButton/ActionButton';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { BuyTariffDto } from '@type/tariff/types';
import { Divider, Drawer, Form } from 'antd';
import moment from 'moment';
import { CSSProperties, FC, useEffect, useState } from 'react';
import style from './TarifDrawer.module.css';
import { TariffAdvatageList } from './TariffAdvatageList/TariffAdvatageList';
import { TariffCost } from './TariffCost/TariffCost';

type TariffCostFormData = {
    buyTariffDto: string;
};

const mobileWidth = 461;

type TarifDrawer = {
    open: boolean;
    submitAction: () => void;
    closeHandler: () => void;
};

export const TarifDrawer: FC<TarifDrawer> = ({ open, closeHandler, submitAction }) => {
    const [buyTariff] = useBuyTariffMutation();
    const [disabled, setDisabled] = useState(true);
    const [drawerStyle, setDrawerStyle] = useState<CSSProperties>({});

    const [placement, setPlacement] = useState<'right' | 'bottom'>(
        window.innerWidth >= mobileWidth ? 'right' : 'bottom',
    );
    const [form] = Form.useForm();

    const userTariff = useAppSelector((state) => state.user.tariff);
    const availableTariffs = useAppSelector((state) => state.tariff.availableTariffs);
    const proIsActive = Boolean(
        availableTariffs.find((tariff) => tariff._id === userTariff?.tariffId),
    );

    let date = userTariff
        ? moment(userTariff.expired, moment.ISO_8601).toDate().toLocaleDateString('ru-Ru')
        : undefined;

    const dateArr = date?.split('.');
    date = dateArr?.slice(0, 2).join('.');

    const onFinish = async (values: TariffCostFormData) => {
        const buyTariffDto: BuyTariffDto = JSON.parse(values.buyTariffDto);
        try {
            await buyTariff(buyTariffDto).unwrap();
            closeHandler();
            submitAction();
        } catch (error) {
        } finally {
            setDisabled(true);
        }
    };

    const onFieldsChange = () => setDisabled(false);

    const submitBtnHandler = () => form.submit();

    useEffect(() => {
        const onResize = () => {
            const wiidth = window.innerWidth;
            if (wiidth >= mobileWidth) {
                setPlacement('right');
                setDrawerStyle({
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                    height: '100vh',
                    width: 408,
                });
            } else {
                setPlacement('bottom');
                setDrawerStyle({
                    borderTopLeftRadius: 24,
                    borderBottomLeftRadius: 24,
                    height: '88vh',
                });
            }
        };
        onResize();

        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <Drawer
            placement={placement}
            title={null}
            open={open}
            closable={false}
            bodyStyle={{ padding: '0' }}
            contentWrapperStyle={{ ...drawerStyle }}
            className={style.drawer}
            destroyOnClose
            data-test-id='tariff-sider'
        >
            <div className={style.content}>
                <div className={style.header}>
                    <h4 className={style.title}>Сравнить тарифы</h4>
                    <CloseOutlined onClick={closeHandler} />
                </div>
                <div className={style.body}>
                    {proIsActive && (
                        <div className={style.endTarifInfo}>Ваш PRO tatif активен до {date}</div>
                    )}

                    <TariffAdvatageList proIsActive={proIsActive} />
                    {!proIsActive && (
                        <Form form={form} onFinish={onFinish} onFieldsChange={onFieldsChange}>
                            <TariffCost />
                        </Form>
                    )}
                </div>
                {!proIsActive && (
                    <div className={style.footer}>
                        <Divider className={style.divider} />
                        <div className={style.actionBtnWrap}>
                            <ActionButton
                                htmlType='submit'
                                text='Выбрать и оплатить'
                                type='primary'
                                disabled={disabled}
                                fontSize={14}
                                stretch
                                onClick={submitBtnHandler}
                                dataTestId='tariff-submit'
                            />
                        </div>
                    </div>
                )}
            </div>
        </Drawer>
    );
};
