import { Column, ColumnConfig } from '@ant-design/charts';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { achievementsSelector } from '@redux/selectors';
import { AchievementPeriod } from '@type/achievements/types';
import { TrainingItem } from '@type/calendar/types';
import { getHistogramData } from '@utils/achievements/getHistogramData';
import cn from 'classnames';
import { FC } from 'react';
import style from './VerticalHistogram.module.css';

const config: ColumnConfig = {
    xField: 'date',
    yField: 'value',
    autoFit: false,
    sizeField: 30,
    axis: {
        y: {
            tick: false,
            labelFormatter: (value: string) => `${value} кг`,
        },
    },
    style: {
        fill: () => '#2989FF',
    },
    label: {
        text: () => '',
        offset: 10,
    },
};

const calculateDiagramSize = (period: AchievementPeriod, contentWidth: number) => {
    if (period === 'week') {
        if (contentWidth >= 550) return [510, 510 * 0.62];
        if (contentWidth >= 461 && contentWidth < 550) {
            const width = contentWidth - 100;
            return [width, width * 0.62];
        }
        const width = contentWidth - 70;
        return [width, width * 0.62];
    }
    return [1450, 330];
};

const calculateFieldSize = (diagramWidth: number) => {
    return diagramWidth > 371 ? 30 : 20;
};

type VerticalHistogramProps = {
    trainingsByDay: TrainingItem[][];
};
export const VerticalHistogram: FC<VerticalHistogramProps> = ({ trainingsByDay }) => {
    const { period, contentWidth } = useAppSelector(achievementsSelector);

    const [width, height] = calculateDiagramSize(period, contentWidth);
    const fieldSize = calculateFieldSize(width);

    const data = getHistogramData(trainingsByDay, period);

    return (
        <div className={style.graphic}>
            <div
                className={cn(style.histogramWrap, {
                    [style.histogramWrapMonth]: period === 'month',
                })}
            >
                <Column
                    {...config}
                    data={data}
                    width={width}
                    height={height}
                    sizeField={fieldSize}
                />
            </div>
            <p className={style.legend}>Нагрузка, кг</p>
        </div>
    );
};
