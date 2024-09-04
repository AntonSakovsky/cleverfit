import { useRegistrationMutation } from "@api/authApi/authApi";
import { EmailInput } from "@components/inputs/EmailInput";
import { PasswordInput } from "@components/inputs/PasswordInput";
import { Loader } from "@components/loader/Loader";
import { routes } from "@constants/constants";
import { useAppSelector } from "@hooks/typed-react-redux-hooks";
import { Form } from "antd";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ActionButtons } from "./ActionButtons/ActionButtons";
import s from './Form.module.css';

interface RegistrationFormData {
    email: string,
    password: string,
    confirmPassword: string,
}


export const RegistrationForm = () => {
    const [form] = Form.useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const { email, password } = useAppSelector(state => state.user);
    const [registrate, { isLoading }] = useRegistrationMutation();

    const onFinish = async (values: RegistrationFormData) => {
        try {
            await registrate({
                email: values.email,
                password: values.password
            }).unwrap();
            navigate(routes.RESULT + '/' + routes.RESULT_SUCCESS, {
                state: {
                    from: location.pathname,
                }
            });
        } catch (e: any) {
            if (e.status === 409) {
                navigate(routes.RESULT + '/' + routes.ERROR_USER_EXIST, {
                    state: {
                        from: location.pathname,
                    }
                })
            } else {
                navigate(routes.RESULT + '/' + routes.RESULT_ERROR, {
                    state: {
                        from: location.pathname,
                    }
                });
            }
        }
    }

    useEffect(() => {
        if (location.state?.from === '/result/' + routes.RESULT_ERROR) {
            location.state = null
            onFinish({
                email,
                password,
                confirmPassword: '',
            })
        }
    }, [location])

    return (
        <>
            {isLoading && <Loader />}
            <Form
                name="registration"
                form={form}
                className={s.registrationForm}
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >

                <EmailInput dataTestId="registration-email" />

                <PasswordInput confirmPassword={false} placeholder="Пароль" dataTestId="registration-password" />
                <PasswordInput confirmPassword placeholder="Повторите пароль" dataTestId="registration-confirm-password" />
                <ActionButtons form={form} text="Регистрация" dataTestId="registration-submit-button" shouldDisable/>
            </Form>
        </>

    )
}