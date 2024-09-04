import { CheckCircleFilled } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Modal, Result } from 'antd';
import cn from 'classnames';
import { CSSProperties, FC, useEffect, useState } from 'react';
import style from './BuyTariffInfoModal.module.css';

type BuyTariffInfoModalProps = {
    open: boolean;
    closeHandler: () => void;
};

export const BuyTariffInfoModal: FC<BuyTariffInfoModalProps> = ({ open, closeHandler }) => {
    const email = useAppSelector((state) => state.user.email);
    const [bodyStyle, setBodyStyle] = useState<CSSProperties>({});
    useEffect(() => {
        const resize = () => {
            const width = window.innerWidth;
            if (width >= 461) {
                setBodyStyle({
                    padding: '64px 32px',
                });
            } else {
                setBodyStyle({
                    padding: '32px 16px',
                });
            }
        };
        resize();
        window.addEventListener('resize', resize);

        return () => window.removeEventListener('resize', resize);
    }, []);
    return (
        <Modal
            open={open}
            footer={null}
            bodyStyle={bodyStyle}
            onCancel={closeHandler}
            centered
            className={cn(style.modal, style.buyInfoModal)}
            maskStyle={{ backdropFilter: 'blur(4px)', backgroundColor: 'transparent' }}
            maskClosable={false}
            data-test-id='tariff-modal-success'
        >
            <Result
                icon={<CheckCircleFilled style={{ color: '#2F54EB' }} />}
                title={<h3 className={style.title}>Чек для оплаты у вас на почте</h3>}
                subTitle={
                    <p className={style.subtitle}>
                        Мы отправили инструкцию для оплаты вам на e-mail <span>{email}</span>. После
                        подтверждения оплаты войдите в приложение заново.
                    </p>
                }
                extra={
                    <div className={style.extraInfo}>Не пришло письмо? Проверьте папку Спам.</div>
                }
            />
        </Modal>
    );
};
