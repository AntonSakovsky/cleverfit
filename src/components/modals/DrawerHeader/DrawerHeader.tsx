import { CloseOutlined } from '@ant-design/icons';
import { FC, ReactNode } from 'react';
import style from './DrawerHeader.module.css';

type DrawerHeaderProps = {
    text: string;
    icon: ReactNode;
    onClick: () => void;
};

export const DrawerHeader: FC<DrawerHeaderProps> = ({ text, icon, onClick }) => (
    <div className={style.header}>
        <div className={style.titleWrap}>
            <div className={style.icon}>{icon}</div>

            <h4 className={style.title}>{text}</h4>
        </div>
        <div className={style.closeBtn} onClick={onClick}>
            <CloseOutlined data-test-id='modal-drawer-right-button-close' />
        </div>
    </div>
);
