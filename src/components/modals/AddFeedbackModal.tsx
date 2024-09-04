import { CloseOutlined } from "@ant-design/icons";
import { ActionButton } from "@components/ActionButton/ActionButton";
import { AddFeedbackForm } from "@components/forms/AddFeebackForm/AddFeedbackForm";
import { Form, Modal } from "antd";
import { FC, useEffect, useState } from "react";
import s from './AddFeedbackModal.module.css';

type AddFeedbackModalProps = {
    closeHandle: () => void,
    isOpen: boolean,
}

export const AddFeedbackModal: FC<AddFeedbackModalProps> = ({ isOpen, closeHandle }) => {
    const [disabled, setDisbled] = useState(true);
    const [form] = Form.useForm();
    const values = Form.useWatch([], form);

    const afterClose = ()=> form.resetFields();

    const onActionBtnClick = ()=>{
        form.submit();
        closeHandle();
    }

    const onCancel = () => closeHandle();

    useEffect(() => {
        form
            .validateFields({ validateOnly: true })
            .then(() => setDisbled(false))
            .catch(() => setDisbled(true));
    }, [form, values]);

    return (
        <Modal
            className={s.modal}
            title="Ваш отзыв"
            open={isOpen}
            closeIcon={<CloseOutlined />}
            centered
            destroyOnClose
            afterClose={afterClose}
            maskStyle={{ backdropFilter: 'blur(3px)', backgroundColor: 'transparent' }}
            onCancel={onCancel}
            footer={[
                <div className={s.publishWrap} key={1}>
                    <div className={s.publishBtn}>
                        <ActionButton
                            text="Опубликовать"
                            isAlt={false}
                            htmlType="submit"
                            type="primary"
                            fontSize={14}
                            stretch
                            disabled={disabled}
                            onClick={onActionBtnClick}
                            dataTestId='new-review-submit-button'
                        />
                    </div>
                </div>
            ]}
        >
            <div className={s.body} key={0}>
                <AddFeedbackForm form={form} />
            </div>
        </Modal>
    )
}