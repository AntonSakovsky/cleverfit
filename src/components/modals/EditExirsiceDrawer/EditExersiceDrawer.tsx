import { ActionButton } from '@components/ActionButton/ActionButton';
import { DataInputs } from '@components/inputs/DataInputs/DataInputs';
import { BottomButton } from '@components/modals/EditExirsiceDrawer/EditTrainingItem/BottomButton';
import { drawerPlacement } from '@constants/constants';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingSelector } from '@redux/selectors';
import { Divider, Drawer } from 'antd';
import cn from 'classnames';
import { CSSProperties, FC, useEffect, useState } from 'react';
import style from './EditExersiceDrawer.module.css';
import { EditExersiceList } from './EditExersiceList/EditExersiceList';
import { InvitationInfo } from './InvitationInfo/InvitationInfo';
import { TrainingInfo } from './TrainingInfo/TrainingInfo';
import { TrainingTypeSelect } from './TrainingTypeSelect/TrainingTypeSelect';
import { useOptionsFilter } from './useOptiosFilter';

const mobileResolution = 461;
const ru = 'ru-Ru';

export type SelectOptions = {
    label: string;
    value: string;
};

type EditExersiceDrawerProps = {
    bottomBtnText: string;
    withDataInputs: boolean;
    open: boolean;
    withInvitationInfo?: boolean;
    footerBtnText?: string;
    renderHeader: () => JSX.Element;
    footerBtnClickHandler?: () => void;
};

export const EditExersiceDrawer: FC<EditExersiceDrawerProps> = ({
    bottomBtnText,
    withDataInputs,
    withInvitationInfo,
    open,
    footerBtnText,
    renderHeader,
    footerBtnClickHandler,
}) => {
    const {
        exersiceFields,
        selectedDate,
        selectedType,
        editTrainingMode,
        isPastDay,
        allowedTrainigTypes,
        trainingList,
        currentTraining,
    } = useAppSelector(trainingSelector);

    const [placement, setPlacement] = useState<drawerPlacement>(
        window.innerWidth > mobileResolution ? drawerPlacement.RIGHT : drawerPlacement.BOTTOM,
    );
    const [drawerStyle, setDrawerStyle] = useState<CSSProperties>({});
    const [disabled, setDisabled] = useState(true);

    let options = allowedTrainigTypes?.map((item) => ({
        label: item.name,
        value: item.key,
    })) as SelectOptions[];

    options = useOptionsFilter(options);

    useEffect(() => {
        const training = trainingList?.find(
            (trainingItem) =>
                trainingItem.name === currentTraining?.name &&
                new Date(trainingItem.date).toLocaleDateString(ru) ===
                    new Date(currentTraining?.date as string).toLocaleDateString(ru),
        );
        const exersices = exersiceFields.filter((exersice) => exersice.name);
        let shouldDisable = true;

        if (exersices.length !== 0) {
            shouldDisable = false;
        }

        if (training?.parameters?.period !== currentTraining?.parameters?.period) {
            shouldDisable = false;
        }

        if (!currentTraining?.date) {
            shouldDisable = true;
        }

        setDisabled(shouldDisable);
    }, [exersiceFields, currentTraining?.date, currentTraining?.name]);

    useEffect(() => {
        const resize = () => {
            const width = window.innerWidth;
            if (width <= mobileResolution) {
                setPlacement(drawerPlacement.BOTTOM);
                setDrawerStyle({
                    borderTopLeftRadius: 24,
                    borderBottomLeftRadius: 24,
                    height: '90vh',
                });
            } else {
                setPlacement(drawerPlacement.RIGHT);
                setDrawerStyle({
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                    height: '100vh',
                    width: 408,
                });
            }
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return (
        <Drawer
            className={cn(style.drawer, style.drawerElem)}
            title={null}
            open={open}
            closable={false}
            bodyStyle={{ padding: '0' }}
            contentWrapperStyle={drawerStyle}
            placement={placement}
            destroyOnClose
            data-test-id='modal-drawer-right'
        >
            <div className={style.body}>
                <div className={style.content}>
                    {renderHeader()}

                    <div
                        className={cn(style.mainContent, {
                            [style.withDataInputs]: withDataInputs,
                        })}
                    >
                        {withInvitationInfo && <InvitationInfo />}
                        {withDataInputs ? (
                            <div className={style.dataInputsWrap}>
                                <TrainingTypeSelect options={options} />
                                <DataInputs />
                            </div>
                        ) : (
                            <TrainingInfo date={selectedDate} type={selectedType} />
                        )}
                        <EditExersiceList list={exersiceFields} />
                        <BottomButton mainBtnText={bottomBtnText} hasDeleteBtn={editTrainingMode} />
                    </div>
                </div>

                <div className={cn(style.info, { [style.hidden]: !isPastDay })}>
                    <p>После сохранения внесенных изменений</p>
                    <p>отредактировать проведенную тренировку</p>
                    <p>будет невозможно</p>
                </div>

                {withDataInputs && (
                    <div className={style.footer}>
                        <Divider className={style.divider} />
                        <div className={style.actionBtnWrap}>
                            <ActionButton
                                htmlType='button'
                                text={footerBtnText as string}
                                type='primary'
                                disabled={disabled}
                                fontSize={14}
                                stretch
                                onClick={footerBtnClickHandler}
                            />
                        </div>
                    </div>
                )}
            </div>
        </Drawer>
    );
};
