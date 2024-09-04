import { ExersiceInput } from "@components/inputs/ExersiceInput";
import { useAppSelector } from "@hooks/typed-react-redux-hooks";
import { ExersiceField } from "@type/calendar/types";
import { FC } from "react";
import style from './EditTrainingItem.module.css';
import { ExersiceSetting } from "./ExersiceSetting";
import { trainingSelector } from "@redux/selectors";

type EditTrainingItemProps = {
    exersice: ExersiceField | null,
    ind: number
}

export const EditTrainingItem: FC<EditTrainingItemProps> = ({exersice, ind}) => {
    const {editTrainingMode} = useAppSelector(trainingSelector)
    const value = exersice ? exersice.name : '';
    const approaches = exersice ? exersice.approaches : 1;
    const weight = exersice ? exersice.weight : 0;
    const replays = exersice ? exersice.replays : 1;
    return(
        <div className={style.editItem}>
            <ExersiceInput value={value} ind={ind} selectable={editTrainingMode} checked={exersice?.checked}/>
            <ExersiceSetting ind={ind} approaches={approaches} replays={replays} weight={weight} />
        </div>
    )
}