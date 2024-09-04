import { FC } from 'react';
import style from './ChooseJointType.module.css';
import { Button } from 'antd';

type ChooseJointTypeProps = {
    randomBtnClickHandler: () => void;
    typeBtnClickHandler: () => void;
};

export const ChooseJointType: FC<ChooseJointTypeProps> = ({
    randomBtnClickHandler,
    typeBtnClickHandler,
}) => {
    return (
        <div className={style.panelWrap}>
            <div className={style.content}>
                <h3 className={style.title}>
                    Хочешь тренироваться с тем, кто разделяет твои цели и темп? Можешь найти друга
                    для совместных тренировок среди других пользователей.
                </h3>
                <p className={style.text}>
                    Можешь воспользоваться случайным выбором или выбрать друга с похожим на твой
                    уровень и вид тренировки, и мы найдем тебе идеального спортивного друга.
                </p>
            </div>

            <div className={style.btnsWrap}>
                <Button type='link' className={style.btn} onClick={randomBtnClickHandler}>
                    Случайный выбор
                </Button>
                <Button type='text' className={style.btn} onClick={typeBtnClickHandler}>
                    Выбор друга по моим тренировкам
                </Button>
            </div>
        </div>
    );
};
