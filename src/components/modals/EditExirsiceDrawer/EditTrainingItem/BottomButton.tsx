import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { addExersiceField, deleteFields } from '@redux/reducers/TrainingSlice';
import { Button } from 'antd';
import cn from 'classnames';
import { FC } from 'react';
import style from './EditTrainingItem.module.css';
import { trainingSelector } from '@redux/selectors';

type BottomButtonProps = {
    hasDeleteBtn: boolean;
    mainBtnText: string;
};

export const BottomButton: FC<BottomButtonProps> = ({ hasDeleteBtn, mainBtnText }) => {
    const { exersiceFields } = useAppSelector(trainingSelector);
    const dispatch = useAppDispatch();
    const disabled = exersiceFields.every((exersice) => !exersice.checked);
    const addClickHandler = () => {
        dispatch(addExersiceField(null));
    };
    const deleteClickHandler = () => {
        dispatch(deleteFields(null));
    };

    return (
        <div className={style.bottomBtns}>
            <Button
                type='link'
                icon={<PlusOutlined />}
                onClick={addClickHandler}
                className={cn(style.buttonAdd, style.btn)}
            >
                {mainBtnText}
            </Button>
            {hasDeleteBtn && (
                <Button
                    type='link'
                    onClick={deleteClickHandler}
                    icon={<MinusOutlined />}
                    className={cn(style.buttonDelete, style.btn, { [style.disabled]: disabled })}
                    disabled={disabled}
                >
                    Удалить
                </Button>
            )}
        </div>
    );
};
