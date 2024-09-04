import { CloseCircleFilled } from "@ant-design/icons";
import { ResultCard } from "@components/cards/ResultCard";
import { routes } from "@constants/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { ResultPageContainer } from "../ResultPageContainer";
import { ResultPanel } from "../ResultPanel/ResultPanel";


export const ErrorChangePasswordPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <ResultPageContainer>
            <ResultPanel>
                <ResultCard
                    clickHandler={() => navigate(routes.AUTH+'/'+routes.CHANGE_PASSWORD, {
                        state: {
                            from: location.pathname,
                        }
                    })}
                    icon={<CloseCircleFilled style={{ fontSize: 70, color: '#FF4D4F' }} />}
                    message={'Что-то пошло не так. Попробуйте ещё раз'}
                    title="Данные не сохранились"
                    textBtn="Повторить"
                    btnStretch
                    dataTestBtnId="change-retry-button"
                />
            </ResultPanel>
        </ResultPageContainer>
    )
}