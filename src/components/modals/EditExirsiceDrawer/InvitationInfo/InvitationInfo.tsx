import { UserOutlined } from '@ant-design/icons';
import { indicatorColors } from '@constants/constants';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Avatar } from 'antd';
import style from './InvitationInfo.module.css';
import { trainingPageSelector } from '@redux/selectors';

export const InvitationInfo = () => {
    const { invitationImg, invitationName, invitationTrainingType } = useAppSelector(trainingPageSelector);

    const nameArr = invitationName.split(' ');

    return (
        <div className={style.infoContainer}>
            <div className={style.userInfo}>
                <div className={style.img}>
                    <Avatar
                        size={42}
                        src={invitationImg}
                        icon={!invitationImg ? <UserOutlined style={{ color: 'black' }} /> : null}
                        className={style.avatar}
                    />
                </div>
                <div style={{ display: 'none' }}>{invitationName}</div>
                <div className={style.name}>
                    <p>{nameArr[0]}</p>
                    <p>{nameArr[1]}</p>
                </div>
            </div>
            <div className={style.trainType}>
                <div
                    className={style.indicator}
                    style={{ backgroundColor: indicatorColors[invitationTrainingType] }}
                ></div>
                <p className={style.text}>{invitationTrainingType}</p>
            </div>
        </div>
    );
};
