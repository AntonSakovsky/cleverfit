import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { ChangeEvent, FC } from 'react';
import style from './SearchHeader.module.css';

const { Search } = Input;

type SearchHeaderProps = {
    searchValue: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    goBack: () => void;
};

export const SearchHeader: FC<SearchHeaderProps> = ({ searchValue, onChange, goBack }) => {
    return (
        <div className={style.searchHeader}>
            <Button
                type='text'
                icon={<ArrowLeftOutlined style={{ fontSize: 14 }} />}
                className={style.backBtn}
                onClick={goBack}
            >
                Назад
            </Button>
            <div className={style.inputContainer}>
                <Search
                    placeholder='Поиск по имени'
                    className={style.searchInput}
                    onChange={onChange}
                    data-test-id='search-input'
                    value={searchValue}
                />
            </div>
        </div>
    );
};
