import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setEmail } from '@redux/reducers/UserSlice';
import { emailValidator } from '@utils/validators/validators';
import { Form, Input } from 'antd';
import cn from 'classnames';
import { ChangeEvent, FC } from 'react';
import s from './Input.module.css';

type IEmailInputProps = {
    dataTestId?: string;
};
export const EmailInput: FC<IEmailInputProps> = ({ dataTestId }) => {
    const dispatch = useAppDispatch();
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (!emailValidator(value)) {
            dispatch(setEmail(value));
        }
    };
    return (
        <Form.Item
            name='email'
            className={cn(s.formItem)}
            rules={[
                { type: 'email', message: '' },
                { required: true, message: '' },
            ]}
        >
            <Input
                addonBefore='e-mail:'
                type='email'
                className={s.emailField}
                onChange={changeHandler}
                data-test-id={dataTestId}
            />
        </Form.Item>
    );
};
