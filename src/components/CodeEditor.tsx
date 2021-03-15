import MoancoEditor from '@monaco-editor/react';
import React from 'react';

export const CodeEditor: React.FC = () => {
	return (
		<MoancoEditor
			theme='vs-dark'
			height='300px'
			language='javascript'
			options={{
				wordWrap: 'on',
				minimap: { enabled: false },
				showUnused: false,
				lineNumbersMinChars: 3,
				folding: false,
				fontSize: 16,
				scrollBeyondLastLine: false,
				automaticLayout: true,
			}}
		/>
	);
};
