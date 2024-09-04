import { useAppSelector } from "./typed-react-redux-hooks";

export const useAuth = () => {
    const {token} = useAppSelector(state => state.user)
    return !!token;
}