import { ActionButton } from '@components/ActionButton/ActionButton';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { EditPanel } from '@pages/calendar-page/EditPanel/EditPanel';
import emptyTraining from '@public/img/empty-training.png';
import { trainingSelector } from '@redux/selectors';
import { TrainingType } from '@type/calendar/types';
import { Button } from 'antd';
import { FC } from 'react';
import { AddExerciseHeader } from './AddExerciseHeader';
import style from './AddExerciseModal.module.css';

type AddExerciseModalProps = {
    x: number;
    y: number;
    loading: boolean;
    goBackHandler: () => void;
    onActionBtnClick: () => void;
    onSecondaryBtnClick: () => void;
    editIconClick: () => void;
    onTypeSelect: () => void;
};

export const AddExerciseModal: FC<AddExerciseModalProps> = ({
    x,
    y,
    loading,
    goBackHandler,
    onActionBtnClick,
    onSecondaryBtnClick,
    editIconClick,
    onTypeSelect,
}) => {
    const { allowedTrainigTypes, selectedType, currentTraining, isPastDay } =
        useAppSelector(trainingSelector);

    const exersices = currentTraining ? currentTraining.exercises : [];

    return (
        <div
            className={style.myModal}
            style={{ top: y, left: x }}
            data-test-id='modal-create-exercise'
        >
            <header className={style.header}>
                <AddExerciseHeader
                    items={allowedTrainigTypes as TrainingType[]}
                    onTypeSelect={onTypeSelect}
                    onClick={goBackHandler}
                />
            </header>
            <div className={style.content}>
                {exersices.length === 0 && (
                    <div className={style.imgWarp}>
                        <img src={emptyTraining} alt='Empty' />
                    </div>
                )}
                {exersices.map((exersice, ind) => (
                    <EditPanel
                        name={exersice.name}
                        forExersice
                        key={ind}
                        ind={ind}
                        clickHandler={editIconClick}
                    />
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
                        disabled={selectedType === ''}
                    />
                    <Button
                        type='link'
                        className={style.save}
                        disabled={exersices.length === 0}
                        onClick={onSecondaryBtnClick}
                        loading={loading}
                    >
                        {isPastDay ? 'Сохранить изменения' : 'Сохранить'}
                    </Button>
                </div>
            </footer>
        </div>
    );
};
