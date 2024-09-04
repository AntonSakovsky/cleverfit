import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useCreateTrainingMutation, useUpdateTrainingMutation } from '@api/trainingApi/trainingApi';
import { AddExerciseModal } from '@components/modals/AddExerciseModal/AddExerciseModal';
import { CreateTrainingModal } from '@components/modals/CreateTrainingModal/CreateTrainingModal';
import { DrawerHeader } from '@components/modals/DrawerHeader/DrawerHeader';
import { EditExersiceDrawer } from '@components/modals/EditExirsiceDrawer/EditExersiceDrawer';
import { ErrorModalSmall } from '@components/modals/ErrorModalSmall/ErrorModalSmall';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    addTraining,
    resetExersiceFields,
    setActualTrainings,
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
import { trainingSelector } from '@redux/selectors';
import {
    CreateTrainingBody,
    Paramters,
    TrainingItem,
    UpdateTrainingBody,
} from '@type/calendar/types';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/lib/locale/ru_RU';
import moment, { Moment } from 'moment';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { FullscreenCalendar } from '../FullscreenCalendar/FullscreenCalendar';
import style from './CalendarContent.module.css';
import { SmallCalendar } from './SmallCalendar/SmallCalendar';

moment.updateLocale('ru', {
    weekdaysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    weekdays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    monthsShort: [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек',
    ],
    week: {
        dow: 1,
    },
});

const initCalendarSize = () => {
    const width = window.innerWidth;
    if (width < 500) {
        return true;
    }
    return false;
};

const CREATE_MODAL_WIDTH = 264;

const smallCalendarResolution = 500;

