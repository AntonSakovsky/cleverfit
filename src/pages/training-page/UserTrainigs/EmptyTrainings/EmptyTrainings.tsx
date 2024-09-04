import { ActionButton } from '@components/ActionButton/ActionButton';
import { FC } from 'react';
import style from './EmptyTrainings.module.css';

type EmptyTrainingsProps = {
    clickHandler: () => void;
};

export const EmptyTrainings: FC<EmptyTrainingsProps> = ({ clickHandler }) => {
    const onClick = clickHandler;

    return (
        <div className={style.container}>
            <h3 className={style.title}>У вас ещё нет созданных тренировок</h3>
            <div className={style.btnWrap}>
                <ActionButton
                    htmlType='button'
                    text='Создать тренировку'
                    type='primary'
                    stretch
                    onClick={onClick}
                />
            </div>
        </div>
    );
};
