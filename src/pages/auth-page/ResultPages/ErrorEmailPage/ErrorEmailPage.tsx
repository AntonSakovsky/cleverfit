import { CloseCircleFilled } from "@ant-design/icons";
import { ResultCard } from "@components/cards/ResultCard";
import { routes } from "@constants/constants";
import { useNavigate } from "react-router-dom";
import { ResultPageContainer } from "../ResultPageContainer";
import { ResultPanel } from "../ResultPanel/ResultPanel";


export const ErrorEmailPage = () => {
    const navigate = useNavigate();
    return (
        <ResultPageContainer>
            <ResultPanel needSmallPaddings>
                <ResultCard
                    clickHandler={()=>navigate(routes.AUTH)}
                    icon={<CloseCircleFilled style={{ fontSize: 70, color: '#FF4D4F' }} />}
                    message={['Мы не нашли в базе вашего e-mail. Попробуйте',' войти с другим e-mail.']}
                    title="Такой e-mail не зарегистрирован"
                    textBtn="Попробовать снова"
                    btnStretch={false}
                    dataTestBtnId="check-retry-button"
                />
            </ResultPanel>
        </ResultPageContainer>


    )
}