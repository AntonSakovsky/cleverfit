import { Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { FC, FormEvent, useState } from "react";
import s from './Input.module.css';

const minHeight = 52;

type AutosizeTextAreaProps = {
    initialValue: string
}

export const AutosizeTextArea: FC<AutosizeTextAreaProps> = ({ initialValue }) => {
    const [textAreaHeight, settextAreaHeight] = useState<'auto' | number>('auto');

    const autoResize = (e: FormEvent<HTMLTextAreaElement>) => {
        const textarea = e.target as HTMLTextAreaElement
        const value = textarea.value;
        let height = textarea.scrollHeight
        height = height < minHeight ? minHeight : height;
        height = value ? height : minHeight
        settextAreaHeight(height);
    }
    return (
        <Form.Item
            name='message'
            className={s.formItem}
        >
            <TextArea
                className={s.feedbackText}
                rows={2} style={{ height: textAreaHeight }}
                onInput={autoResize}
                value={initialValue}
                placeholder="Расскажите, почему Вам понравилось наше приложение" />
        </Form.Item>
    )
}