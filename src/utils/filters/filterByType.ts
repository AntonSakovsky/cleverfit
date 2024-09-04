import { TrainingItem, TrainingType } from "@type/calendar/types";

export const filterByType = (list: TrainingItem[], type: TrainingType)=> {
    if(type.name === 'Все') return list
    return list.filter(item => item.name === type.name);
}