import { useEffect, useState } from 'react';
import { CodeEditor } from './CodeEditor';
import { Preview } from './Preview';
import { bundle } from '../bundler';
import { Resizable } from './Resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/useActions';

interface CodeCellProps {
    cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const [code, setCode] = useState('');
    const [err, setError] = useState('');

    const { updateCell } = useActions();

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundle(cell.content);
            setCode(output.code);
            setError(output.error);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [cell.content]);

    return (
        <Resizable direction="vertical">
            <div className="flex h-full px-2 py-4 my-4 mx-3 border-gray-900 border-2 rounded-md shadow-md">
                <Resizable direction="horizontal">
                    <CodeEditor
                        onEditorChange={(value) => updateCell(cell.id, value)}
                        initialValue=""
                    />
                </Resizable>
                {/* <button
                    onClick={onClick}
                    className="bg-red-600 text-white py-1 px-3 rounded-md"
                >
                    Submit
                </button> */}
                {/* <code>{input}</code> */}
                <Preview code={code} err={err} />
            </div>
        </Resizable>
    );
};

export default CodeCell;
