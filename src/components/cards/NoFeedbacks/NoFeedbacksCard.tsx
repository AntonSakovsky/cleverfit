import { ActionButton } from '@components/ActionButton/ActionButton';
import Title from 'antd/lib/typography/Title';
import { FC, useEffect, useState } from 'react';
import s from './NoFeedbacksCard.module.css';

type NoFeedbackProps = {
    clickHandler: () => void
}

export const NoFeedbacksCard: FC<NoFeedbackProps> = ({ clickHandler }) => {
    const [stretch, setStretch] = useState(false);

    useEffect(() => {
        const onResize = () => {
            const width = window.innerWidth;

            if (width <= 460) {
                setStretch(true);
            } else {
                setStretch(false);
            }
        }
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, [])

    return (
        <div className={s.container}>
            <div className={s.panel}>
                <div className={s.contentWrap}>
                    <div className={s.titleWrap}>
                        <Title className={s.title} level={3}>Оставьте свой отзыв первым</Title>
                    </div>
                    <div className={s.descriptionWrap}>
                        <div className={s.description}>
                            <p>Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь своим мнением и опытом с другими пользователями,</p>
                            <p>и помогите им сделать правильный выбор.</p>
                        </div>
                    </div>
                </div>
            </div>
            <ActionButton
                type='primary'
                htmlType='button'
                text='Написать отзыв'
                isAlt={false}
                fontSize={14}
                stretch={stretch}
                onClick={clickHandler}
                dataTestId='write-review'
            />
        </div>
    )
}