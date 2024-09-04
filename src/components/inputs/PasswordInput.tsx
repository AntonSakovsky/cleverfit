import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setConfirmPassword, setPassword } from '@redux/reducers/UserSlice';
import { passwordValidator } from '@utils/validators/validators';
import { Form, Input } from 'antd';
import { Rule } from 'antd/lib/form';
import cn from 'classnames';
import { ChangeEvent, FC } from 'react';
import s from './Input.module.css';
import { PASSWORD_REGEXP } from '@constants/constants';

type IPasswordInputProps = {
    confirmPassword: boolean;
    placeholder: string;
    dataTestId?: string;
    requiredField?: boolean;
};

export const PasswordInput: FC<IPasswordInputProps> = ({
    confirmPassword,
    placeholder,
    dataTestId,
    requiredField = true,
}) => {
    const dispatch = useAppDispatch();
    const rules: Rule[] = [];
    if (confirmPassword) {
        rules.push(
            {
                required: requiredField,
                message: '',
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('Пароли не совпадают'));
                },
            }),
        );
    } else {
        rules.push(
            { pattern: PASSWORD_REGEXP, message: '' },
            { required: requiredField, message: '' },
            { min: 8, message: '' },
        );
    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (!passwordValidator(e.target.value)) {
            if (!confirmPassword) {
                dispatch(setPassword(e.target.value));
            } else {
                dispatch(setConfirmPassword(e.target.value));
            }
        }
    };

    return (
        <>
            <Form.Item
                help={
                    !confirmPassword
                        ? 'Пароль не менее 8 символов, с заглавной буквой и цифрой'
                        : null
                }
                className={cn(s.formItem, s.passItem)}
                name={confirmPassword ? 'confirmPassword' : 'password'}
                dependencies={[confirmPassword ? 'password' : '']}
                rules={rules}
            >
                <Input.Password
                    placeholder={placeholder}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    className={cn(s.field, s.password)}
                    onChange={changeHandler}
                    data-test-id={dataTestId}
                />
            </Form.Item>
        </>
    );
};
