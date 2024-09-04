import { PlusOutlined } from '@ant-design/icons';

export const ButttonUploadLarge = () => {
    return (
        <button style={{ border: 0, background: 'none' }} type='button'>
            <PlusOutlined />
            <div style={{ marginTop: 8, fontSize: 14, color: '#8C8C8C' }}>
                Загрузить фото профиля
            </div>
        </button>
    );
};
