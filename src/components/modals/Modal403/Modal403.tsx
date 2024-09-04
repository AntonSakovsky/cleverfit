import { ResultCard } from "@components/cards/ResultCard";
import someWrong from '@public/img/some-wrong.png';
import { Modal } from "antd";
import cn from 'classnames';
import { FC } from "react";
import s from './Modal403.module.css';

type Modal403Props = {
    clickHandler: () => void,
    message: string,
    title: string,
    textBtn: string,
    dataTestId?: string,
    dataTestModalId?: string
}

export const Modal403: FC<Modal403Props> = ({ clickHandler, dataTestId, dataTestModalId, message, textBtn, title }) => {
    return (
        <Modal
            open={true}
            footer={null}
            closable={false}
            centered
            maskClosable={false}
            maskStyle={{ backgroundColor: 'transparent', backdropFilter: 'blur(4px)', zIndex: 100 }}
            bodyStyle={{ backgroundColor: '#fff', padding: '64px 32px 56px 32px' }}
            className={cn(s.modal403, s.modal)}
            data-test-id={dataTestModalId}
        >
            <ResultCard
                clickHandler={clickHandler}
                image={<img src={someWrong} width={255} height={295} alt='Что-то пошло не так' />}
                message={message}
                title={title}
                textBtn={textBtn}
                btnStretch={false}
                dataTestBtnId={dataTestId}
            />
        </Modal>
    )
}