import { useLoginMutation } from '@api/authApi/authApi';
import { EmailInput } from '@components/inputs/EmailInput';
import { PasswordInput } from '@components/inputs/PasswordInput';
import { Loader } from '@components/loader/Loader';
import { LS_TOKEN, routes } from '@constants/constants';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setAccessToken, setEmail } from '@redux/reducers/UserSlice';
import { LocalStorage } from '@utils/localStorage/localStorage';
import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ActionButtons } from './ActionButtons/ActionButtons';
import { CheckArea } from './CheckArea/CheckArea';
import s from './Form.module.css';

type LoginFormData = {
    email: string;
    password: string;
    remember: boolean;
};

export const LoginForm = () => {
    const [login] = useLoginMutation();
    const disapatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async (values: LoginFormData) => {
        const fromPage = location.state?.from || routes.MAIN;
        try {
            setIsLoading(true);
            const payload = await login({
                email: values.email,
                password: values.password,
            }).unwrap();
            if (values.remember) {
                LocalStorage.set(LS_TOKEN, payload.accessToken);
            }
            disapatch(setAccessToken(payload.accessToken));
            navigate(fromPage);
        } catch (error: any) {
            navigate(routes.RESULT + '/' + routes.ERROR_LOGIN, {
                state: {
                    from: location.pathname,
                },
            });
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 100);
        }
    };

    useEffect(() => {
        dispatch(setEmail(''));
        disapatch(setAccessToken(''));
    }, []);
    return (
        <>
            {isLoading && <Loader />}
            <Form name='login' form={form} className={s.loginForm} onFinish={onFinish}>
                <EmailInput dataTestId='login-email' />
                <PasswordInput
                    confirmPassword={false}
                    placeholder='Пароль'
                    dataTestId='login-password'
                />
                <CheckArea form={form} />
                <ActionButtons form={form} text='Вход' dataTestId='login-submit-button' />
            </Form>
        </>
    );
};
