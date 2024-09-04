import { WarningFilled } from "@ant-design/icons";
import { ResultCard } from "@components/cards/ResultCard";
import { routes } from "@constants/constants";
import { useNavigate } from "react-router-dom";
import { ResultPageContainer } from "../ResultPageContainer";
import { ResultPanel } from "../ResultPanel/ResultPanel";


export const ErrorLoginPage = () => {
    const navigate = useNavigate();

    return (
        <ResultPageContainer>
            <ResultPanel>
                <ResultCard
                    clickHandler={()=> navigate(routes.AUTH)}
                    icon={<WarningFilled style={{ fontSize: 70, color: '#FAAD14' }} />}
                    message="Что-то пошло не так. Попробуйте ёщё раз."
                    title="Вход не выполнен"
                    textBtn="Повторить"
                    btnStretch
                    dataTestBtnId="login-retry-button"
                />
            </ResultPanel>
        </ResultPageContainer>


    )
}