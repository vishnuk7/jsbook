import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';
import { Cell } from '../state';
import { useActions } from '../hooks/useActions';

interface TextEditorProps {
    cell: Cell;
}

export const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
    const [editing, setEditing] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    const { updateCell } = useActions();

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (
                ref.current &&
                event.target &&
                ref.current.contains(event.target as Node)
            )
                return;

            setEditing(false);
        };

        window.addEventListener('click', listener, { capture: true });

        return () => {
            document.removeEventListener('click', listener, { capture: true });
        };
    }, []);

    if (editing) {
        return (
            <div ref={ref}>
                <EditorStyle>
                    <MDEditor
                        value={cell.content}
                        onChange={(v) => updateCell(cell.id, v || '')}
                        autoFocus={true}
                    />
                </EditorStyle>
            </div>
        );
    }

    return (
        <div
            className="px-2 py-4 border-gray-900 border-2 rounded-md"
            onClick={() => setEditing(true)}
        >
            <MDEditor.Markdown source={cell.content || 'Click here to edit'} />
        </div>
    );
};

const EditorStyle = styled.div`
    ul {
        line-height: 1;
    }

    .w-md-editor-bar svg {
        display: none;
    }

    .w-md-editor-bar {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=');
        height: 11px;
        cursor: row-resize;
        background-color: #37414b;
        background-position: 50%;
        background-repeat: no-repeat;
        width: 100%;
        position: relative;
    }

    em {
        font-style: italic;
    }

    .wmde-markdown hr {
        border-top: 1px solid #dee5ed;
    }

    .wmde-markdown ol {
        list-style: decimal;
    }

    .w-md-editor-show-live {
        /* Hide menu bar buttons to prevent accidental delete */
        z-index: 20;
    }

    .w-md-editor-toolbar {
        background-color: #37414b;
        border-bottom: 1px solid gray;
    }

    .w-md-editor-toolbar li button {
        color: #d4d4d4;
    }

    .w-md-editor-content {
        background-color: #202123;
    }

    .w-md-editor,
    .w-md-editor .w-md-editor-text-pre {
        color: #d4d4d4;
    }

    .w-md-editor-text-pre .bold {
        color: unset;
    }

    .token.list.punctuation {
        background-color: unset;
    }
`;
