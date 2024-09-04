import { useAppDispatch } from "@hooks/typed-react-redux-hooks";
import { changeExersiceName, setFieldChecked } from "@redux/reducers/TrainingSlice";
import { Checkbox, Input } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React, { FC } from "react";
import style from './Input.module.css';

type ExersiceInputProps = {
    selectable: boolean,
    value: string,
    ind: number,
    checked?: boolean,
}

export const ExersiceInput: FC<ExersiceInputProps> = ({ selectable, value, ind, checked }) => {
    const dispatch = useAppDispatch();
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeExersiceName({
            ind,
            value: e.target.value,
        }));
    }

    const onCheck = (e: CheckboxChangeEvent) => {
        dispatch(setFieldChecked({
            ind,
            value: e.target.checked,
        }));
    }

    return (
        <>
            {selectable ?
                <div className={style.exersiceInputWrap}>
                    <Input className={style.exersiceInput}
                        addonAfter={<Checkbox type="checkbox"
                            className={style.checkbox}
                            checked={checked}
                            onChange={onCheck}
                            data-test-id={`modal-drawer-right-checkbox-exercise${ind}`}></Checkbox>}
                        placeholder="Упражненеие"
                        value={value}
                        onChange={onChange}
                        data-test-id={`modal-drawer-right-input-exercise${ind}`} />
                </div>
                :
                <div className={style.exersiceInputWrap}>
                    <Input className={style.exersiceInput}
                        value={value}
                        placeholder="Упражненеие"
                        onChange={onChange}
                        data-test-id={`modal-drawer-right-input-exercise${ind}`} />
                </div>
            }
        </>


    )
}