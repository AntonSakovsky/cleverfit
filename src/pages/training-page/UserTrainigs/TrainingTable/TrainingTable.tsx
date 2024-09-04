import { EditOutlined } from '@ant-design/icons';
import { Paramters, TrainingItem } from '@type/calendar/types';
import { Table, TablePaginationConfig, TableProps } from 'antd';
import cn from 'classnames';
import { FC, ReactNode } from 'react';
import { IconCell } from './IconCell/IconCell';
import { PeriodCell } from './PeriodCell/PeriodCell';
import style from './TrainingTable.module.css';
import { TrainingTypeCell } from './TrainingTypeCell/TrainingTypeCell';

type DataType = {
    key: string;
    training: TrainingItem;
    icon: ReactNode;
}

const sort = (a: DataType, b: DataType) => {
    return (
        Number((a.training.parameters as Paramters).period) -
        Number((b.training.parameters as Paramters).period)
    );
};

const columns: TableProps<DataType>['columns'] = [
    {
        title: <div className={style.tableHeader}>Тип тренировки</div>,
        dataIndex: 'training',
        key: 'type',
        render: (_, record, index) => {
            return <TrainingTypeCell training={record.training} />;
        },
        className: cn(style.column, style.cell, style.cellItem),
    },
    {
        title: <div className={style.tableHeader}>Периодичность</div>,
        dataIndex: 'training',
        key: 'period',
        render: (_, record, index) => {
            return <PeriodCell period={record.training.parameters?.period as number} />;
        },
        sorter: sort,
        showSorterTooltip: { className: style.sorter },
        className: cn(style.column, style.cell, style.cellItem),
    },
    {
        title: <div className={cn(style.tableHeader, style.iconHeader)}></div>,
        dataIndex: 'icon',
        key: 'icon',
        render: (icon, _, index) => {
            return <>{icon}</>;
        },
        className: cn(style.column, style.cell, style.cellItem, style.lastCell),
    },
];

type TrainingTableProps = {
    trainings: TrainingItem[];
    onIconClick: () => void;
};

export const TrainingTable: FC<TrainingTableProps> = ({ trainings, onIconClick }) => {
    const data: DataType[] = trainings.map((training, ind) => ({
        key: String(training._id),
        training,
        icon: (
            <IconCell
                training={training}
                icon={
                    <EditOutlined
                        style={{
                            color: training.isImplementation ? '#BFBFBF' : '#2F54EB',
                            fontSize: 22,
                        }}
                    />
                }
                onClick={onIconClick}
                dataTestId={`update-my-training-table-icon${ind}`}
            />
        ),
    }));

    const paginationConfig: TablePaginationConfig = {
        pageSize: 10,
        size: 'small',
        position: ['bottomLeft'],
    };
    return (
        <Table
            columns={columns}
            dataSource={data}
            className={style.table}
            pagination={paginationConfig}
            data-test-id='my-trainings-table'
        />
    );
};
