import { CheckCircleFilled } from '@ant-design/icons';
import { ResultCard } from '@components/cards/ResultCard';
import { Modal } from 'antd';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import s from './ModalSuccess.module.css';

const endpointWidth = 561;

const initPaddings = () => {
    const w = window.innerWidth;
    if (w < endpointWidth) {
        return '32px 16px';
    } else {
        return '64px 85.5px';
    }
};

type ModalSuccessProps = {
    clickHandler: () => void;
};
export const ModalSuccess: FC<ModalSuccessProps> = ({ clickHandler }) => {
    const [padding, setPadding] = useState(() => initPaddings());

    useEffect(() => {
        const onResize = () => {
            const w = window.innerWidth;
            if (w < endpointWidth) {
                setPadding('32px 16px');
            } else {
                setPadding('64px 85.5px');
            }
        };
        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <Modal
            open={true}
            footer={null}
            closable={false}
            centered
            maskClosable={false}
            maskStyle={{ backgroundColor: 'transparent', backdropFilter: 'blur(4px)' }}
            bodyStyle={{ backgroundColor: '#fff', padding }}
            className={cn(s.modalSuccess, s.modal)}
        >
            <ResultCard
                clickHandler={clickHandler}
                icon={<CheckCircleFilled style={{ fontSize: 70, color: '#52C41A' }} />}
                message={''}
                title='Отзыв успешно опубликован'
                textBtn='Отлично'
                btnStretch
            />
        </Modal>
    );
};
