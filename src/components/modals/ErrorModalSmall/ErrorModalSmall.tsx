import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { ActionButton } from '@components/ActionButton/ActionButton';
import { Button } from 'antd';
import cn from 'classnames';
import { FC } from 'react';
import style from './ErrorModalSmall.module.css';

type BasicErrorModalProps = {
    title: string;
    message: string;
    btnText: string;
    iconColor: string;
    closable?: boolean;
    clickHandler: () => void;
    closeClickHandler?: () => void;
    dataTestId?: string;
};

export const ErrorModalSmall: FC<BasicErrorModalProps> = ({
    clickHandler,
    closeClickHandler,
    message,
    title,
    btnText,
    iconColor,
    closable = false,
    dataTestId,
}) => {
    return (
        <>
            <div className={style.overlay}>
                <div className={cn(style.modal, { [style.clasable]: closable })}>
                    <div className={style.content}>
                        <div className={style.icon}>
                            <CloseCircleOutlined style={{ color: iconColor, fontSize: 22 }} />
                        </div>
                        <div className={style.textBlock}>
                            <h4
                                className={style.title}
                                data-test-id='modal-error-user-training-title'
                            >
                                {title}
                            </h4>
                            <p
                                className={style.message}
                                data-test-id='modal-error-user-training-subtitle'
                            >
                                {message}
                            </p>
                        </div>
                        {closable && (
                            <div>
                                <CloseOutlined
                                    style={{ fontSize: 14, color: '#8C8C8C' }}
                                    onClick={closeClickHandler}
                                    data-test-id='modal-error-user-training-button-close'
                                />
                            </div>
                        )}
                    </div>
                    <div className={style.buttonWrap}>
                        <div className={style.button}>
                            {!closable ? (
                                <ActionButton
                                    htmlType='button'
                                    isAlt={false}
                                    text={btnText}
                                    type='primary'
                                    fontSize={14}
                                    onClick={clickHandler}
                                    dataTestId={dataTestId}
                                />
                            ) : (
                                <Button
                                    type='primary'
                                    onClick={clickHandler}
                                    className={style.refetchBtn}
                                    data-test-id={dataTestId}
                                >
                                    Обновить
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
