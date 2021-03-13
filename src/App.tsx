import { useEffect, useRef, useState } from 'react';
import './styles/index.css';
import * as esbulid from 'esbuild-wasm';

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
		const result = await esbulid.transform(input, {
			loader: 'jsx',
			target: 'es2015',
		});

		setCode(result.code);
	};

	return (
		<div>
			<textarea onChange={(e) => setInput(e.target.value)} className='border-gray-400 border-2'></textarea>
			<button onClick={onClick} className='bg-red-600 text-white py-1 px-3 rounded-md'>
				Submit
			</button>
			<p>{code}</p>
		</div>
	);
};

export default App;
