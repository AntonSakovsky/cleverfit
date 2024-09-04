import { StarFilled, StarOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Rate } from "antd";
import { FC } from "react";
import s from './FeedBackCard.module.css';

type FeedBackCardProps = {
    fullName: string | null,
    imageSrc: string | null,
    message: string | null,
    rating: number,
    createdAt: string,
}

export const FeedbackCard: FC<FeedBackCardProps> = ({ createdAt, fullName, imageSrc, message, rating }) => {
   
    return (
        <div className={s.card}>
            <div className={s.cardContainer}>
                <div className={s.credits}>
                    <div className={s.img}>
                        <Avatar size={42} src={imageSrc} icon={!imageSrc ? <UserOutlined style={{ color: 'black' }} /> : null} />
                    </div>
                    <div className={s.name}>
                        {
                            fullName ?
                                <>
                                    <p>{fullName?.split(' ')[0]}</p>
                                    <p>{fullName?.split(' ')[1]}</p>
                                </>
                                :
                                'Пользователь'
                        }

                    </div>
                </div>
                <div className={s.content}>
                    <div className={s.meta}>
                        <div className={s.rating}>
                            <Rate
                                disabled
                                character={({ index }) => index && index >= rating ? <StarOutlined style={{ color: '#FAAD14', fontSize: 16 }} /> : <StarFilled style={{ color: '#FAAD14', fontSize: 16 }} />}
                            />
                        </div>
                        <div className={s.date}>{new Date(createdAt).toLocaleDateString('ru-Ru')}</div>
                    </div>
                    <div className={s.text}>
                        {message}
                    </div>

                </div>

            </div>
        </div>
    )
}