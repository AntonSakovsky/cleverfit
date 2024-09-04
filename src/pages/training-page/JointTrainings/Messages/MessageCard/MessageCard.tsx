import { UserOutlined } from '@ant-design/icons';
import { ActionButton } from '@components/ActionButton/ActionButton';
import { TrainingItem } from '@type/calendar/types';
import { Avatar } from 'antd';
import { FC, MouseEvent, useEffect, useRef, useState } from 'react';
import { TrainingDetail } from '../TrainingDetail/TrainingDetail';
import style from './MessageCard.module.css';

type MessageCardProps = {
    date: string;
    imgSrc: string;
    name: string;
    surname: string;
    training: TrainingItem;
    acceptAction: () => void;
    rejectAction: () => void;
    heightSetter?: (value: number) => void;
};

export const MessageCard: FC<MessageCardProps> = ({
    date,
    imgSrc,
    name,
    surname,
    training,
    acceptAction,
    rejectAction,
    heightSetter,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [toTop, setToTop] = useState(false);

    const showDetails = () => setDetailsVisible(true);
    const hideDetails = (e: MouseEvent) => {
        e.stopPropagation();
        setDetailsVisible(false);
    };

    const localeDate = new Date(date).toLocaleDateString('ru-Ru');

    useEffect(() => {
        heightSetter && heightSetter(cardRef.current?.offsetHeight as number);
        const onResize = () => {
            const width = window.innerWidth;
            if (width <= 835) {
                setToTop(true);
            } else {
                setToTop(false);
            }
        };

        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);
    return (
        <div className={style.card} ref={cardRef}>
            <div className={style.userInfo}>
                <div className={style.img}>
                    <Avatar
                        src={imgSrc}
                        icon={!imgSrc ? <UserOutlined style={{ color: 'black' }} /> : null}
                        size={42}
                        className={style.avatar}
                    />
                </div>
                <div className={style.userName}>
                    <p>{name}</p>
                    <p>{surname}</p>
                </div>
            </div>
            <div className={style.content}>
                <div className={style.date}>{localeDate}</div>
                <h5 className={style.invitationText}>
                    Привет, я ищу партнёра для совместных [силовых тренировок]. Ты хочешь
                    присоединиться ко мне на следующих тренировках?
                </h5>
                <div className={style.trainDetails} onClick={showDetails}>
                    <p className={style.trainDetailsText}>Посмотреть детали тренировки</p>
                    {detailsVisible && (
                        <TrainingDetail
                            date={training.date}
                            exersices={training.exercises}
                            period={String(training.parameters?.period)}
                            type={training.name}
                            toTop={toTop}
                            onClose={hideDetails}
                        />
                    )}
                </div>
            </div>
            <div className={style.buttons}>
                <ActionButton
                    htmlType='button'
                    text='Тренироваться вместе'
                    type='primary'
                    fontSize={14}
                    stretch
                    onClick={acceptAction}
                />
                <ActionButton
                    htmlType='button'
                    text='Отклонить запрос'
                    type='default'
                    isAlt
                    fontSize={14}
                    stretch
                    onClick={rejectAction}
                />
            </div>
        </div>
    );
};
