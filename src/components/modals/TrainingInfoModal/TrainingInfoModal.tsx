import { ArrowLeftOutlined } from '@ant-design/icons';
import { ActionButton } from '@components/ActionButton/ActionButton';
import { indicatorColors } from '@constants/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import emptyExersices from '@public/img/empty-training.png';
import { setIsPastDay } from '@redux/reducers/TrainingSlice';
import { FC, useEffect, useRef } from 'react';
import style from './TrainingInfoModal.module.css';
import { trainingSelector } from '@redux/selectors';

type TrainingInfoModalProps = {
    x: number;
    y: number;
    onActionBtnClick: () => void;
    onClose: () => void;
};

export const TrainingInfoModal: FC<TrainingInfoModalProps> = ({
    x,
    y,
    onActionBtnClick,
    onClose,
}) => {
    const dispatch = useAppDispatch();
    const { currentTraining } = useAppSelector(trainingSelector);

    const modalRef = useRef<HTMLDivElement>(null);

    const exersices = currentTraining ? currentTraining.exercises : [];

    useEffect(() => {
        const currDate = new Date().toLocaleDateString('ru-Ru');
        const currTrainDate = new Date(currentTraining?.date as string).toLocaleDateString('ru-Ru');
        dispatch(setIsPastDay(currDate === currTrainDate));

        return () => {
            dispatch(setIsPastDay(false));
        };
    }, []);

    useEffect(() => {
        const windowClick = (e: MouseEvent) => {
            const shouldClose = !modalRef.current?.contains(e.target as Node);
            if (shouldClose) onClose();
        };

        window.addEventListener('mouseup', windowClick);

        return () => {
            window.removeEventListener('mouseup', windowClick);
        };
    }, []);

    return (
        <div
            className={style.myModal}
            style={{ top: y - 4, left: x + 10 }}
            ref={modalRef}
            data-test-id='modal-create-exercise'
        >
            <header
                className={style.header}
                style={{
                    borderBottom: `2px solid ${indicatorColors[currentTraining?.name as string]}`,
                }}
            >
                <div className={style.backArrow} onClick={onClose}>
                    <ArrowLeftOutlined />
                </div>
                <p className={style.trainingType}>{currentTraining?.name}</p>
            </header>
            <div className={style.content}>
                {exersices.length === 0 && (
                    <div className={style.imgWarp}>
                        <img src={emptyExersices} alt='Empty' />
                    </div>
                )}
                {exersices.map((exersice) => (
                    <p key={exersice._id}>{exersice.name}</p>
                ))}
            </div>
            <footer className={style.footer}>
                <div className={style.footerBtns}>
                    <ActionButton
                        htmlType='button'
                        isAlt
                        text='Добавить упражнения'
                        type='default'
                        stretch
                        fontSize={14}
                        onClick={onActionBtnClick}
                        disabled={currentTraining?.isImplementation}
                    />
                </div>
            </footer>
        </div>
    );
};
