import { CheckOutlined } from '@ant-design/icons';
import { ActionButton } from '@components/ActionButton/ActionButton';
import tariffFree from '@public/img/free.png';
import proAble from '@public/img/pro-able.png';
import proDisable from '@public/img/pro-disable.png';
import { Button, Card } from 'antd';
import { FC } from 'react';
import style from './Tarifs.module.css';

type TariffCardProps = {
    name?: string;
    isActive?: boolean;
    free?: boolean;
    expired?: string;
    extraClickHandler: () => void;
    actionClickHandler?: () => void;
};
export const TarifCard: FC<TariffCardProps> = ({
    free = true,
    isActive = false,
    name = 'FREE',
    expired,
    extraClickHandler,
    actionClickHandler,
}) => {
    return (
        <>
            {free ? (
                <Card
                    title='FREE tarif'
                    extra={
                        <Button type='link' onClick={extraClickHandler}>
                            Подробнее
                        </Button>
                    }
                    bodyStyle={{ padding: 0 }}
                    className={style.card}
                >
                    <img src={tariffFree} alt='FREE' />
                    <div className={style.tarifStatus}>
                        <p>активен</p>
                        <CheckOutlined />
                    </div>
                </Card>
            ) : (
                <Card
                    title={`${name} tarif`}
                    extra={
                        <Button type='link' onClick={actionClickHandler}>
                            Подробнее
                        </Button>
                    }
                    bodyStyle={{ padding: 0 }}
                    className={style.card}
                    data-test-id='pro-tariff-card'
                >
                    <img src={isActive ? proAble : proDisable} alt={name} />
                    <div className={style.tarifStatus}>
                        {isActive ? (
                            <div className={style.tariffActive}>
                                <div>активен</div>
                                <div>до {expired}</div>
                            </div>
                        ) : (
                            <ActionButton
                                type='primary'
                                htmlType='button'
                                text='Активировать'
                                fontSize={14}
                                onClick={extraClickHandler}
                                dataTestId='activate-tariff-btn'
                            />
                        )}
                    </div>
                </Card>
            )}
        </>
    );
};