export const CalendarContent = () => {
    const dispatch = useAppDispatch();
    const [createTraining] = useCreateTrainingMutation();
    const [updateTraining] = useUpdateTrainingMutation();
    const {
        trainingList,
        exersiceFields,
        selectedDate,
        updateMethod,
        currentTraining,
        isPastDay,
        selectedMonth,
        editTrainingMode,
    } = useAppSelector(trainingSelector);
    const containerRef = useRef<HTMLDivElement>(null);
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);
    const [saveLoading, setSaveLoading] = useState(false);
    const [createTrainingVisible, setCreateTrainingVisible] = useState(false);
    const [addExersiceVisible, setAddExersiceVisible] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [createOrUpdateError, setCreateOrUpdateError] = useState(false);
    const [isSmallCalendar, setIsSmallCalendar] = useState(() => initCalendarSize());

    const onSelect = (_: Moment) => {
        setActualTrainingsForDay();
    };
    const setActualTrainingsForDay = () => {
        const trainings = trainingList?.filter((trainingItem) => {
            const trainDate = new Date(trainingItem.date).toLocaleDateString('ru-Ru');
            return selectedDate === trainDate;
        }) as TrainingItem[];

        dispatch(setActualTrainings(trainings));
    };

    const actionBtnHandler = () => {
        setCreateTrainingVisible(false);
        setAddExersiceVisible(true);
    };
    const onEditIconClick = (value: string) => {
        const currTraining = trainingList?.find(
            (training) =>
                new Date(training.date).toLocaleDateString('ru-Ru') === selectedDate &&
                training.name === value,
        ) as TrainingItem;
        dispatch(setCurrentTraininig(currTraining));
        dispatch(setSelectedType(value));
        dispatch(setUpdateMethod(true));
        actionBtnHandler();
    };
    const goBackHandler = () => {
        setCreateTrainingVisible(true);
        setAddExersiceVisible(false);
        dispatch(setSelectedType(''));
        dispatch(setCurrentTraininig(null));
    };
    const openDrawer = () => {
        dispatch(setEditTraningMode(false));
        setDrawerVisible(true);
    };
    const closeDrawer = () => {
        const exersices = exersiceFields.filter((item) => item.name.trim() !== '');
        dispatch(setCurrentTraininigExersices(exersices));
        dispatch(resetExersiceFields(null));
        dispatch(setEditExersiceMode(false));
        dispatch(setEditTraningMode(false));
        setDrawerVisible(false);
    };
    const saveTraining = async () => {
        setSaveLoading(true);
        const training = currentTraining;
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
                    if (isPastDay) {
                        dispatch(setEditDisabledForTraining({ id: training._id as string }));
                        goBackHandler();
                    }
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
                    goBackHandler();
                }
            } catch (error) {
                setAddExersiceVisible(false);
                setCreateOrUpdateError(true);
                dispatch(setSelectedType(''));
                dispatch(setCurrentTraininig(null));
            } finally {
                setSaveLoading(false);
            }
        }
    };
    const onTypeSelect = () => {
        setActualTrainingsForDay();
        dispatch(setUpdateMethod(false));
    };

    const onCreateTrainingModalClose = () => {
        setCreateTrainingVisible(false);
        dispatch(setSelectedDate(''));
        dispatch(setSelectedType(''));
    };

    const onEditExersiceIconClick = () => {
        dispatch(setEditTraningMode(true));
        setDrawerVisible(true);
    };

    const fullCalendarCellClick = (e: MouseEvent, date: Moment) => {
        dispatch(setSelectedDate(date.toDate().toLocaleDateString('ru-Ru')));
        const isPast = date.isBefore(moment());
        dispatch(setIsPastDay(isPast));

        e.stopPropagation();
        const div = e.currentTarget as HTMLDivElement;
        const rect = div.getBoundingClientRect();
        if (rect.x + CREATE_MODAL_WIDTH >= window.innerWidth) {
            setPosX(rect.right - CREATE_MODAL_WIDTH - 10);
        } else {
            setPosX(rect.x);
        }
        setPosY(rect.y);
        goBackHandler();
    };

    const smallCalendarCellClick = (e: MouseEvent, date: Moment) => {
        if (date.month() === selectedMonth) {
            dispatch(setSelectedDate(date.toDate().toLocaleDateString('ru-Ru')));
            const isPast = date.isBefore(moment());
            dispatch(setIsPastDay(isPast));

            const div = e.currentTarget as HTMLDivElement;
            const rect = div.getBoundingClientRect();
            setPosX((window.innerWidth - CREATE_MODAL_WIDTH) / 2);
            setPosY(rect.bottom);
            goBackHandler();
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

    useEffect(() => {
        const resize = () => {
            const width = window.innerWidth;
            if (width < smallCalendarResolution) {
                setIsSmallCalendar(true);
            } else {
                setIsSmallCalendar(false);
            }
        };
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return (
        <>
            {createOrUpdateError && (
                <ErrorModalSmall
                    title='При сохранении данных произошла ошибка'
                    message='Придётся попробовать ещё раз.'
                    btnText='Закрыть'
                    iconColor='#FF4D4F'
                    clickHandler={() => setCreateOrUpdateError(false)}
                />
            )}
            <div className={style.contentContainer} ref={containerRef}>
                <ConfigProvider locale={ruRu}>
                    {isSmallCalendar ? (
                        <SmallCalendar
                            onCellSelect={onSelect}
                            cellClickHandler={smallCalendarCellClick}
                        />
                    ) : (
                        <FullscreenCalendar
                            onCellSelect={onSelect}
                            cellClickHandler={fullCalendarCellClick}
                        />
                    )}
                </ConfigProvider>
                <EditExersiceDrawer
                    open={drawerVisible}
                    bottomBtnText='Добавить ещё'
                    withDataInputs={false}
                    renderHeader={renderHeader}
                />

                {createTrainingVisible && (
                    <CreateTrainingModal
                        x={posX}
                        y={posY}
                        onClose={() => onCreateTrainingModalClose()}
                        actionHandler={actionBtnHandler}
                        editIconClick={onEditIconClick}
                    />
                )}
                {addExersiceVisible && (
                    <AddExerciseModal
                        x={posX}
                        y={posY}
                        loading={saveLoading}
                        onTypeSelect={onTypeSelect}
                        goBackHandler={goBackHandler}
                        onActionBtnClick={openDrawer}
                        onSecondaryBtnClick={saveTraining}
                        editIconClick={onEditExersiceIconClick}
                    />
                )}
            </div>
        </>
    );
};
