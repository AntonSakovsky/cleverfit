import { useGetFeedbacksQuery } from '@api/feedbackApi/feedbackApi';
import { NoFeedbacksCard } from '@components/cards/NoFeedbacks/NoFeedbacksCard';
import { Loader } from '@components/loader/Loader';
import { AddFeedbackModal } from '@components/modals/AddFeedbackModal';
import { ErrorModal } from '@components/modals/ErrorModal/ErrorModal';
import { Modal403 } from '@components/modals/Modal403/Modal403';
import { ModalSuccess } from '@components/modals/ModalSuccess/ModalSuccess';
import { routes } from '@constants/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    setDataNotSavedModal,
    setError403,
    setLimit,
    setSuccessModal,
} from '@redux/reducers/FeedbackSlice';
import { Content } from 'antd/lib/layout/layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FeedbackFooter } from '../Footer/FeedbackFooter';
import { FeedbackList } from '../List/FeedbackList';
import s from './FeedbackContent.module.css';

export const FeedbackContent = () => {
    const { isLoading, isError, data = [] } = useGetFeedbacksQuery(null);
    const dispatch = useAppDispatch();
    const { successModal, limit, dataNotSavedModal } = useAppSelector((state) => state.feedbacks);
    const navigate = useNavigate();

    const [secondaryText, setSecondaryText] = useState('Развернуть все отзывы');
    const [isOpen, setIsOpen] = useState(false);

    const toggleExpand = () => {
        if (limit === 4) {
            dispatch(setLimit(-1));
        } else {
            dispatch(setLimit(4));
        }

        if (secondaryText.includes('Развернуть')) {
            setSecondaryText('Свернуть все отзывы');
        } else {
            setSecondaryText('Развернуть все отзывы');
        }
    };
    const showAddFeedbackModal = () => {
        setIsOpen(true);
    };

    const writeFeedbackAgain = () => {
        dispatch(setDataNotSavedModal(false));
        setIsOpen(true);
    };

    const closeErrorModal = () => {
        dispatch(setDataNotSavedModal(false));
    };

    const clickModal403Handler = () => {
        dispatch(setError403(false));
        navigate(routes.MAIN);
    };

    const successModalClick = () => {
        dispatch(setSuccessModal(false));
        navigate(routes.FEEDBACKS);
    };

    const openAddFeedbackModal = ()=> setIsOpen(false);

    return (
        <>
            {isError && (
                <Modal403
                    clickHandler={clickModal403Handler}
                    message='Произошла ошибка, попробуйте ещё раз.'
                    title='Что-то пошло не так'
                    textBtn='Назад'
                    dataTestId='check-back-button'
                />
            )}
            {isLoading && <Loader />}
            <Content className={s.content}>
                {data.length !== 0 ? (
                    <FeedbackList data={data} limit={limit} />
                ) : !isLoading ? (
                    <NoFeedbacksCard clickHandler={showAddFeedbackModal} />
                ) : null}
                {data.length !== 0 && (
                    <FeedbackFooter
                        primaryBtnText={'Написать отзыв'}
                        secondaryBtnText={secondaryText}
                        primaryBtnClickHandler={showAddFeedbackModal}
                        secondaryBtnClickHandler={toggleExpand}
                    />
                )}
                {successModal && <ModalSuccess clickHandler={successModalClick} />}
                {dataNotSavedModal && (
                    <ErrorModal
                        title='Данные не сохранились'
                        subtitle='Что-то пошло не так. Попробуйте ещё раз.'
                        primaryBtnText='Написать отзыв'
                        secondaryBtnText='Закрыть'
                        primaryBtnClickHandker={writeFeedbackAgain}
                        secondaryBtnClickHandker={closeErrorModal}
                    />
                )}
                <AddFeedbackModal isOpen={isOpen} closeHandle={openAddFeedbackModal} />
            </Content>
        </>
    );
};
