import { useCheckEmailMutation } from "@api/authApi/authApi";
import { routes } from "@constants/constants";
import { useAppSelector } from "@hooks/typed-react-redux-hooks";
import { emailValidator } from "@utils/validators/validators";
import { Button, Checkbox, Form } from "antd";
import { FormInstance } from "antd/es/form/Form";
import cn from 'classnames';
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import s from './CheckArea.module.css';

type ICheckAreaProps = {
    form: FormInstance
}

export const CheckArea: FC<ICheckAreaProps> = ({ form }) => {
    const [disabled, setDisabled] = useState<boolean>(false);
    const emailValue = Form.useWatch('email', form);
    const email = useAppSelector(state => state.user.email);
    const navigate = useNavigate();
    const location = useLocation();
    const [checkEmail] = useCheckEmailMutation();

    const clickHandler = async () => {
        if (email) {
            try {
                await checkEmail({ email }).unwrap();
                navigate(routes.AUTH + '/' + routes.CONFIRM_EMAIL, {
                    state: {
                        from: location.pathname
                    }
                });
            } catch (e: any) {
                if (e.status === 404 && e.data.message === 'Email не найден') {
                    navigate('/result/' + routes.ERROR_EMAIL_NO_EXIST, {
                        state: {
                            from: location.pathname
                        }
                    });
                } else {
                    navigate('/result/' + routes.ERROR_CHECK_EMAIL, {
                        state: {
                            from: location.pathname
                        }
                    });
                }
            }
        }

    }

    useEffect(() => {
        if (location.state?.from === '/result/' + routes.ERROR_CHECK_EMAIL) {
            location.state = null;
            clickHandler();
        }
    }, [location]);

    useEffect(() => {
        if(form.isFieldTouched('email')){
            if (emailValidator(emailValue)) {
                setDisabled(true)
            } else {
                setDisabled(false);
            }
        }
    }, [emailValue]);

    return (
        <div className={s.checkArea}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
            </Form.Item>
            <Button
                type="default"
                disabled={disabled}
                className={cn("login-form-forgot", s.forgotPass, { [s.disabled]: disabled })}
                onClick={clickHandler}
                data-test-id='login-forgot-button'>
                Забыли пароль?
            </Button>
        </div>
    )
}