import { useLazyGetTrainingListQuery } from '@api/catalogApi/catalogApi';
import { useLazyGetTrainingQuery } from '@api/trainingApi/trainingApi';
import { ErrorModalSmall } from '@components/modals/ErrorModalSmall/ErrorModalSmall';
import { Modal403 } from '@components/modals/Modal403/Modal403';
import { routes } from '@constants/constants';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { history } from '@redux/configure-store';
import { setLoading } from '@redux/reducers/LoaderSlice';
import {
    setAllowedTrainingTypes,
    setIsPastDay,
    setSelectedDate,
    setSelectedType,
    setTrainingList,
} from '@redux/reducers/TrainingSlice';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CalendarContent } from './Content/CalendarContent';
import { CalendarHeader } from './Header/CalendarHeader';

export const CalendarPage = () => {
    const [getTrainingList] = useLazyGetTrainingListQuery();
    const dispatch = useAppDispatch();
    const [smallModalVisible, setSmallModalVisible] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [errorOnLoad, setErrorOnLoad] = useState(false);
    const [getTrainings] = useLazyGetTrainingQuery();

    const closeModalHandler = () => {
        setSmallModalVisible(false);
    };

    const fetchAllowedTypesList = async () => {
        setSmallModalVisible(false);
        try {
            dispatch(setLoading(true));
            const response = await getTrainingList(null).unwrap();
            dispatch(setAllowedTrainingTypes(response));
            dispatch(setLoading(false));
        } catch (error) {
            setSmallModalVisible(true);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const fetchTrainings = async () => {
        try {
            dispatch(setLoading(true));
            const response = await getTrainings(null).unwrap();
            dispatch(setTrainingList(response));
        } catch (error) {
            setErrorOnLoad(true);
        } finally {
            dispatch(setLoading(false));
        }
    };
    const modal403Clickhandler = () => {
        setErrorOnLoad(false);
        navigate(routes.MAIN);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (!location.state) {
            fetchTrainings();
        }
        fetchAllowedTypesList();
        history.push(location.pathname, null);

        return () => {
            dispatch(setSelectedType(''));
            dispatch(setSelectedDate(''));
            dispatch(setIsPastDay(false));
        };
    }, []);
    return (
        <>
            {errorOnLoad && (
                <Modal403
                    clickHandler={modal403Clickhandler}
                    message='Произошла ошибка, попробуйте ещё раз.'
                    title='Что-то пошло не так'
                    textBtn='Назад'
                    dataTestId='modal-no-review'
                />
            )}
            {smallModalVisible && (
                <ErrorModalSmall
                    title='При открытии данных произошла ошибка'
                    message='Попробуйте ещё раз.'
                    btnText='Обновить'
                    closable
                    iconColor='#2F54EB'
                    clickHandler={fetchAllowedTypesList}
                    closeClickHandler={closeModalHandler}
                />
            )}

            <CalendarHeader />
            <CalendarContent />
        </>
    );
};
