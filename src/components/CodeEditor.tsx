import MoancoEditor, { OnChange, OnMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';
import styled from 'styled-components';
import React, { useRef } from 'react';

interface CodeEditorProps {
    initialValue: string;
    onEditorChange(value: string): void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
    initialValue,
    onEditorChange,
}) => {
    const editorRef = useRef<any>();

    const handleChange: OnChange = (getValue, ev): void => {
        getValue && onEditorChange(getValue);

        const highlighter = new Highlighter(
            //@ts-ignore
            window.monaco,
            codeShift,
            editorRef
        );

        highlighter.highLightOnDidChangeModelContent();
    };

    const onFormatClick = () => {
        const unformatted = editorRef.current.getModel()?.getValue();
        console.log(unformatted);

        const formatted = prettier
            .format(unformatted, {
                parser: 'babel',
                plugins: [parser],
                useTabs: false,
                semi: true,
                singleQuote: true,
            })
            .replace(/\n$/, '');

        editorRef.current.setValue(formatted);
    };

    const onEditorMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
        console.log(editor);
    };

    return (
        <EditorStyled>
            <div className="absolute z-10 top-1.5 right-1.5">
                <button
                    className="bg-red-600 text-gray-300 px-4 py-2 rounded-sm hover:bg-red-700"
                    onClick={onFormatClick}
                >
                    Format
                </button>
            </div>
            <MoancoEditor
                onChange={handleChange}
                onMount={onEditorMount}
                value={initialValue}
                theme="vs-dark"
                height="100%"
                language="javascript"
                options={{
                    wordWrap: 'on',
                    minimap: { enabled: false },
                    showUnused: false,
                    lineNumbersMinChars: 3,
                    folding: false,
                    fontSize: 16,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                }}
            />
        </EditorStyled>
    );
};

const EditorStyled = styled.div`
   position: relative;
   width: calc(100% - 10px);
   height: 100%;

    button {
        opacity: 0;
        transition: all 0.2 ease-in;
    }
    &:hover {
        button {
            opacity: 1;
        }
    }
`;
