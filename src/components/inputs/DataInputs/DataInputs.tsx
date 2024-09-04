import { SelectOptions } from '@components/modals/EditExirsiceDrawer/EditExersiceDrawer';
import { periodSelectOptions } from '@constants/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setCurrentTrainingPeriod, setCurrentTrainingRepeat } from '@redux/reducers/TrainingSlice';
import { Checkbox, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FC } from 'react';
import style from './DataInputs.module.css';
import { MyDatePicker } from './DatePicker/MyDatePicker';
import { trainingSelector } from '@redux/selectors';
import { createLocaleDateString, definePeriodSelectDefault } from '@utils/dateUtils/dateUtils';

type DataInputsProps = {};

export const DataInputs: FC<DataInputsProps> = ({}) => {
    const { currentTraining } = useAppSelector(trainingSelector);
    const dispatch = useAppDispatch();

    const checkBoxChange = (e: CheckboxChangeEvent) => {
        const checked = e.target.checked;
        dispatch(setCurrentTrainingRepeat(checked));
        
        //добавление периода если он null
        if (!currentTraining?.parameters?.period && checked) {
            dispatch(setCurrentTrainingPeriod(+periodSelectOptions[0].value));
        }

        if (!checked) {
            dispatch(setCurrentTrainingPeriod(null));
        }
    };

    const changePeriod = (_: SelectOptions, option: SelectOptions) => {
        dispatch(setCurrentTrainingPeriod(Number(option.value)));
    };

    const period = currentTraining?.parameters?.period;
    let defaultValue = definePeriodSelectDefault(Number(period));

    return (
        <div className={style.dateInputsContainer}>
            <div className={style.firstRow}>
                <MyDatePicker date={createLocaleDateString(currentTraining?.date)} />
                <Checkbox
                    className={style.checkbox}
                    checked={currentTraining?.parameters?.repeat}
                    onChange={checkBoxChange}
                    data-test-id='modal-drawer-right-checkbox-period'
                >
                    С периодичностью
                </Checkbox>
            </div>
            {currentTraining?.parameters?.repeat && (
                <div className={style.secondRow}>
                    <Select
                        className={style.periodSelect}
                        value={defaultValue}
                        options={periodSelectOptions}
                        onSelect={changePeriod}
                        data-test-id='modal-drawer-right-select-period'
                    />
                </div>
            )}
        </div>
    );
};
