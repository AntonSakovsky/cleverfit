import { Tabs } from 'antd';
import style from './AchievementsTabs.module.css';
import { Statistics } from '@pages/achievements-page/Statistics/Statistics';

export const AchievementsTabs = () => {
    return (
        <Tabs
            defaultActiveKey='1'
            destroyInactiveTabPane
            items={[
                {
                    label: 'За неделю',
                    key: '1',
                    children: <Statistics period='week'/>,
                },
                {
                    label: 'За месяц',
                    key: '2',
                    children: <Statistics period='month'/>,
                },
                {
                    label: 'За всё время (PRO)',
                    key: '3',
                    children: 'to be continued...',
                    disabled: true,
                },
            ]}
            className={style.tabs}
            
        />
    );
};
