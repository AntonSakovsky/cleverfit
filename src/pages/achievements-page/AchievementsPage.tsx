import { useLazyGetTrainingListQuery } from '@api/catalogApi/catalogApi';
import { useLazyGetTrainingQuery } from '@api/trainingApi/trainingApi';
import { ErrorModalSmall } from '@components/modals/ErrorModalSmall/ErrorModalSmall';
import { Modal403 } from '@components/modals/Modal403/Modal403';
import { routes } from '@constants/constants';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { history } from '@redux/configure-store';
import { setFilter } from '@redux/reducers/AchievementsSlice';
import { setLoading } from '@redux/reducers/LoaderSlice';
import { setAllowedTrainingTypes, setTrainingList } from '@redux/reducers/TrainingSlice';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AchievementsContent } from './Content/AchievementsContent';
import { Header } from './Header/Header';

export const AchievementsPage = () => {
    const dispatch = useAppDispatch();
    const [getTrainings] = useLazyGetTrainingQuery();
    const [getAllowedTrainingList] = useLazyGetTrainingListQuery();
    const location = useLocation();
    const navigate = useNavigate();
    const [errorOnLoad, setErrorOnLoad] = useState(false);
    const [smallModalVisible, setSmallModalVisible] = useState(false);

    const fetchAllowedTypesList = async () => {
        setSmallModalVisible(false);
        try {
            dispatch(setLoading(true));
            const response = await getAllowedTrainingList(null).unwrap();
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

    const closeModalHandler = () => setSmallModalVisible(false);

    useEffect(() => {
        if (!location.state) {
            fetchTrainings();
        }
        fetchAllowedTypesList();
        history.push(location.pathname, null);

        return () => {
            dispatch(setFilter({ key: 'all', name: 'Все' }));
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

            <Header />
            <AchievementsContent />
        </>
    );
};
