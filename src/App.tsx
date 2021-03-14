import { useEffect, useRef, useState } from 'react';
import './styles/index.css';
import * as esbulid from 'esbuild-wasm';
import { unpkgPathPlugin } from './unpkg-path-plugin';

const App = () => {
	const [input, setInput] = useState('');
	const [code, setCode] = useState('');

	const startService = async () => {
		await esbulid.initialize({
			worker: true,
			wasmURL: '/esbuild.wasm',
		});
	};

	useEffect(() => {
		startService();
	}, []);

	const onClick = async () => {
		// const result = await esbulid.transform(input, {
		// 	loader: 'jsx',
		// 	target: 'es2015',
		// });

		const result = await esbulid.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin()],
			define: {
				'process.env.NODE_ENV': '"production"',
				global: 'window',
			},
		});

		setCode(result.outputFiles[0].text);
	};

	return (
		<div>
			<textarea onChange={(e) => setInput(e.target.value)} className='border-gray-400 border-2'></textarea>
			<button onClick={onClick} className='bg-red-600 text-white py-1 px-3 rounded-md'>
				Submit
			</button>
			<code>{code}</code>
		</div>
	);
};

export default App;
