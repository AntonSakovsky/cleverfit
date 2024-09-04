import { GooglePlusOutlined } from "@ant-design/icons";
import { ActionButton } from "@components/ActionButton/ActionButton";
import { Form, FormInstance } from "antd";
import { FC, useEffect, useState } from "react";
import s from './ActionButtons.module.css';

type IActionButtonsProps = {
    text: string,
    form: FormInstance
    dataTestId: string,
    shouldDisable?: boolean
}

export const ActionButtons: FC<IActionButtonsProps> = ({ form, text, dataTestId, shouldDisable }) => {
    const [disabled, setDisabled] = useState<boolean>(true);
    const values = Form.useWatch([], form);

    const signInWithGoogle = async ()=>{
        window.location.href = 'https://marathon-api.clevertec.ru/auth/google';
    }

    useEffect(() => {
        form.validateFields({ validateOnly: true })
            .then(
                () => {
                    setDisabled(false);
                },
                () => {
                    setDisabled(true);
                },
            );
    }, [values]);

    return (
        <div className={s.buttons}>
            <ActionButton isAlt={false} text="Войти" type="primary" htmlType="submit" disabled={shouldDisable && disabled} stretch dataTestId={dataTestId}/>
            <ActionButton isAlt htmlType="button" text={`${text} через Google`} type="default" icon={< GooglePlusOutlined />} stretch onClick={signInWithGoogle}/>
        </div>
    )
}