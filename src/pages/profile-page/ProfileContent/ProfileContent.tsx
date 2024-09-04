import { ProfileForm } from '@components/forms/ProfileForm';
import style from './ProfileContent.module.css';

export const ProfileContent = () => {
    return (
        <div className={style.content}>
            <ProfileForm />
        </div>
    );
};
