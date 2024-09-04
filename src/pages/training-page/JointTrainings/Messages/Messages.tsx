import { RightOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Button } from 'antd';
import cn from 'classnames';
import { FC, useState } from 'react';
import { MessageCard } from './MessageCard/MessageCard';
import style from './Messages.module.css';
import { trainingPageSelector } from '@redux/selectors';

type MessagesProps = {
    onAccept: (id: string) => void;
    onReject: (id: string) => void;
};

export const Messages: FC<MessagesProps> = ({ onAccept, onReject }) => {
    const { invitationsArr } = useAppSelector(trainingPageSelector);
    const [btnText, setBtnText] = useState('Показать все сообщения');
    const [collapsed, setCollapsed] = useState(true);
    const [height, setHeight] = useState(0);
    const firstMessage = invitationsArr.slice(0, 1);

    const toggleExpand = () => {
        setCollapsed((prev) => !prev);
        if (btnText.includes('Показать')) {
            setBtnText('Скрыть все сообщения');
        } else {
            setBtnText('Показать все сообщения');
        }
    };

    return (
        <div className={style.messagesWrap}>
            <p className={style.messagesCount}>Новое сообщение ({invitationsArr.length})</p>
            <div className={style.firstMessage}>
                {firstMessage.map((invitation) => {
                    const accept = async () => {
                        onAccept(invitation._id);
                    };
                    const reject = async () => {
                        onReject(invitation._id);
                    };
                    return (
                        <MessageCard
                            date={invitation.createdAt}
                            imgSrc={invitation.from.imageSrc}
                            name={invitation.from.firstName}
                            surname={invitation.from.lastName}
                            training={invitation.training}
                            acceptAction={accept}
                            rejectAction={reject}
                            key={invitation._id}
                        />
                    );
                })}
            </div>
            {invitationsArr.length > 1 && (
                <>
                    <div
                        className={style.messagesList}
                        style={{ height: !collapsed ? height * (invitationsArr.length - 1) : 0 }}
                    >
                        {!collapsed
                            ? invitationsArr.slice(1).map((invitation) => {
                                  const accept = async () => {
                                      onAccept(invitation._id);
                                  };
                                  const reject = async () => {
                                      onReject(invitation._id);
                                  };
                                  return (
                                      <MessageCard
                                          date={invitation.createdAt}
                                          imgSrc={invitation.from.imageSrc}
                                          name={invitation.from.firstName}
                                          surname={invitation.from.lastName}
                                          training={invitation.training}
                                          acceptAction={accept}
                                          rejectAction={reject}
                                          key={invitation._id}
                                          heightSetter={setHeight}
                                      />
                                  );
                              })
                            : null}
                    </div>
                    <Button
                        type='link'
                        icon={
                            <RightOutlined
                                className={cn(style.icon, { [style.rotated]: !collapsed })}
                            />
                        }
                        className={style.showMoreBtn}
                        onClick={toggleExpand}
                    >
                        {btnText}
                    </Button>
                </>
            )}
        </div>
    );
};
