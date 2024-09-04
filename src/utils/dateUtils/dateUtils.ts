import { periodSelectOptions } from '@constants/constants';
import moment, { Moment } from 'moment';

export const createLocaleDateString = (date: any) => {
    let returnedDate: Moment | undefined = undefined;
    if (date && !isNaN(Number(date))) {
        returnedDate = moment(date);
    }
    if (date && typeof date === 'string') {
        returnedDate = moment(date, moment.ISO_8601);
    }

    return returnedDate;
};

export const definePeriodSelectDefault = (period: number) => {
    let result = periodSelectOptions.find((item) => Number(item.value) === period);

    return result ? result : periodSelectOptions[0];
};
