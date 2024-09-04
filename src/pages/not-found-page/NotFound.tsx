import { ActionButton } from '@components/ActionButton/ActionButton';
import { routes } from '@constants/constants';
import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import style from './NotFound.module.css';

export const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Result
            className={style.result}
            status='404'
            title={<h3 className={style.title}>Такой страницы нет</h3>}
            subTitle={<p className={style.subTitle}>Извините, страница не найдена, возможно, она была удалена или перемещена.</p>}
            extra={<ActionButton 
                htmlType='button'
                isAlt={false}
                text='На главную'
                onClick={()=> navigate(routes.MAIN)}
                type='primary' 
                fontSize={14}/>}
        />
    );
};
