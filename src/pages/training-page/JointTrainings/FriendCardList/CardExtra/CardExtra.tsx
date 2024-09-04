import { CheckCircleFilled, InfoCircleOutlined } from '@ant-design/icons';
import { ActionButton } from '@components/ActionButton/ActionButton';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { UserJointDto } from '@type/calendar/types';
import { FC, ReactNode } from 'react';
import style from './CardExtra.module.css';
import { trainingPageSelector } from '@redux/selectors';

type CardExtraProps = {
    jointUser: UserJointDto;
    allDisabled?: boolean;
    extraAction: () => void;
    onReject: (id: string) => void;
};

export const CardExtra: FC<CardExtraProps> = ({
    jointUser,
    allDisabled,
    extraAction,
    onReject,
}) => {
    const { pendingUser } = useAppSelector(trainingPageSelector);
    let text = 'Создать тренировку';
    let disabled = false;
    let btnVariant: 'primary' | 'default' = 'primary';
    let bottomHint: ReactNode = null;
    let isAlt = false;
    let clickHandler: (id: string) => void = extraAction;
    switch (jointUser.status) {
        case 'accepted':
            text = 'Отменить тренировку';
            btnVariant = 'default';
            isAlt = true;
            clickHandler = onReject;
            bottomHint = (
                <>
                    тренировка одобрена{' '}
                    <CheckCircleFilled style={{ color: '#52C41A', fontSize: 14, marginLeft: 5 }} />
                </>
            );
            break;
        case 'pending':
            text = 'Создать тренировку';
            btnVariant = 'primary';
            disabled = true;
            bottomHint = <>ожидает подтверждения</>;
            break;
        case 'rejected':
            text = 'Создать тренировку';
            btnVariant = 'primary';
            disabled = true;
            bottomHint = (
                <>
                    тренировка отклонена{' '}
                    <InfoCircleOutlined style={{ color: '#8C8C8C', fontSize: 14, marginLeft: 5 }} />
                </>
            );
            break;
        default:
            break;
    }
    disabled = allDisabled ? true : disabled;
    disabled = jointUser.id === pendingUser ? true : disabled;
    bottomHint = jointUser.id === pendingUser ? <>ожидает подтверждения</> : bottomHint;
    return (
        <div>
            <ActionButton
                htmlType='button'
                isAlt={isAlt}
                text={text}
                type={btnVariant}
                fontSize={14}
                disabled={disabled}
                stretch
                onClick={() => clickHandler(String(jointUser.inviteId))}
            />
            <div className={style.bottomHint}>{bottomHint}</div>
        </div>
    );
};
