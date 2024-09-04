import { routes } from "@constants/constants";
import { useAuth } from "@hooks/useAuth";
import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type IAuthRequiredProps = {
    children: ReactNode
}

export const AuthRequired: FC<IAuthRequiredProps> = ({children}) => {
    const location = useLocation();     
    const isAuth = useAuth();
    
    if(!isAuth) return <Navigate to={routes.AUTH} state={{from: location.pathname}} />

    return children
    
}