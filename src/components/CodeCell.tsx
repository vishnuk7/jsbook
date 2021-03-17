import { useState } from 'react';
import { CodeEditor } from './CodeEditor';
import { Preview } from './Preview';
import { bundle } from '../bundler';

const CodeCell = () => {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const onClick = async () => {
        setCode(await bundle(input));
    };

    return (
        <div>
            <CodeEditor
                onEditorChange={(value) => setInput(value)}
                initialValue=""
            />
            <button
                onClick={onClick}
                className="bg-red-600 text-white py-1 px-3 rounded-md"
            >
                Submit
            </button>
            <code>{input}</code>
            <Preview code={code} />
        </div>
    );
};

export default CodeCell;
