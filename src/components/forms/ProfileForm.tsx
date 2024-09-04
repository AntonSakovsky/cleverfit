import { useUpdateUserMutation } from '@api/userApi/userApi';
import { ActionButton } from '@components/ActionButton/ActionButton';
import { CustomAlert } from '@components/Alert/CustomAlert';
import { ErrorModalSmall } from '@components/modals/ErrorModalSmall/ErrorModalSmall';
import { basePhotoUrl } from '@constants/constants';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { PersonalInfo } from '@pages/profile-page/ProfileContent/PersonalInfo/PersonalInfo';
import { PrivacyAndAuthorization } from '@pages/profile-page/ProfileContent/PrivacyAndAuthorization/PrivacyAndAuthorization';
import { setPasswordRequired, setProfileData } from '@redux/reducers/ProfileSlice';
import { setUserInfo } from '@redux/reducers/UserSlice';
import { UpdateUserDto } from '@type/user/types';
import { Form } from 'antd';
import { UploadFile } from 'antd/lib/upload';
import cn from 'classnames';
import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';
import style from './Form.module.css';

type FormData = {
    birthDate: Moment;
    confirmPassword: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    uploadImage: { file: UploadFile<any>; fileList: UploadFile<any>[] };
};

export const ProfileForm = () => {
    const { birthday, email, firstName, lastName, passwordRequired, imgSrc } = useAppSelector(
        (state) => state.profile,
    );
    const { imgSrc: currentImgSrc } = useAppSelector((state) => state.user);
    const [updateUser] = useUpdateUserMutation();
    const [disabled, setDisabled] = useState(true);
    const [saveError, setSaveError] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const handleFormChange = () => {
        const formValues = form.getFieldsValue() as FormData;
        const formDate = moment(formValues.birthDate, moment.ISO_8601)
            .toDate()
            .toLocaleDateString('ru-Ru');
        const storeDate = moment(birthday, moment.ISO_8601).toDate().toLocaleDateString('ru-Ru');
        let hasChange = false;
        if (formValues.email !== email) {
            hasChange = true;
        }
        if (formValues.firstName !== firstName) {
            hasChange = true;
        }
        if (formValues.lastName !== lastName) {
            hasChange = true;
        }
        if (formValues.birthDate && formDate !== storeDate) {
            hasChange = true;
        }
        if (formValues.uploadImage?.file && formValues.uploadImage.file.status === 'done') {
            hasChange = true;
        }
        if (currentImgSrc !== imgSrc) {
            hasChange = true;
        }
        if (formValues.password || formValues.confirmPassword) {
            hasChange = true;
            dispatch(setPasswordRequired(true));
        }
        if (formValues.password === '' || formValues.confirmPassword === '') {
            dispatch(setPasswordRequired(false));
        }
        setDisabled(!hasChange);
    };

    const onFinish = async (values: FormData) => {
        const updateUserDto: UpdateUserDto = values;
        const photoUrl = values.uploadImage?.file.response?.url;
        updateUserDto.imgSrc = photoUrl ? `${basePhotoUrl}${photoUrl}` : '';
        updateUserDto.password = updateUserDto.password === '' ? undefined : updateUserDto.password;
        updateUserDto.birthday = values.birthDate ? values.birthDate.toISOString() : undefined;
        try {
            const response = await updateUser(updateUserDto).unwrap();
            dispatch(setUserInfo(response));
            dispatch(setProfileData(response));
            dispatch(setPasswordRequired(false));
            setSaveSuccess(true);
            setDisabled(true);
        } catch (error) {
            setSaveError(true);
        } finally {
            form.resetFields(['password', 'confirmPassword']);
        }
    };

    const errorModalClickHandler = () => setSaveError(false);

    const alertCloseHandler = () => setSaveSuccess(false);

    useEffect(() => {
        form.setFieldsValue({
            firstName,
            lastName,
            birthDate: birthday ? moment(birthday, moment.ISO_8601) : undefined,
            email,
        });
    }, [email, firstName, lastName, birthday]);
    return (
        <>
            {saveError && (
                <ErrorModalSmall
                    title='При сохранении данных произошла ошибка '
                    message='Придётся попробовать ещё раз'
                    btnText='Закрыть'
                    clickHandler={errorModalClickHandler}
                    iconColor='#FF4D4F'
                    dataTestId='big-file-error-close'
                />
            )}
            <Form
                name='profileForm'
                onFieldsChange={handleFormChange}
                form={form}
                className={style.profileForm}
                onFinish={onFinish}
            >
                {saveSuccess && (
                    <CustomAlert
                        message='Данные профиля успешно обновлены'
                        type='success'
                        closeHandler={alertCloseHandler}
                        className={cn(style.myAlert, style.alert)}
                        dataTestId='alert'
                    />
                )}
                <div className={style.profileFormContentWrap}>
                    <PersonalInfo imageSrc={imgSrc} />
                    <PrivacyAndAuthorization passwordRequired={passwordRequired} />
                    <div className={style.saveBtnWrap}>
                        <ActionButton
                            htmlType='submit'
                            type='primary'
                            isAlt={false}
                            text='Сохранить изменения'
                            fontSize={14}
                            disabled={disabled}
                            stretch
                            dataTestId='profile-submit'
                        />
                    </div>
                </div>
            </Form>
        </>
    );
};
