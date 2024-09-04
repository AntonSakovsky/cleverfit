import logo from '@public/img/logo.svg';
import cn from 'classnames';
import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import s from './AuthPage.module.css';

type IAuthProps = {
    children: ReactNode,
}

export const AuthPage: FC<IAuthProps> = ({ children }) => {
    return (
        <div className={s.authPageContainer}>
            <div className={s.blur}>
                <div className={s.authPanel}>
                    <div className={s.authPanelImg}>
                        <img src={logo} alt="CleverFit" />
                    </div>
                    <div className={s.formContainer}>
                        <div className={s.tabs}>
                            <NavLink to='/auth' end className={({ isActive }) => {
                                return cn(s.tab, { [s.active]: isActive })
                            }} >Вход</NavLink>
                            <NavLink to='/auth/registration' end className={({ isActive }) => {
                                return cn(s.tab, { [s.active]: isActive })
                            }}  >Регистрация</NavLink>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>

    )
}