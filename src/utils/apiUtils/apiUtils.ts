import { UserJointDto } from "@type/calendar/types";

export const calculateStatusCount = (list: UserJointDto[])=> {
    return list.reduce(
        (acc, item) => (item.status === 'accepted' || item.status === 'pending' ? ++acc : acc),
        0,
    );
}