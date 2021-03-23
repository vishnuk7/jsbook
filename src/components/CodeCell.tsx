import { useEffect, useState } from 'react';
import { CodeEditor } from './CodeEditor';
import { Preview } from './Preview';
import { bundle } from '../bundler';
import { Resizable } from './Resizable';

const CodeCell = () => {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');
    const [err, setError] = useState('');

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundle(input);
            setCode(output.code);
            setError(output.error);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [input]);

    return (
        <Resizable direction="vertical">
            <div className="flex h-full px-2 py-4 my-4 mx-3 border-gray-900 border-2 rounded-md shadow-md">
                <Resizable direction="horizontal">
                    <CodeEditor
                        onEditorChange={(value) => setInput(value)}
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
