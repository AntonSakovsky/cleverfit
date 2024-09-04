import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
    trainingApi,
    useCreateTrainingMutation,
    useUpdateTrainingMutation,
} from '@api/trainingApi/trainingApi';
import { ActionButton } from '@components/ActionButton/ActionButton';
import { CustomAlert } from '@components/Alert/CustomAlert';
import { DrawerHeader } from '@components/modals/DrawerHeader/DrawerHeader';
import { EditExersiceDrawer } from '@components/modals/EditExirsiceDrawer/EditExersiceDrawer';
import { ErrorModalSmall } from '@components/modals/ErrorModalSmall/ErrorModalSmall';
import { TrainingInfoModal } from '@components/modals/TrainingInfoModal/TrainingInfoModal';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setAlertText, setModalVisible } from '@redux/reducers/TrainingPageSlice';
import {
    addTraining,
    resetExersiceFields,
    setCurrentTrainingImplementation,
    setCurrentTraininig,
    setCurrentTraininigExersices,
    setEditDisabledForTraining,
    setEditExersiceMode,
    setEditTraningMode,
    setIsPastDay,
    setSelectedDate,
    setSelectedType,
    setUpdateMethod,
} from '@redux/reducers/TrainingSlice';
import {
    CreateTrainingBody,
    Paramters,
    TrainingItem,
    UpdateTrainingBody,
} from '@type/calendar/types';
import cn from 'classnames';
import { useState } from 'react';
import { EmptyTrainings } from './EmptyTrainings/EmptyTrainings';
import { TrainingTable } from './TrainingTable/TrainingTable';
import style from './UserTrainings.module.css';
import { trainingPageSelector, trainingSelector } from '@redux/selectors';

export const UserTrainings = () => {
    const dispatch = useAppDispatch();
    const [createTraining] = useCreateTrainingMutation();
    const [updateTraining] = useUpdateTrainingMutation();
    const {
        trainingList,
        editTrainingMode,
        currentTraining,
        updateMethod,
        isPastDay,
        exersiceFields,
    } = useAppSelector(trainingSelector);
    const { modalPosX, modalPosY, modalVisible, alertText } = useAppSelector(trainingPageSelector);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [errorModal, setErrorModal] = useState(false);

    const closeErrorModal = () => setErrorModal(false);

    const openDrawer = () => setDrawerOpen(true);

    const closeDrawer = () => {
        dispatch(resetExersiceFields(null));
        dispatch(setEditExersiceMode(false));
        dispatch(setEditTraningMode(false));
        setDrawerOpen(false);
    };

    const closeModal = () => {
        dispatch(setModalVisible(false));
        dispatch(setUpdateMethod(false));
        dispatch(setCurrentTraininig(null));
        dispatch(setSelectedType(''));
        dispatch(setSelectedDate(''));
    };

    const createTrainingBtnClick = () => {
        dispatch(setCurrentTraininig(undefined));
        dispatch(setIsPastDay(false));
        openDrawer();
    };

    const trainingInfoModalClick = () => {
        dispatch(setUpdateMethod(true));
        dispatch(setEditTraningMode(true));
        openDrawer();
    };

    const closeAlert = () => setAlertVisible(false);

    const tableIconClick = () => {
        dispatch(setEditTraningMode(true));
        dispatch(setUpdateMethod(true));
        openDrawer();
    };

    const saveTraining = async () => {
        const exersices = exersiceFields.filter((item) => item.name.trim() !== '');
        dispatch(setCurrentTraininigExersices(exersices));
        const training = { ...currentTraining } as TrainingItem;
        if (training) {
            training.exercises = exersices;
        }
        if (training) {
            try {
                if (updateMethod) {
                    const updateTrainingDto: UpdateTrainingBody = {
                        date: training.date,
                        exercises: [...training.exercises],
                        name: training.name,
                        isImplementation: isPastDay,
                        parameters: training.parameters,
                    };

                    await updateTraining({
                        body: updateTrainingDto,
                        trainingId: training._id as string,
                    }).unwrap();
                    dispatch(
                        trainingApi.endpoints.getTraining.initiate(null, {
                            forceRefetch: true,
                        }),
                    );
                    if (isPastDay) {
                        dispatch(setEditDisabledForTraining({ id: training._id as string }));
                        dispatch(setCurrentTrainingImplementation(true));
                    }
                    dispatch(setAlertText('Тренировка успешно обновлена'));
                } else {
                    const creatTrainingDto: CreateTrainingBody = {
                        date: training.date,
                        exercises: training.exercises,
                        isImplementation: false,
                        name: training.name,
                        parameters: training.parameters as Paramters,
                    };
                    const createdTraining = await createTraining(creatTrainingDto).unwrap();
                    dispatch(addTraining(createdTraining));
                    dispatch(setAlertText('Новая тренировка успешно добавлена'));
                }
                setAlertVisible(true);
            } catch (error) {
                setErrorModal(true);
            } finally {
                closeDrawer();
            }
        }
    };

    const renderHeader = () => {
        return (
            <>
                {editTrainingMode ? (
                    <DrawerHeader
                        icon={<EditOutlined />}
                        text='Редактирование'
                        onClick={closeDrawer}
                    />
                ) : (
                    <DrawerHeader
                        icon={<PlusOutlined />}
                        text='Добавление упражнений'
                        onClick={closeDrawer}
                    />
                )}
            </>
        );
    };

    return (
        <>
            {errorModal && (
                <ErrorModalSmall
                    title='При сохранении данных произошла ошибка '
                    message='Придётся попробовать ещё раз'
                    btnText='Закрыть'
                    iconColor='#FF4D4F'
                    clickHandler={closeErrorModal}
                    dataTestId='modal-error-user-training-button'
                />
            )}
            <div className={style.userTrainings}>
                {alertVisible && (
                    <CustomAlert
                        message={alertText}
                        type='success'
                        closable
                        closeHandler={closeAlert}
                        className={cn(style.alert, style.myAlert)}
                        dataTestId='create-training-success-alert'
                    />
                )}
                {!trainingList ||
                    (trainingList.length === 0 && (
                        <div className={style.emptyTrainings}>
                            <EmptyTrainings clickHandler={createTrainingBtnClick} />
                        </div>
                    ))}
                    
                {trainingList && trainingList.length !== 0 && (
                    <>
                        <TrainingTable
                            onIconClick={tableIconClick}
                            trainings={trainingList ? trainingList : []}
                        />
                        <div className={style.newTraining} style={{ width: 170 }}>
                            <ActionButton
                                htmlType='button'
                                text='Новая тренировка'
                                type='primary'
                                icon={<PlusOutlined style={{ color: '#fff', fontSize: 14 }} />}
                                fontSize={14}
                                onClick={createTrainingBtnClick}
                                dataTestId='create-new-training-button'
                            />
                        </div>
                    </>
                )}
                {modalVisible && (
                    <TrainingInfoModal
                        onClose={closeModal}
                        onActionBtnClick={trainingInfoModalClick}
                        x={modalPosX}
                        y={modalPosY}
                    />
                )}
                <EditExersiceDrawer
                    open={drawerOpen}
                    bottomBtnText='Добавить ещё упражнение'
                    withDataInputs
                    renderHeader={renderHeader}
                    footerBtnText='Сохранить'
                    footerBtnClickHandler={saveTraining}
                />
            </div>
        </>
    );
};
