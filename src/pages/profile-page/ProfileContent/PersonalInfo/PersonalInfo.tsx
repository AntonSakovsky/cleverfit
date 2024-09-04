import { DateInput } from '@components/inputs/DateInput';
import { TextInput } from '@components/inputs/TextInput';
import { UploadInput } from '@components/inputs/UploadInput/UploadInput';
import { FC } from 'react';
import style from './PersonalInfo.module.css';

type PersonalInfoProps = {
    imageSrc: string | undefined,
};

export const PersonalInfo: FC<PersonalInfoProps> = ({imageSrc}) => {
    return (
        <div className={style.personalInfo}>
            <h5 className={style.title}>Личная информация</h5>
            <div className={style.fieldsWrap}>
                <div className={style.upload}>
                    <UploadInput imageSrc={imageSrc} dataTestId='profile-avatar'/>
                </div>
                <div className={style.inputs}>
                    <TextInput name='firstName' placeholder='Имя' dataTestId='profile-name'/>
                    <TextInput name='lastName' placeholder='Фамилия'dataTestId='profile-surname' />
                    <DateInput placeholder='Дата рождения' dataTestId='profile-birthday'/>
                </div>
            </div>
        </div>
    );
};
