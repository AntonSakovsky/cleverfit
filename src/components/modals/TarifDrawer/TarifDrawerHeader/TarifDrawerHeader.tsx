import { CloseOutlined } from "@ant-design/icons";
import style from './TarifDrawerHeader.module.css';

export const TarifDrawerHeader = () => {
    return(
        <div className={style.header}>
            <h4 className={style.title}>Сравнить тарифы</h4>
            <CloseOutlined />
        </div>
    )
}