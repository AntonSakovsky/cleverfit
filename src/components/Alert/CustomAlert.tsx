import { Alert } from 'antd';
import { CSSProperties, FC } from 'react';

type AlertProps = {
    message: string;
    type: 'error' | 'info' | 'success' | 'warning';
    closable?: boolean;
    showIcon?: boolean;
    className?: string;
    closeHandler?: () => void;
    style?: CSSProperties;
    dataTestId?: string;
};

export const CustomAlert: FC<AlertProps> = ({
    message,
    type,
    closable = true,
    showIcon = true,
    style,
    className = '',
    closeHandler,
    dataTestId,
}) => {
    return (
        <Alert
            message={message}
            type={type}
            closable={closable}
            showIcon={showIcon}
            className={className}
            onClose={closeHandler}
            style={{ ...style }}
            data-test-id={dataTestId}
        />
    );
};
