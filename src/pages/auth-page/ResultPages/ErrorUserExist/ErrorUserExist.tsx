import { CloseCircleFilled } from "@ant-design/icons";
import { ResultCard } from "@components/cards/ResultCard";
import { useAppDispatch } from "@hooks/typed-react-redux-hooks";
import { push } from "redux-first-history";
import { ResultPageContainer } from "../ResultPageContainer";
import { ResultPanel } from "../ResultPanel/ResultPanel";


export const ErrorUserExist = () => {
    const dispatch = useAppDispatch();
    return (
        <ResultPageContainer>
            <ResultPanel>
                <ResultCard
                    clickHandler={()=>dispatch(push('/auth/registration'))}
                    icon={<CloseCircleFilled style={{ fontSize: 70, color: '#FF4D4F' }} />}
                    message={'Такой e-mail уже записан в системе. Попробуйте, зарегистрироваться по другому e-mail.'}
                    title="Данные не сохранились"
                    textBtn="Назад к регистрации"
                    btnStretch
                    dataTestBtnId="registration-back-button"
                />
            </ResultPanel>
        </ResultPageContainer>


    )
}