import { JointStatus, TrainingItem } from '@type/calendar/types';

export type JointTrainig = {
    _id: string;
    from: {
        _id: string;
        firstName: string;
        lastName: string;
        imageSrc: string;
    };
    training: TrainingItem;
    status: JointStatus;
    createdAt: string;
};

export type InvitationResponse = {
    invitations: JointTrainig[];
};
export type InvitationDto = {
    to: string;
    trainingId: string;
};

export type AcceptInvitationDto = {
    id: string;
    status: JointStatus;
};

export type DeleteInvitationPath = {
    inviteId: string;
};
