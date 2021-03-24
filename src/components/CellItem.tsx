import { Cell } from '../state';
import { ActionBar } from './ActionBar';
import CodeCell from './CodeCell';
import { TextEditor } from './TextEditor';

interface CellItemProps {
    cell: Cell;
}

export const CellItem: React.FC<CellItemProps> = ({ cell }) => {
    let child: JSX.Element;

    if (cell.type === 'code') {
        child = <CodeCell cell={cell} />;
    } else {
        child = <TextEditor cell={cell} />;
    }

    return (
        <div className="relative">
            <div className="bg-gray-700 opacity-40 hover:opacity-100 h-10">
                <ActionBar id={cell.id} />
            </div>
            {child}
        </div>
    );
};
