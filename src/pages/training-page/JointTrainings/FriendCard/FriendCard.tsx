import { UserOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Avatar } from 'antd';
import cn from 'classnames';
import { FC, ReactNode } from 'react';
import style from './FriendCard.module.css';
import { trainingPageSelector } from '@redux/selectors';

type FriendCardProps = {
    imgSrc: string;
    nickName: string;
    trainType: string;
    payload: number;
    extra?: ReactNode;
    wrapperClassName?: string;
    dataTestId?: string;
    onClick?: () => void;
};

export const FriendCard: FC<FriendCardProps> = ({
    imgSrc,
    nickName,
    payload,
    trainType,
    extra,
    wrapperClassName,
    dataTestId,
    onClick,
}) => {
    const { searchString } = useAppSelector(trainingPageSelector);
    const highlightText = (text: string) => {
        if (!searchString || !text) {
            return text;
        }

        const regex = new RegExp(`(${searchString})`, 'gi');
        const splittingText = text.split(regex);
        return splittingText.map((chunk, ind) => {
            if (chunk.toLowerCase() === searchString.toLowerCase()) {
                return (
                    <span className={style.markedLetters} key={ind}>
                        {chunk}
                    </span>
                );
            }
            return chunk;
        });
    };
    const name = highlightText(nickName.split(' ')[0]);
    const surname = highlightText(nickName.split(' ')[1]);

    return (
        <div
            className={cn(style.cardWrap, wrapperClassName)}
            onClick={onClick}
            data-test-id={dataTestId}
        >
            <div className={style.personalInfo}>
                <div className={style.imgWrap}>
                    <Avatar
                        src={imgSrc}
                        icon={!imgSrc ? <UserOutlined style={{ color: 'black' }} /> : null}
                        size={42}
                        className={style.avatar}
                    />
                </div>
                <div style={{ display: 'none' }}>{nickName}</div>
                <div className={style.nickName}>
                    <p className={style.text}>{name}</p>
                    <p className={style.text}>{surname}</p>
                </div>
            </div>
            <div className={style.trainingInfo}>
                <div className={style.row}>
                    <p className={style.parameter}>Тип тренировки:</p>
                    <p className={style.value}>{trainType}</p>
                </div>
                <div className={style.row}>
                    <p className={style.parameter}>Средняя нагрузка:</p>
                    <p className={style.value}>{payload} кг/нед</p>
                </div>
            </div>
            {extra && <div className={style.extra}>{extra}</div>}
        </div>
    );
};
