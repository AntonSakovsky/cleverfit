import { CalendarTwoTone, HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { useLazyGetTrainingQuery } from '@api/trainingApi/trainingApi';
import { Modal403 } from '@components/modals/Modal403/Modal403';
import { routes } from '@constants/constants';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setLoading } from '@redux/reducers/LoaderSlice';
import { setTrainingList } from '@redux/reducers/TrainingSlice';
import { Layout, Typography } from 'antd';
import { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ActionCard } from './ActionCard/ActionCard';
import s from './MainContent.module.css';
import { WhiteBoard } from './WhiteBoard/WhiteBoard';

const { Content } = Layout;
const { Title } = Typography;

interface IMainContent {}

export const MainContent: FC<IMainContent> = () => {
    const dispatch = useAppDispatch();
    const [getTraining] = useLazyGetTrainingQuery();
    const navigate = useNavigate();
    const location = useLocation();
    const [errorOnLoad, setErrorOnLoad] = useState(false);

    const onCardClick = async (navigateTo: string) => {
        try {
            dispatch(setLoading(true));
            const response = await getTraining(null).unwrap();
            dispatch(setTrainingList(response));
            navigate(navigateTo, {
                state: {
                    from: location.pathname,
                },
            });
        } catch (error) {
            setErrorOnLoad(true);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const closeModalHandler = () => {
        setErrorOnLoad(false);
        navigate(routes.MAIN);
    };

    return (
        <>
            {errorOnLoad && (
                <Modal403
                    clickHandler={closeModalHandler}
                    message='Произошла ошибка, попробуйте ещё раз.'
                    title='Что-то пошло не так'
                    textBtn='Назад'
                    dataTestModalId='modal-no-review'
                />
            )}
            <Content className={s.content}>
                <WhiteBoard>
                    <span className={s.listTitle}>С CleverFit ты сможешь:</span>
                    <ul className={s.list}>
                        <li className={s.listItem}>
                            планировать свои тренировки на календаре, выбирая тип и уровень
                            нагрузки;
                        </li>
                        <li className={s.listItem}>
                            отслеживать свои достижения в разделе статистики, сравнивая свои
                            результаты с нормами и рекордами;
                        </li>
                        <li className={s.listItem}>
                            создавать свой профиль, где ты можешь загружать свои фото, видео
                            и отзывы о тренировках;
                        </li>
                        <li className={s.listItem}>
                            выполнять расписанные тренировки для разных частей тела, следуя
                            подробным инструкциям и советам профессиональных тренеров.
                        </li>
                    </ul>
                </WhiteBoard>
                <WhiteBoard>
                    <Title className={s.prompt} level={4}>
                        CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса.
                        Не откладывай на завтра — начни тренироваться уже сегодня!
                    </Title>
                </WhiteBoard>
                <div className={s.actionCardList}>
                    <ActionCard
                        icon={<HeartFilled style={{ fontSize: 11 }} />}
                        textBody='Расписать тренировки'
                        textButton='Тренировки'
                        onClick={() => onCardClick(routes.TRAINING)}
                        dataTestId='menu-button-training'
                    />
                    <ActionCard
                        icon={
                            <CalendarTwoTone
                                style={{ fontSize: 11 }}
                                twoToneColor={'#2F54EB'}
                                className={s.calendar}
                            />
                        }
                        textBody='Назначить календарь'
                        textButton='Календарь'
                        onClick={() => onCardClick(routes.CALENDAR)}
                        dataTestId='menu-button-calendar'
                    />
                    <ActionCard
                        icon={<IdcardOutlined style={{ fontSize: 14 }} />}
                        textBody='Заполнить профиль'
                        textButton='Профиль'
                        onClick={() => onCardClick(routes.ACHIEVEMENTS)}
                        dataTestId='menu-button-profile'
                    />
                </div>
            </Content>
        </>
    );
};
