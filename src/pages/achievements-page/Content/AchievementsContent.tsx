import { useEffect, useRef } from 'react';
import style from './AchievementsContent.module.css';
import { AchievementsTabs } from "./Tabs/AchievementsTabs";
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setContetnWidth } from '@redux/reducers/AchievementsSlice';

export const AchievementsContent = () => {
    const contetnRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    useEffect(()=> {
        const onResize = ()=> {
            dispatch(setContetnWidth(contetnRef.current?.offsetWidth as number));
        }
        onResize();

        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        }
        
    }, [])
    return(
        <div className={style.content} ref={contetnRef}>
            <AchievementsTabs />
        </div>
    )
}