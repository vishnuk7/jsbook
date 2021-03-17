import { useState } from 'react';
import './styles/index.css';

import { CodeEditor } from './components/CodeEditor';
import { Preview } from './components/Preview';
import { bundle } from './bundler';

const App = () => {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const onClick = async () => {
        setCode(await bundle(input));
    };

    return (
        <div>
            <CodeEditor
                onEditorChange={(value) => setInput(value)}
                initialValue="const a = 2"
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

export default App;
