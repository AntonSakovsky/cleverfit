export type TrainingType = {
    name: string;
    key: string;
};

export type Exersise = {
    _id?: string;
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
};

export type Paramters = {
    repeat: boolean;
    period: number | null;
    jointTraining: boolean;
    participants: string[];
};

export type TrainingItem = {
    _id?: string;
    name: string;
    date: string;
    isImplementation: boolean;
    userId?: string;
    parameters?: Paramters;
    exercises: Exersise[];
};

export type GetTrainingResponse = {};

export type CreateTrainingBody = {
    name: string;
    date: string;
    isImplementation: boolean;
    parameters: Paramters;
    exercises: Exersise[];
};

export type UpdateTrainingBody = {
    name: string;
    date: string;
    isImplementation?: boolean;
    parameters?: Paramters;
    exercises: Exersise[];
};

export type DeleteTrainingPath = { trainingId: string };

export type ExersiceField = Exersise & { checked: boolean };

export type TrainingPalDto = {
    id: string;
    name: string;
    trainingType: string;
    imageSrc: string | null;
    avgWeightInWeek: number;
    inviteId: string;
    status: string;
};

export type UserJointDto = {
    id: string;
    name: string;
    trainingType: string;
    imageSrc: string;
    avgWeightInWeek: 0;
    status: JointStatus;
    inviteId: number;
};

export type GetJointListRequest = {
    status?: JointStatus;
    trainingType: string;
};

export type JointStatus = 'accepted' | 'pending' | 'rejected';
