import { ActionButton } from "@components/ActionButton/ActionButton";
import { Modal, Result } from "antd";
import Title from "antd/lib/typography/Title";
import cn from 'classnames';
import { FC, useEffect, useState } from "react";
import s from './ErrorModal.module.css';

type DataNotSavedModalType = {
    title: string,
    subtitle: string,
    primaryBtnText: string,
    primaryBtnClickHandker: () => void,
    secondaryBtnText: string,
    secondaryBtnClickHandker: () => void,
}

const initPaddings = () => {
    const width = window.innerWidth;
    if (width < 561) {
        return '32px 16px'
    } else {
        return '64px 85.5px'
    }
}

export const ErrorModal: FC<DataNotSavedModalType> = ({ title, subtitle, primaryBtnText, primaryBtnClickHandker, secondaryBtnText, secondaryBtnClickHandker }) => {
    const [padding, setPadding] = useState(()=> initPaddings());

    useEffect(() => {
        const onResize = () => {
            const width = window.innerWidth;
            if (width < 561) {
                setPadding('32px 16px')
            } else {
                setPadding('64px 85.5px');
            }
        }
        window.addEventListener('resize', onResize)

        return () => window.removeEventListener('resize', onResize)
    }, [])
    return (
        <Modal
            open={true}
            footer={null}
            closable={false}
            centered
            maskClosable={false}
            maskStyle={{ backgroundColor: 'transparent', backdropFilter: 'blur(4px)' }}
            bodyStyle={{ backgroundColor: '#fff', padding }}
            className={s.modal}
        >
            <Result
                status="error"
                title={<Title level={3} className={cn(s.title, s.elem)}>{title}</Title>}
                subTitle={<p className={cn(s.subtitle, s.elem)}>{subtitle}</p>}
                className={s.resultCard}
                extra={[
                    <div className={s.btnsContainer} key={0}>
                        <ActionButton type="primary"
                            isAlt={false}
                            htmlType="button"
                            text={primaryBtnText}
                            fontSize={14}
                            stretch
                            onClick={primaryBtnClickHandker}
                            key={1}
                            dataTestId='write-review-not-saved-modal'
                        />
                        <ActionButton type="default"
                            isAlt
                            htmlType="button"
                            text={secondaryBtnText}
                            fontSize={14}
                            stretch
                            onClick={secondaryBtnClickHandker}
                            key={2} />,
                    </div>

                ]}
            ></Result>
        </Modal>
    )
}