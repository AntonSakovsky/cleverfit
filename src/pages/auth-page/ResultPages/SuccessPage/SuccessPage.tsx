import { CheckCircleFilled } from "@ant-design/icons";
import { ResultCard } from "@components/cards/ResultCard";
import { routes } from "@constants/constants";
import { useNavigate } from "react-router-dom";
import { ResultPageContainer } from "../ResultPageContainer";
import { ResultPanel } from "../ResultPanel/ResultPanel";


export const SuccessPage = () => {
    const navigate = useNavigate();
    return (
        <ResultPageContainer>
            <ResultPanel>
                <ResultCard
                    clickHandler={()=>navigate(routes.AUTH)}
                    icon={<CheckCircleFilled style={{ fontSize: 70, color: '#52C41A' }} />}
                    message={['Регистрация прошла успешно. Зайдите', ' в приложение, используя свои e-mail и пароль.']}
                    title="Регистрация успешна"
                    textBtn="Войти"
                    btnStretch
                    dataTestBtnId="registration-enter-button"
                />
            </ResultPanel>
        </ResultPageContainer>


    )
}