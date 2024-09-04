import { CloseOutlined } from '@ant-design/icons';
import { ActionButton } from '@components/ActionButton/ActionButton';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { EditPanel } from '@pages/calendar-page/EditPanel/EditPanel';
import emptyTraining from '@public/img/empty-training.png';
import { setActualTrainings } from '@redux/reducers/TrainingSlice';
import { TrainingItem } from '@type/calendar/types';
import { FC, useEffect, useRef } from 'react';
import style from './CreateTrainingModal.module.css';
import { trainingSelector } from '@redux/selectors';

type CreateExersiceModalProps = {
    x: number;
    y: number;
    onClose: () => void;
    actionHandler: () => void;
    editIconClick: (value: string) => void;
};

export const CreateTrainingModal: FC<CreateExersiceModalProps> = ({
    x,
    y,
    onClose,
    actionHandler,
    editIconClick,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const { trainingList, selectedDate, actualTrainings, allowedTrainigTypes, isPastDay } =
        useAppSelector(trainingSelector);

    useEffect(() => {
        const trainings = trainingList?.filter((trainingItem) => {
            const trainDate = new Date(trainingItem.date).toLocaleDateString('ru-Ru');
            return selectedDate === trainDate;
        }) as TrainingItem[];
        dispatch(setActualTrainings(trainings));
    }, [trainingList, selectedDate]);

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
            style={{ top: y, left: x }}
            data-test-id='modal-create-training'
            ref={modalRef}
        >
            <header className={style.header}>
                <div className={style.titleWrap}>
                    <h4 className={style.title}>Тренировка на {selectedDate}</h4>
                    {actualTrainings?.length === 0 && (
                        <p className={style.message}>Нет активных тренировок</p>
                    )}
                </div>
                <div className={style.closeIcon} onClick={onClose}>
                    <CloseOutlined
                        style={{ fontSize: 14, color: '#000' }}
                        data-test-id='modal-create-training-button-close'
                    />
                </div>
            </header>

            <div className={style.body}>
                {actualTrainings?.length === 0 ? (
                    <div className={style.imgWarp}>
                        <img src={emptyTraining} alt='Empty' />
                    </div>
                ) : (
                    actualTrainings?.map((training, ind) => (
                        <EditPanel
                            key={ind}
                            name={training.name}
                            forExersice={false}
                            ind={ind}
                            isImplemented={training.isImplementation}
                            clickHandler={editIconClick}
                        />
                    ))
                )}
            </div>
            <footer className={style.footer}>
                <ActionButton
                    htmlType='button'
                    isAlt={false}
                    type='primary'
                    stretch
                    text='Создать тренировку'
                    fontSize={14}
                    onClick={actionHandler}
                    disabled={
                        isPastDay ||
                        (allowedTrainigTypes &&
                            actualTrainings.length === allowedTrainigTypes?.length)
                    }
                />
            </footer>
        </div>
    );
};
