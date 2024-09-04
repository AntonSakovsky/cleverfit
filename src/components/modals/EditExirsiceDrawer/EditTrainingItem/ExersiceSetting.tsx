import { useAppDispatch } from "@hooks/typed-react-redux-hooks";
import { changeExerciseApproaches, changeExersiceReplays, changeExersiceWeight } from "@redux/reducers/TrainingSlice";
import { InputNumber } from "antd";
import cn from 'classnames';
import { FC } from "react";
import style from './EditTrainingItem.module.css';

type ExersiceSettingProps = {
    ind: number,
    approaches: number,
    weight: number,
    replays: number,
}

export const ExersiceSetting: FC<ExersiceSettingProps> = ({ ind, approaches, replays, weight }) => {
    const dispatch = useAppDispatch();
    const changeApproachesHandler = (value: number | null) => {
        dispatch(changeExerciseApproaches({
            ind,
            value: Number(value),
        }))
    }

    const changeWeightHandler = (value: number | null) => {
        dispatch(changeExersiceWeight({
            ind,
            value: Number(value),
        }))
    }

    const changeReplaysHandler = (value: number | null) => {
        dispatch(changeExersiceReplays({
            ind,
            value: Number(value),
        }))
    }

    return (
        <div className={style.settings}>
            <div className={cn(style.settingItem, style.longer)}>
                <span className={style.label}>Подходы</span>
                <InputNumber addonBefore={'+'}
                    value={approaches}
                    min={1}
                    className={style.input}
                    onChange={changeApproachesHandler}
                    data-test-id={`modal-drawer-right-input-approach${ind}`}
                />
            </div>
            <div className={style.weightAmountWrap}>
                <div className={style.settingItem}>
                    <span className={style.label}>Вес, кг</span>
                    <InputNumber value={weight}
                        min={0}
                        className={style.input}
                        onChange={changeWeightHandler}
                        data-test-id={`modal-drawer-right-input-weight${ind}`} />
                </div>
                <span className={style.times}>x</span>
                <div className={style.settingItem}>
                    <span className={style.label}>Количество</span>
                    <InputNumber value={replays}
                        min={1}
                        className={style.input}
                        onChange={changeReplaysHandler}
                        data-test-id={`modal-drawer-right-input-quantity${ind}`} />
                </div>
            </div>
        </div>
    )
}