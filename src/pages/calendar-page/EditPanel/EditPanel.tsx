import { EditFilled, EditOutlined } from "@ant-design/icons";
import { indicatorColors } from "@constants/constants";
import { Button } from "antd";
import cn from 'classnames';
import { FC } from "react";
import { ColoredTrainType } from "../ColoredTrainType/ColoredTrainType";
import style from './EditPanel.module.css';

type EditPanelProps = {
    name: string,
    forExersice: boolean;
    ind: number,
    isImplemented?: boolean;
    clickHandler: ((value: string) => void) | (() => void)
}

export const EditPanel: FC<EditPanelProps> = ({ name, forExersice, ind, isImplemented = false, clickHandler }) => {
    return (
        <div className={style.panel}>
            {
                !forExersice ? <ColoredTrainType color={indicatorColors[name]} text={name} smallTextSize={false} disabled={isImplemented} />
                    :
                    <div className={cn(style.text, style.lighter)}>{name}</div>
            }
            <Button
                className={style.btn}
                disabled={isImplemented}
                icon={!isImplemented ? <EditOutlined style={{ color:'#2F54EB' }} /> : <EditFilled style={{color: "#BFBFBF"}}/> }
                onClick={() => clickHandler(name)}
                data-test-id={`modal-update-training-edit-button${ind}`}></Button>
        </div>
    )
}