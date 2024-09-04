import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { FC, } from 'react';
import s from './CollapseButton.module.css';

interface ICollapseButtonProps {
    clickHandker: () => void,
    collapsed: boolean
}
export const CollapseButton: FC<ICollapseButtonProps> = ({ clickHandker, collapsed }) => {
    return (
        <>
            <div className={s.collapseBtnL} onClick={clickHandker} data-test-id='sider-switch'>
                {
                    collapsed ?
                        <MenuUnfoldOutlined height={11} width={12.5} style={{
                            color: '#8C8C8C',
                        }} />
                        :
                        <MenuFoldOutlined height={11} width={12.5} style={{
                            color: '#8C8C8C',
                        }} />
                }
            </div>
            <div className={s.collapseBtnS} onClick={clickHandker} data-test-id='sider-switch-mobile'>
                {
                    collapsed ?
                        <MenuUnfoldOutlined height={11} width={12.5} style={{
                            color: '#8C8C8C',
                        }} />
                        :
                        <MenuFoldOutlined height={11} width={12.5} style={{
                            color: '#8C8C8C',
                        }} />
                }
            </div>
        </>

    )
}