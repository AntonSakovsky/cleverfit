import { CalendarTwoTone, HeartFilled, IdcardOutlined, TrophyFilled } from '@ant-design/icons';
import { useLazyGetTrainingQuery } from '@api/trainingApi/trainingApi';
import { Modal403 } from '@components/modals/Modal403/Modal403';
import { routes } from '@constants/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import smallLogo from '@public/img/fit.svg';
import logo from '@public/img/logo.svg';
import { setLoading } from '@redux/reducers/LoaderSlice';
import { setTrainingList } from '@redux/reducers/TrainingSlice';
import { Badge, Layout, Menu } from 'antd';
import cn from 'classnames';
import { FC, useEffect, useLayoutEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CollapseButton } from './CollapseButton/CollapseButton';
import { ExitButton } from './ExitButton/ExitButton';
import s from './Sidebar.module.css';
import { trainingPageSelector } from '@redux/selectors';
const { Sider } = Layout;

const initWidth = () => {
    const width = window.innerWidth;
    if (width >= 461) {
        return [208, 64];
    } else {
        return [108, 0];
    }
};

const defineCollapse = () => {
    if (window.innerWidth <= 661) {
        return true;
    }
    return false;
};

interface ISidebarProps {}

export const Sidebar: FC<ISidebarProps> = () => {
    const [collapsed, setCollapsed] = useState(() => defineCollapse());
    const [width, setWidth] = useState<number>(() => initWidth()[0]);
    const [collapseWidth, setCollapseWidth] = useState<number>(initWidth()[1]);
    const [badgeOffset, setBadgeOffset] = useState(0);

    const [getTraining] = useLazyGetTrainingQuery();
    const { invitationsArr } = useAppSelector(trainingPageSelector);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [errorOnLoad, setErrorOnLoad] = useState(false);

    const onMenuItemClick = async (navigateTo: string) => {
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

    const modal403Clickhandler = () => {
        setErrorOnLoad(false);
        navigate(routes.MAIN);
    };

    useEffect(() => {
        const onResize = () => {
            const width = window.innerWidth;
            if (width >= 461) {
                setWidth(208);
                setCollapseWidth(64);
            }
            if (width <= 661) {
                setCollapsed(true);
            }
            if (width <= 460) {
                setWidth(108);
                setCollapseWidth(0);
            }
        };
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    useLayoutEffect(() => {
        !collapsed ? setBadgeOffset(0) : setBadgeOffset(13);
    }, [collapsed]);

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
            <div className={s.sideBarContainer}>
                <Sider
                    className={s.sider}
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    collapsedWidth={collapseWidth}
                    width={width}
                >
                    <Link to={routes.MAIN} className={s.logo}>
                        {collapsed ? (
                            <img src={smallLogo} alt='Fit' className={s.logoSmall} />
                        ) : (
                            <img src={logo} alt='CleverFit' className={s.logoLarge} />
                        )}
                    </Link>

                    <Menu
                        className={cn(s.sidebarMenu, {
                            [s.pl16]: !collapsed,
                        })}
                        selectedKeys={[location.pathname]}
                        mode='inline'
                        items={[
                            {
                                key: routes.CALENDAR,
                                icon: (
                                    <CalendarTwoTone
                                        twoToneColor={'061178'}
                                        className={s.calendar}
                                        style={{
                                            fontSize: 12.5,
                                        }}
                                    />
                                ),
                                label: 'Календарь',
                                onClick: () => onMenuItemClick(routes.CALENDAR),
                            },
                            {
                                key: routes.TRAINING,
                                icon: (
                                    <Badge
                                        className={s.badge}
                                        count={invitationsArr.length}
                                        size='small'
                                        offset={[0, badgeOffset]}
                                        data-test-id='notification-about-joint-training'
                                    >
                                        <HeartFilled
                                            style={{
                                                color: '#061178',
                                                fontSize: 12.5,
                                            }}
                                        />
                                    </Badge>
                                ),
                                label: 'Тренировки',
                                onClick: () => onMenuItemClick(routes.TRAINING),
                            },
                            {
                                key: routes.ACHIEVEMENTS,
                                icon: (
                                    <TrophyFilled
                                        style={{
                                            color: '#061178',
                                            fontSize: 12.5,
                                        }}
                                    />
                                ), 
                                label: <div data-test-id='sidebar-achievements'>Достижения</div>,
                                onClick: () => onMenuItemClick(routes.ACHIEVEMENTS),
                            },
                            {
                                key: routes.PROFILE,
                                icon: (
                                    <IdcardOutlined
                                        style={{
                                            color: '#061178',
                                            fontSize: 12.5,
                                        }}
                                    />
                                ),
                                label: 'Профиль',
                                onClick: () => navigate(routes.PROFILE),
                            },
                        ]}
                    />
                    <ExitButton collapsed={collapsed} />
                </Sider>
                <CollapseButton
                    collapsed={collapsed}
                    clickHandker={() => setCollapsed((prev) => !prev)}
                />
            </div>
        </>
    );
};
