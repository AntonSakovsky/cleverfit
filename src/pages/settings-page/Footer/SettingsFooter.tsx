import { ActionButton } from '@components/ActionButton/ActionButton';
import { AddFeedbackModal } from '@components/modals/AddFeedbackModal';
import { ModalSuccess } from '@components/modals/ModalSuccess/ModalSuccess';
import { routes } from '@constants/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setSuccessModal } from '@redux/reducers/FeedbackSlice';
import { Button } from 'antd';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './SettingsFooter.module.css';

export const SettingsFooter = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [modalOpen, setModalOpen] = useState(false);
    const { successModal } = useAppSelector((state) => state.feedbacks);
    const dispatch = useAppDispatch();

    const modalClickHandler = () => {
        dispatch(setSuccessModal(false));
    };

    const showFeedbacks = () => {
        navigate(routes.FEEDBACKS, {
            state: {
                from: location.pathname,
            },
        });
    };

    const actionBtnClickHandler = ()=> setModalOpen(true);

    return (
        <>
            {successModal && <ModalSuccess clickHandler={modalClickHandler} />}
            <AddFeedbackModal isOpen={modalOpen} closeHandle={() => setModalOpen(false)} />
            <div className={style.footer}>
                <div className={style.btnWrap}>
                    <div className={style.actionBtnWrap}>
                        <ActionButton
                            htmlType='button'
                            isAlt={false}
                            text='Написать отзыв'
                            type='primary'
                            fontSize={14}
                            onClick={actionBtnClickHandler}
                            stretch
                        />
                    </div>
                    <Button type='link' onClick={showFeedbacks} className={style.moreFeedbacksBtn}>
                        Смотреть все отзывы
                    </Button>
                </div>
            </div>
        </>
    );
};
