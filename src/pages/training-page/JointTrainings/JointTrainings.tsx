import {
    useGetTrainingPalsQuery,
    useLazyGetUserJointTrainingListQuery,
} from '@api/catalogApi/catalogApi';
import { useAcceptInvitationMutation, useDeleteInvitationMutation } from '@api/inviteApi/inviteApi';
import { ErrorModalSmall } from '@components/modals/ErrorModalSmall/ErrorModalSmall';
import { JointTrainingModal } from '@components/modals/JointTrainingModal/JointTrainingModal';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useMostPopularTrainingType } from '@hooks/useMostPoularTrainingType';
import { setLoading } from '@redux/reducers/LoaderSlice';
import {
    deleteInvitationInArr,
    deletePartnersInArr,
    setJointTriningList,
    setPartnersArr,
} from '@redux/reducers/TrainingPageSlice';
import { AcceptInvitationDto } from '@type/invite/types';
import { useEffect, useState } from 'react';
import { ChooseJointType } from './ChooseJointType/ChooseJointType';
import { Messages } from './Messages/Messages';
import { PartnersList } from './PartnersList/PartnersList';
import { SearchUsersPanel } from './SearchUsersPanel/SearchUsersPanel';
import { trainingPageSelector } from '@redux/selectors';

export const JointTrainings = () => {
    const { partners, refetch } = useGetTrainingPalsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            partners: data?.pertners,
        }),
    });

    const [getJointTrainingList] = useLazyGetUserJointTrainingListQuery();
    const [acceptInvitation] = useAcceptInvitationMutation();
    const [deleteInvitation] = useDeleteInvitationMutation();

    const dispatch = useAppDispatch();
    const { jointTrainingList, currPartner, invitationsArr, partnersArr } =
        useAppSelector(trainingPageSelector);

    const [searchPanelVisible, setSearchPanelVisible] = useState(false);
    const [jointTypePanelVisible, setJointTypePanelVisible] = useState(true);
    const [parntersPabelVisisble, setParntersPabelVisisble] = useState(true);
    const [messagesVisible, setMessagesVisible] = useState(true);
    const [errorSmall, setErrorSmall] = useState(false);
    const [jointModal, setJointModal] = useState(false);
    const [isRandomBtnClicked, setIsRandomBtnClicked] = useState(false);

    const trainingType = useMostPopularTrainingType();

    const showSearchPanel = () => {
        setSearchPanelVisible(true);
        setJointTypePanelVisible(false);
        setParntersPabelVisisble(false);
        setMessagesVisible(false);
    };

    const showMainPanels = () => {
        setJointTypePanelVisible(true);
        setParntersPabelVisisble(true);
        setMessagesVisible(true);
        setSearchPanelVisible(false);
    };

    const onRandomBtnClick = async () => {
        dispatch(setLoading(true));
        setIsRandomBtnClicked(true);
        try {
            const list = await getJointTrainingList(null, false).unwrap();
            dispatch(setJointTriningList(list.userJointList));
            showSearchPanel();
        } catch (error) {
            setErrorSmall(true);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const onTypeBtnClick = async () => {
        dispatch(setLoading(true));
        setIsRandomBtnClicked(false);
        try {
            const list = await getJointTrainingList({ trainingType }, false).unwrap();
            dispatch(setJointTriningList(list.userJointList));
            showSearchPanel();
        } catch (error) {
            setErrorSmall(true);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const refetching = async () => {
        if (isRandomBtnClicked) {
            await onRandomBtnClick();
        } else {
            await onTypeBtnClick();
        }
    };

    const onHeaderGoBack = () => {
        showMainPanels();
    };

    const closeErrorModal = () => {
        setErrorSmall(false);
    };

    const onAccept = async (id: string) => {
        const acceptDto: AcceptInvitationDto = {
            id,
            status: 'accepted',
        };
        try {
            await acceptInvitation(acceptDto).unwrap();
            setJointTypePanelVisible(false);
            setMessagesVisible(false);
            refetch();
            dispatch(deleteInvitationInArr(id));
        } catch (error) {
            setErrorSmall(true);
        }
    };

    const onReject = async (id: string) => {
        try {
            await deleteInvitation({ inviteId: id }).unwrap();
            dispatch(deletePartnersInArr(id));
        } catch (error) {
            setErrorSmall(true);
        } finally {
            closeJointInfoModal();
            if (!searchPanelVisible) {
                showMainPanels();
            } else {
                refetching();
            }
        }
    };

    const openJointInfoModal = () => setJointModal(true);
    const closeJointInfoModal = () => setJointModal(false);

    useEffect(() => {
        if (partners) {
            dispatch(setPartnersArr(partners));
        }
    }, [partners]);
    return (
        <div>
            {jointModal && (
                <JointTrainingModal
                    closeHandler={closeJointInfoModal}
                    partner={currPartner}
                    onActionBtnClick={onReject}
                />
            )}
            {errorSmall && (
                <ErrorModalSmall
                    btnText='Обновить'
                    iconColor='#2F54EB'
                    message='Попробуйте ещё раз.'
                    title='При открытии данных произошла ошибка '
                    closable
                    clickHandler={refetching}
                    closeClickHandler={closeErrorModal}
                    dataTestId='modal-error-user-training-button'
                />
            )}
            {invitationsArr?.length !== 0 && messagesVisible && (
                <Messages onAccept={onAccept} onReject={onReject} />
            )}

            {jointTypePanelVisible && (
                <ChooseJointType
                    randomBtnClickHandler={onRandomBtnClick}
                    typeBtnClickHandler={onTypeBtnClick}
                />
            )}
            {parntersPabelVisisble && (
                <PartnersList
                    partners={partnersArr ? partnersArr : []}
                    extraAction={openJointInfoModal}
                />
            )}
            {searchPanelVisible && (
                <SearchUsersPanel
                    jointList={jointTrainingList ? jointTrainingList : []}
                    goBackHandler={onHeaderGoBack}
                    refetch={refetching}
                    onReject={onReject}
                />
            )}
        </div>
    );
};
