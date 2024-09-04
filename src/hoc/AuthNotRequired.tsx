import { routes } from "@constants/constants";
import { useAuth } from "@hooks/useAuth";
import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

type IAuthRequiredProps = {
    children: ReactNode
}

export const AuthNotRequired: FC<IAuthRequiredProps> = ({children}) => {    
    const isAuth = useAuth();
    
    if(isAuth) return <Navigate to={routes.MAIN} replace />

    return children
    
}