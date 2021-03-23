import { useTypedSelector } from '../hooks/useSelector';
import { CellItem } from './CellItem';

export const CellList: React.FC = () => {
    const cells = useTypedSelector(({ cells: { order, data } }) =>
        order.map((id) => data[id])
    );

    const renderedCells = cells.map((cell) => (
        <CellItem key={cell.id} cell={cell} />
    ));

    return <div>{renderedCells}</div>;
};
