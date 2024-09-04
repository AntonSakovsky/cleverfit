export type UserInfoDto = {
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
    imgSrc: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
    darkTheme?: boolean,
    tariff?: Tarif;
};

export type Tarif = {
    tariffId: string;
    expired: string;
};

export type UpdateUserDto = {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    birthday?: string;
    imgSrc?: string;
    readyForJointTraining?: boolean;
    sendNotification?: boolean;
};
