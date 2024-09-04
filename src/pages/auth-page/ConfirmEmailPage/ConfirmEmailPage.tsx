import { InfoCircleFilled } from "@ant-design/icons";
import { useConfirmEmailMutation } from "@api/authApi/authApi";
import { ConfirmCard } from "@components/cards/ConfirmCard/ConfirmCard";
import { Loader } from "@components/loader/Loader";
import { routes } from "@constants/constants";
import { useAppSelector } from "@hooks/typed-react-redux-hooks";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ResultPageContainer } from "../ResultPages/ResultPageContainer";
import { ResultPanel } from "../ResultPages/ResultPanel/ResultPanel";
import s from './ConfirmEmailPage.module.css';


export const ConfirmEmailPage = () => {
    const email = useAppSelector(state => state.user.email);
    const [confirmEmail, {isLoading}] = useConfirmEmailMutation();
    const [error, setError] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    const completeHandler = async (value: string) => {
        try {
            await confirmEmail({
                code: value,
                email
            }).unwrap();
                navigate(routes.AUTH + '/' + routes.CHANGE_PASSWORD, {
                    state: {
                        from: location.pathname
                    }
                });
            
        } catch (error: any) {
            setError(true);
        }
    }

    return (
        <>
            {isLoading && <Loader />}
            <ResultPageContainer>
                <ResultPanel needSmallPaddings>
                    <ConfirmCard
                        icon={<InfoCircleFilled style={{ fontSize: 70, color: '#2F54EB' }} />}
                        m={
                            <div className={s.messageWrap}>
                                <p >Мы отправили вам на e-mail <span>{email}</span></p>
                                <p>шестизначный код. Введите его в поле ниже.</p>
                            </div>
                        }
                        title={['Введите код', ' для восстановления аккауанта']}
                        labelText='Не пришло письмо? Проверьте папку Спам.'
                        error={error}
                        completeHandler={completeHandler} />
                </ResultPanel>
            </ResultPageContainer>
        </>

    )
}