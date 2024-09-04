import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Form, Rate } from 'antd';
import { FC, useState } from 'react';
import s from './Input.module.css';

type RatingInputProps = {
    rating: number | null;
};

export const RatingInput: FC<RatingInputProps> = ({ rating }) => {
    const [stars, setStars] = useState(rating ?? 0);

    return (
        <Form.Item name='rating' className={s.formItem} rules={[{ required: true, message: '' }]}>
            <Rate
                character={({ index }) =>
                    (Number(index)) >= stars ? (
                        <StarOutlined style={{ color: '#FAAD14', fontSize: 24 }} />
                    ) : (
                        <StarFilled style={{ color: '#FAAD14', fontSize: 24 }} />
                    )
                }
                onChange={(value: number) => {
                    setStars(value);
                }}
            />
        </Form.Item>
    );
};
