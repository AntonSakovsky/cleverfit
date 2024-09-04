import { useCreateFeedbackMutation } from "@api/feedbackApi/feedbackApi";
import { AutosizeTextArea } from "@components/inputs/AutosizeTextArea";
import { RatingInput } from "@components/inputs/RatingInput";
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks";
import { setDataNotSavedModal, setFeedbackFormFields, setSuccessModal } from "@redux/reducers/FeedbackSlice";
import { AddFeedbackBody } from "@type/feedback/types";
import { Form, FormInstance } from "antd";
import { FC, useEffect } from "react";


type AddFeedbackForm = {
    form: FormInstance
}
export const AddFeedbackForm: FC<AddFeedbackForm> = ({ form }) => {
    const [createFeedback] = useCreateFeedbackMutation();
    const dispatch = useAppDispatch();
    const { fields } = useAppSelector(state => state.feedbacks)

    const onFinish = async (values: AddFeedbackBody) => {
        try {
            await createFeedback(values).unwrap();
            dispatch(setSuccessModal(true));
            dispatch(setFeedbackFormFields({
                message: '',
                rating: null
            }))
        } catch (error) {

            dispatch(setFeedbackFormFields(values))
            dispatch(setDataNotSavedModal(true));
        }
    }

    useEffect(() => {
        form.resetFields();
    }, []);

    return (
        <Form
            name="addFeedback"
            form={form}
            onFinish={onFinish}
            initialValues={{
                message: fields.message,
                rating: fields.rating
            }}

        >
            <RatingInput rating={fields.rating} key={3} />
            <AutosizeTextArea initialValue={fields.message} key={4} />
        </Form>
    )
}