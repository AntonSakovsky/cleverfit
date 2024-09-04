import { EmailInput } from '@components/inputs/EmailInput';
import { PasswordInput } from '@components/inputs/PasswordInput';
import { FC } from 'react';
import style from './PrivacyAndAuthorization.module.css';

type PrivacyAndAuthorizationProps = {
    passwordRequired: boolean;
};

export const PrivacyAndAuthorization: FC<PrivacyAndAuthorizationProps> = ({ passwordRequired }) => {
    return (
        <div className={style.privacyAndAuth}>
            <h5 className={style.title}>Приватность и авторизация</h5>
            <EmailInput dataTestId='profile-email' />
            <PasswordInput
                confirmPassword={false}
                placeholder='Пароль'
                requiredField={passwordRequired}
                dataTestId='profile-password'
            />
            <PasswordInput
                confirmPassword
                placeholder='Повторите пароль'
                requiredField={passwordRequired}
                dataTestId='profile-repeat-password'
            />
        </div>
    );
};
