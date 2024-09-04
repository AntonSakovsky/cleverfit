import { Form, Input } from 'antd';
import cn from 'classnames';
import { FC } from 'react';
import style from './Input.module.css';

type TextInputProps = {
    name: string;
    placeholder: string;
    dataTestId?: string;
};

export const TextInput: FC<TextInputProps> = ({ name, placeholder, dataTestId }) => {
    return (
        <Form.Item name={name} className={cn(style.formItem, style.textInput)}>
            <Input type='text' placeholder={placeholder} data-test-id={dataTestId} />
        </Form.Item>
    );
};
