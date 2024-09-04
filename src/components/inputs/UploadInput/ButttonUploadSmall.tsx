import { UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export const ButttonUploadSmall = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 12, color: '#8C8C8C' }}>Загрузить фото профиля</div>
            <Button icon={<UploadOutlined />}>Загрузить</Button>
        </div>
    );
};
