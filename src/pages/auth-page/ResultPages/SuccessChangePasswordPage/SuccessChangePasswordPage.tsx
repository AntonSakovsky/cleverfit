import { CheckCircleFilled } from "@ant-design/icons";
import { ResultCard } from "@components/cards/ResultCard";
import { routes } from "@constants/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { ResultPageContainer } from "../ResultPageContainer";
import { ResultPanel } from "../ResultPanel/ResultPanel";

export const SuccessChangePasswordPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <ResultPageContainer>
            <ResultPanel>
                <ResultCard
                    clickHandler={()=> navigate(routes.AUTH, {
                        state: {
                            from: location.pathname,
                        }
                    })}
                    icon={<CheckCircleFilled style={{ fontSize: 70, color: '#52C41A' }} />}
                    message={['Теперь можно войти в аккаунт, используя','свой логин и новый пароль']}
                    title="Пароль успешно изменен"
                    textBtn="Вход"
                    btnStretch
                    dataTestBtnId="change-entry-button"
                />
            </ResultPanel>
        </ResultPageContainer>
    )
}