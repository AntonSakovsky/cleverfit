import {
    CheckCircleFilled,
    CloseOutlined,
    UserOutlined
} from '@ant-design/icons';
import { ActionButton } from '@components/ActionButton/ActionButton';
import { TrainingPalDto } from '@type/calendar/types';
import { Avatar } from 'antd';
import { FC } from 'react';
import style from './JointTrainingModal.module.css';

type JointTrainingModalProps = {
    partner: TrainingPalDto;
    closeHandler: () => void;
    onActionBtnClick: (id: string) => void;
};

export const JointTrainingModal: FC<JointTrainingModalProps> = ({
    partner,
    closeHandler,
    onActionBtnClick,
}) => {
    const { avgWeightInWeek, imageSrc, name, trainingType } = partner;

    return (
        <>
            <div className={style.overlay}></div>
            <div className={style.modal} data-test-id='partner-modal'>
                <div className={style.modalWrap}>
                    <div className={style.closeIcon} onClick={closeHandler}>
                        <CloseOutlined style={{ fontSize: 12, color: '#8C8C8C' }} />
                    </div>
                    <div className={style.content}>
                        <div className={style.row}>
                            <div className={style.userInfo}>
                                <div className={style.img}>
                                    <Avatar
                                        size={42}
                                        src={imageSrc}
                                        icon={
                                            !imageSrc ? (
                                                <UserOutlined style={{ color: 'black' }} />
                                            ) : null
                                        }
                                        className={style.avatar}
                                    />
                                </div>
                                <div style={{ display: 'none' }}>{name}</div>
                                <div className={style.username}>
                                    <p>{name.split(' ')[0]}</p>
                                    <p>{name.split(' ')[1]}</p>
                                </div>
                            </div>
                            <div className={style.trainInfo}>
                                <div className={style.characteristic}>
                                    <p>Тип ренировки:</p>
                                    <span>{trainingType}</span>
                                </div>
                                <div className={style.characteristic}>
                                    <p>Средняя нагрузка:</p>
                                    <span>{avgWeightInWeek} кг/нед</span>
                                </div>
                            </div>
                        </div>
                        <div className={style.row}>
                            <div className={style.status}>
                                тренировка одобрена{' '}
                                <CheckCircleFilled
                                    style={{ color: '#52C41A', marginLeft: 5, fontSize: 14 }}
                                />
                            </div>
                            <div className={style.buttonWrap}>
                                <ActionButton
                                    htmlType='button'
                                    text='Отменить тренировку'
                                    type='default'
                                    isAlt
                                    fontSize={14}
                                    stretch
                                    onClick={() => onActionBtnClick(partner.inviteId)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
