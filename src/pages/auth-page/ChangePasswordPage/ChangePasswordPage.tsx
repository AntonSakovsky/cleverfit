import { ChangePasswordForm } from "@components/forms/ChangePasswordForm";
import { ResultPageContainer } from "../ResultPages/ResultPageContainer";
import { ResultPanel } from "../ResultPages/ResultPanel/ResultPanel";


export const ChangePasswordPage = () => {
    return(
        <ResultPageContainer>
            <ResultPanel>
                <ChangePasswordForm />
            </ResultPanel>
        </ResultPageContainer>
    )
}