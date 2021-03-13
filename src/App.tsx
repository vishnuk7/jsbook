import { useState } from 'react';
import './styles/index.css';

const App = () => {
	const [input, setInput] = useState('');
	const [code, setCode] = useState('');

	const onClick = () => {
		console.log(input);
	};

	return (
		<div>
			<textarea onChange={(e) => setInput(e.target.value)} className='border-gray-400 border-2'></textarea>
			<button onClick={onClick} className='bg-red-600 text-white py-1 px-3 rounded-md'>
				Submit
			</button>
		</div>
	);
};

export default App;
