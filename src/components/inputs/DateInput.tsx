import { DatePicker, Form } from 'antd';
import ruRu from 'antd/es/date-picker/locale/ru_RU';
import cn from 'classnames';
import { FC } from 'react';
import styles from './Input.module.css';

type DateInputProps = {
    placeholder: string;
    dataTestId?: string;
};
const dateFormat = 'DD.MM.YYYY';

export const DateInput: FC<DateInputProps> = ({ placeholder, dataTestId }) => {
    return (
        <Form.Item name='birthDate' className={cn(styles.formItem, styles.datePickerItem)}>
            <DatePicker
                placeholder={placeholder}
                className={styles.datePicker}
                locale={ruRu}
                format={dateFormat}
                data-test-id={dataTestId}
            />
        </Form.Item>
    );
};
