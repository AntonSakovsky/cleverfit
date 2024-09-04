import { ResultCard } from "@components/cards/ResultCard";
import someWrong from "@public/img/some-wrong.png";
import { useLocation, useNavigate } from "react-router-dom";
import { ResultPageContainer } from "../ResultPageContainer";
import { ResultPanel } from "../ResultPanel/ResultPanel";


export const ErrorCheckEmailPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return(
        <ResultPageContainer>
            <ResultPanel needSmallPaddings>
                <ResultCard
                    clickHandler={()=>{
                        navigate(location.state.from, {
                            state:{
                                from: location.pathname,
                            }
                        })
                    }}
                    image={<img src={someWrong} width={255} height={295} alt='Что-то пошло не так'/>}
                    message={'Произошла ошибка, попробуйте отправить форму ещё раз.'}
                    title="Что-то пошло не так"
                    textBtn="Назад"
                    btnStretch={false}
                    dataTestBtnId="check-back-button"
                />
            </ResultPanel>
        </ResultPageContainer>
    )
}