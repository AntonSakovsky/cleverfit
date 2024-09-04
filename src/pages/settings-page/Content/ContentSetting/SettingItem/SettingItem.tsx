import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Switch, Tooltip } from 'antd';
import cn from 'classnames';
import { CSSProperties, FC } from 'react';
import style from './SettingItem.module.css';

type SettingItemProps = {
    text: string;
    hintText: string;
    checked: boolean;
    hintStyle?: CSSProperties;
    dataTestIdSwitch?: string;
    dataTestIdIcon?: string;
    disabled?: boolean;
    switchHandler: (checked: boolean) => void;
};

export const SettingItem: FC<SettingItemProps> = ({
    text,
    hintText,
    disabled = false,
    hintStyle,
    checked,
    dataTestIdSwitch,
    dataTestIdIcon,
    switchHandler,
}) => {
    const onChange = (checked: boolean) => {
        switchHandler(checked);
    };

    return (
        <div className={style.settingItem}>
            <div className={style.textWrap}>
                <p className={cn(style.text, { [style.disabled]: disabled })}>{text}</p>
                <Tooltip
                    destroyTooltipOnHide
                    align={{ offset: [-16, -5] }}
                    placement='bottomLeft'
                    overlayStyle={{ ...hintStyle }}
                    title={hintText}
                    color='black'
                    className={style.toollip}
                >
                    <ExclamationCircleOutlined
                        style={{ color: '#8C8C8C' }}
                        data-test-id={dataTestIdIcon}
                    />
                </Tooltip>
            </div>
            <Switch
                onChange={onChange}
                checked={checked}
                disabled={disabled}
                className={style.switch}
                data-test-id={dataTestIdSwitch}
            />
        </div>
    );
};
