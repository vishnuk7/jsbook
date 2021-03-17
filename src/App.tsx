import { useEffect, useRef, useState } from 'react';
import './styles/index.css';
import * as esbulid from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugin/unpkg-path-plugin';
import { fetchPlugin } from './plugin/fetch-plugin';
import { CodeEditor } from './components/CodeEditor';

const App = () => {
    const [input, setInput] = useState('');
    const iframe = useRef<HTMLIFrameElement>(null);

    const startService = async () => {
        await esbulid.initialize({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.9.2/esbuild.wasm',
        });
    };

    useEffect(() => {
        startService();
    }, []);

    const html = `
		<html>
			<head></head>
			<body>
				<div id="root"></div>
				<script>
					window.addEventListener('message',(event) => {
							try{
							eval(event.data);
							}catch(err){
								const root = document.querySelector('#root');
								root.innerHTML = '<div style="color:red"><h4>Runtime Error</h4>'+err+'</div>';
								console.error(err);
							}
					},
					false);
				</script>
			</bodY>
		</html>
	`;

    if (iframe && iframe.current) iframe.current.srcdoc = html;

    const onClick = async () => {
        const result = await esbulid.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(input)],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window',
            },
        });

        if (iframe && iframe.current && iframe.current.contentWindow)
            iframe.current.contentWindow.postMessage(
                result.outputFiles[0].text,
                '*'
            );
    };

    return (
        <div>
            <CodeEditor
                onEditorChange={(value) => setInput(value)}
                initialValue="const a = 2"
            />
            <textarea
                onChange={(e) => setInput(e.target.value)}
                className="border-gray-400 border-2"
            ></textarea>
            <button
                onClick={onClick}
                className="bg-red-600 text-white py-1 px-3 rounded-md"
            >
                Submit
            </button>
            <code>{input}</code>
            <iframe
                title="code-preview"
                ref={iframe}
                sandbox="allow-scripts"
                srcDoc={html}
            />
        </div>
    );
};

export default App;
