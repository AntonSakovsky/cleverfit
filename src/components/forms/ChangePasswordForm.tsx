import { useChangePasswordMutation } from "@api/authApi/authApi";
import { ActionButton } from "@components/ActionButton/ActionButton";
import { PasswordInput } from "@components/inputs/PasswordInput";
import { routes } from "@constants/constants";
import { useAppSelector } from "@hooks/typed-react-redux-hooks";
import { ChangePasswordBodyType } from "@type/auth/types";
import { Form } from "antd";
import Title from "antd/lib/typography/Title";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import s from './Form.module.css';


export const ChangePasswordForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const [changePassword] = useChangePasswordMutation();
    const {password, confirmPassword} = useAppSelector(state => state.user)

    const onFinish = async ({password, confirmPassword}: ChangePasswordBodyType) => {
        try {
            await changePassword({
                password,
                confirmPassword
            }).unwrap();
            navigate(routes.RESULT+'/'+routes.SUCCESS_CHANGE_PASSWORD, {
                state: {
                    from: location.pathname
                }
            });
            
        } catch (error: any) {
            navigate(routes.RESULT+'/'+routes.ERROR_CHANGE_PASSWORD, {
                state: {
                    from: location.pathname
                }
            });
        }
    }
    useEffect(()=>{
        if(location.state?.from === routes.RESULT + '/' +routes.ERROR_CHANGE_PASSWORD){
            location.state = null;
            onFinish({
                password,
                confirmPassword
            })
        }
    }, [location])
    
    return (
        <Form
            name="change_password"
            className={s.changePasswordForm}
            form={form}
            onFinish={onFinish}
        >
            <Title level={3} className={s.changePasswordTitle}>Восстановление аккауанта</Title>
            <PasswordInput confirmPassword={false} placeholder="Парооль" dataTestId="change-password"/>
            <PasswordInput confirmPassword placeholder="Повторите пароль" dataTestId="change-confirm-password"/>

            <div style={{ marginTop: 16 }}>
                <ActionButton
                    text="Сохранить"
                    type="primary"
                    isAlt={false}
                    htmlType="submit"
                    stretch
                    dataTestId="change-submit-button"
                />
            </div>

        </Form>
    )
}