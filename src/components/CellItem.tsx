import { Cell } from '../state';
import CodeCell from './CodeCell';
import { TextEditor } from './TextEditor';

interface CellItemProps {
    cell: Cell;
}

export const CellItem: React.FC<CellItemProps> = ({ cell }) => {
    let child: JSX.Element;

    if (cell.type === 'code') {
        child = <CodeCell />;
    } else {
        child = <TextEditor />;
    }

    return <div>{child}</div>;
};
