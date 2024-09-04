import { Pie, PieConfig } from '@ant-design/charts';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { achievementsSelector } from '@redux/selectors';
import { FC } from 'react';
import style from './RingDiagram.module.css';


const config: PieConfig = {
    height: 320,
    width: 500,
    angleField: 'count',
    colorField: 'exercise',
    marginLeft: -20,
    innerRadius: 0.5,
    radius: 0.7,
    label: {
        connector: false,
        connectorLineWidth: 0,
        text: 'exercise',
        position: 'outside',
        style: {
            fontSize: () => (window.innerWidth >= 581 ? 14 : 12),
            fill: 'black',
        },
    },
    legend: false,
};

const calculateDiagramParameters = (contentWidth: number) => {
    if (contentWidth >= 520) {
        return [510, 510 * 0.65];
    }
    return [contentWidth-24, (contentWidth-24) * 0.65];
};

type RingDiagramProps = {
    exercises: [string, number][];
};
export const RingDiagram: FC<RingDiagramProps> = ({ exercises }) => {
    const { contentWidth } = useAppSelector(achievementsSelector);
    const [width, height] = calculateDiagramParameters(contentWidth);

    const data = exercises.map((exerciseArr) => {
        return {
            count: exerciseArr[1],
            exercise: exerciseArr[0],
        };
    });
    return (
        <div className={style.container}>
            <Pie {...config} width={width} height={height} data={data} />
        </div>
    );
};
