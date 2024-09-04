import { PlusOutlined } from '@ant-design/icons';
import { useCreaeteInvitationMutation } from '@api/inviteApi/inviteApi';
import { useCreateTrainingMutation } from '@api/trainingApi/trainingApi';
import { DrawerHeader } from '@components/modals/DrawerHeader/DrawerHeader';
import { EditExersiceDrawer } from '@components/modals/EditExirsiceDrawer/EditExersiceDrawer';
import { ErrorModalSmall } from '@components/modals/ErrorModalSmall/ErrorModalSmall';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    setInvitationInfo,
    setPendingUser,
    setSearchString,
} from '@redux/reducers/TrainingPageSlice';
import {
    resetExersiceFields,
    setCurrentTraininig,
    setCurrentTraininigExersices,
} from '@redux/reducers/TrainingSlice';
import { CreateTrainingBody, Paramters, TrainingItem, UserJointDto } from '@type/calendar/types';
import { InvitationDto } from '@type/invite/types';
import { Pagination } from 'antd';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { FriendCardList } from '../FriendCardList/FriendCardList';
import { SearchHeader } from './SearchHeader/SearchHeader';
import { trainingPageSelector, trainingSelector } from '@redux/selectors';

const pageSize = 12;

const statusSort = (a: UserJointDto, _: UserJointDto) => {
    if (a.status === 'accepted') return -1;
    if (a.status === 'rejected') return 1;
    return 0;
};

type SearchUsersPanelProps = {
    jointList: UserJointDto[];
    goBackHandler: () => void;
    refetch: () => Promise<void>;
    onReject: (id: string) => void;
};

export const SearchUsersPanel: FC<SearchUsersPanelProps> = ({
    jointList,
    goBackHandler,
    refetch,
    onReject,
}) => {
    const dispatch = useAppDispatch();
    const { searchString, invitationUserId } = useAppSelector(trainingPageSelector);
    const [currPage, setCurrPage] = useState(1);
    const [total, setTotal] = useState(jointList.length);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [data, setData] = useState<UserJointDto[]>(jointList.slice(currPage - 1, pageSize));
    const [createTraining] = useCreateTrainingMutation();
    const [createInvitation] = useCreaeteInvitationMutation();

    const { currentTraining, exersiceFields } = useAppSelector(trainingSelector);

    const openDrawer = () => {
        setDrawerVisible(true);
    };

    const closeDrawer = () => {
        dispatch(setCurrentTraininig(null));
        dispatch(resetExersiceFields(null));
        dispatch(
            setInvitationInfo({
                img: '',
                name: '',
                trainingType: '',
                id: '',
            }),
        );
        setDrawerVisible(false);
    };

    const changePage = (page: number, pageSize: number) => {
        setCurrPage(page);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        setData(
            jointList
                .slice(startIndex, endIndex)
                .sort((a, b) => a.name.localeCompare(b.name))
                .sort(statusSort),
        );
    };
    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        dispatch(setSearchString(value));
        if (value) {
            const filteredData = jointList.filter((item) => {
                return item.name.toLowerCase().includes(value);
            });
            let sortedData = filteredData.sort((a, b) => a.name.localeCompare(b.name));
            sortedData.sort(statusSort);
            setData(sortedData);
            setCurrPage(1);
            setTotal(filteredData.length);
        } else {
            setTotal(jointList.length);
            setData(
                jointList
                    .slice(0, pageSize)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .sort(statusSort),
            );
        }
    };

    const invite = async () => {
        const exersices = exersiceFields.filter((item) => item.name.trim() !== '');
        dispatch(setCurrentTraininigExersices(exersices));
        const training = { ...currentTraining } as TrainingItem;
        if (training) {
            training.exercises = exersices;
        }
        if (training) {
            let trainingId = '';
            try {
                const creatTrainingDto: CreateTrainingBody = {
                    date: training.date,
                    exercises: training.exercises,
                    isImplementation: false,
                    name: training.name,
                    parameters: training.parameters as Paramters,
                };
                const createdTraining = await createTraining(creatTrainingDto).unwrap();
                trainingId = createdTraining._id as string;

                await refetch();

                const invitationDto: InvitationDto = {
                    to: invitationUserId,
                    trainingId,
                };
                await createInvitation(invitationDto).unwrap();
                dispatch(setPendingUser(invitationUserId));
            } catch (error) {
                openErrorModal();
            } finally {
                closeDrawer();
            }
        }
    };

    const closeErrorModal = () => setErrorModal(false);
    const openErrorModal = () => setErrorModal(true);

    const renderHeader = () => {
        return (
            <DrawerHeader
                icon={<PlusOutlined />}
                text='Совместная тренировка'
                onClick={closeDrawer}
            />
        );
    };

    useEffect(() => {
        let jointListCopy = [...jointList];
        if (searchString) {
            jointListCopy = jointListCopy.filter((item) => {
                return item.name.toLowerCase().includes(searchString);
            });
            jointListCopy = jointListCopy.sort((a, b) => a.name.localeCompare(b.name));
            jointListCopy.sort(statusSort);
            setData(jointListCopy);
            setCurrPage(1);
        } else {
            setData(
                jointListCopy
                    .slice((currPage - 1) * pageSize, pageSize)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .sort(statusSort),
            );
        }
        setTotal(jointListCopy.length);
    }, [jointList]);

    useEffect(() => {
        return () => {
            dispatch(setSearchString(''));
            dispatch(setPendingUser(''));
        };
    }, []);

    return (
        <div>
            {errorModal && (
                <ErrorModalSmall
                    btnText='Закрыть'
                    clickHandler={closeErrorModal}
                    iconColor='#FF4D4F'
                    message='Придётся попробовать ещё раз'
                    title='При сохранении данных произошла ошибка'
                    dataTestId='modal-error-user-training-button'
                />
            )}
            <EditExersiceDrawer
                renderHeader={renderHeader}
                open={drawerVisible}
                bottomBtnText='Добавить ещё'
                withDataInputs
                withInvitationInfo
                footerBtnText='Отправить приглашение'
                footerBtnClickHandler={invite}
            />
            <SearchHeader
                goBack={goBackHandler}
                onChange={onSearchInputChange}
                searchValue={searchString}
            />
            <FriendCardList extraCardAction={openDrawer} jointList={data} onReject={onReject} />
            {total !== 0 && (
                <Pagination
                    pageSize={pageSize}
                    size='small'
                    current={currPage}
                    total={total}
                    onChange={changePage}
                />
            )}
        </div>
    );
};
