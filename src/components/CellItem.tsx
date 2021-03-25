import { Cell } from '../state';
import { ActionBar } from './ActionBar';
import CodeCell from './CodeCell';
import { TextEditor } from './TextEditor';

interface CellItemProps {
    cell: Cell;
    count: number;
}

export const CellItem: React.FC<CellItemProps> = ({ cell, count }) => {
    let child: JSX.Element;

    if (cell.type === 'code') {
        child = <CodeCell cell={cell} />;
    } else {
        child = <TextEditor cell={cell} />;
    }

    return (
        <div className="relative">
            <div className="bg-gray-700 opacity-40 hover:opacity-100 h-10 flex items-center">
                <span className="text-lg font-bold pl-4">[{count}]</span>
                <ActionBar id={cell.id} />
            </div>
            {child}
        </div>
    );
};
