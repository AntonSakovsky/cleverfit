import { LS_TOKEN, routes } from "@constants/constants";
import { useAppDispatch } from "@hooks/typed-react-redux-hooks";
import { setAccessToken } from "@redux/reducers/UserSlice";
import { LocalStorage } from "@utils/localStorage/localStorage";
import { Navigate, useLocation } from "react-router-dom";



export const RedirectToMain = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get('accessToken');

    if(accessToken !== null){
        LocalStorage.set(LS_TOKEN, accessToken);
        dispatch(setAccessToken(accessToken));
        return <Navigate to={routes.MAIN} replace />
    } 
    return <Navigate to={routes.AUTH} replace/>
}