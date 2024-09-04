import { LS_TOKEN, routes } from "@constants/constants";
import { useAppDispatch } from "@hooks/typed-react-redux-hooks";
import exitSvg from '@public/img/exit.svg';
import { resetProfileData } from "@redux/reducers/ProfileSlice";
import { setAccessToken } from "@redux/reducers/UserSlice";
import { LocalStorage } from "@utils/localStorage/localStorage";
import { Divider } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import s from "./ExitButton.module.css";

interface IExitButtonProps {
    collapsed: boolean
 }

export const ExitButton: FC<IExitButtonProps> = ({collapsed}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const clickHandler = ()=>{
        LocalStorage.remove(LS_TOKEN);
        dispatch(setAccessToken(''));
        dispatch(resetProfileData(null));
        navigate(routes.AUTH);
    }

    return (
        <div className={s.exitWrap} onClick={clickHandler}>
            <Divider className={s.divider} />
            <div className={s.exitBtnWrap}>
                <img src={exitSvg} width={14} height={14} className={s.exitImg}/>
                {!collapsed && <p className={s.exitBtn} >Выход</p>}
            </div>
        </div>
    )
}