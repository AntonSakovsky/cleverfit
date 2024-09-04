import { routes } from "@constants/constants";
import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type ICardProtectionProps = {
    allowedFromPaths: string[],
    children: ReactNode
}

export const AllowedPathProtection: FC<ICardProtectionProps> = ({ allowedFromPaths, children }) => {
    const location = useLocation();
    const normalize = (path: string) => {
        if (path && !path.endsWith('/')) {
            path += '/';
        }
        return path;
    }
    let fromPage = normalize(location.state?.from);
    let pathArray = allowedFromPaths.map(path=> normalize(path))
    if(!pathArray.some(path=> path === fromPage)){
        location.state = null;
        return <Navigate to={routes.AUTH} replace />
    }

    return children
}