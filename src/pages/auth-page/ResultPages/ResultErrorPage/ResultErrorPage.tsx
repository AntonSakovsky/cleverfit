import { CloseCircleFilled } from "@ant-design/icons";
import { ResultCard } from "@components/cards/ResultCard";
import { routes } from "@constants/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { ResultPageContainer } from "../ResultPageContainer";
import { ResultPanel } from "../ResultPanel/ResultPanel";


export const ResultErrorPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const doRequestAgain = async() => {
            navigate(routes.AUTH + '/' + routes.REGISTRATION, {
                state:{
                    from: location.pathname
                } 
            });
    }
    return (
        <ResultPageContainer>
            <ResultPanel>
                <ResultCard
                    clickHandler={doRequestAgain}
                    icon={<CloseCircleFilled style={{ fontSize: 70, color: '#FF4D4F' }} />}
                    message={['Что-то пошло не так и ваша регистрация', ' не завершилась. Попробуйте ещё раз.']}
                    title="Данные не сохранились"
                    textBtn="Повторить"
                    btnStretch
                    dataTestBtnId="registration-retry-button"
                />
            </ResultPanel>
        </ResultPageContainer>
    )
}