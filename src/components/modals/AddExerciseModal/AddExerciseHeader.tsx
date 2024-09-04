import { ArrowLeftOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks";
import { setCurrentTraininig, setSelectedType } from "@redux/reducers/TrainingSlice";
import { TrainingItem, TrainingType } from "@type/calendar/types";
import { Select } from "antd";
import { FC } from "react";
import style from './AddExerciseModal.module.css';
import { trainingSelector } from "@redux/selectors";

type AddExerciseHeaderProps = {
    onClick: ()=> void,
    onTypeSelect: ()=>void,
    items: TrainingType[],
}
export const AddExerciseHeader: FC<AddExerciseHeaderProps> = ({onClick, onTypeSelect, items}) => {
    const dispatch = useAppDispatch(); 
    const {selectedType, actualTrainings, trainingList, selectedDate, isPastDay} = useAppSelector(trainingSelector);
    const onSelect = (_: string, selectObj: {label: string, value: string})=>{
        dispatch(setSelectedType(selectObj.label));
        const currTraining = trainingList?.find(training=> training.name === selectObj.label 
            && new Date(training.date).toLocaleDateString('ru-Ru') === selectedDate)
        
        dispatch(setCurrentTraininig(currTraining));
        onTypeSelect();
    }
    let options = items.map(item=> ({label: item.name, value: item.key}));
    let defaultValue: string = '';
    if(isPastDay){
        const pastTrainings = trainingList?.filter(training=> new Date(training.date).toLocaleDateString('ru-Ru') === selectedDate) as TrainingItem[];
        const notImplementedTraings = pastTrainings.filter(training => !training.isImplementation);
        options = options.filter(option=> notImplementedTraings.some(training=> training.name === option.label))
        defaultValue = options.find(option=> option.label === selectedType)?.label as string;
    }else{
        defaultValue = options.find(option=> option.label === selectedType)?.label as string;
        options = options.filter(option=> !actualTrainings.some(actual=> actual.name === option.label))
    }
    
    return (
        <div className={style.headerContainer}>
            <div className={style.backArrow} onClick={onClick}>
                <ArrowLeftOutlined data-test-id='modal-exercise-training-button-close'/>
            </div>
            <Select
                className={style.select}
                defaultValue={defaultValue ?? "Выбор типа тренировки"}
                options={options}
                onSelect={onSelect}
                data-test-id='modal-create-exercise-select'
            />
        </div>
    )
}