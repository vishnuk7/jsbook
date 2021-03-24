import { useEffect } from 'react';
import { CodeEditor } from './CodeEditor';
import { Preview } from './Preview';
import { Resizable } from './Resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useSelector';
import styled from 'styled-components';

interface CodeCellProps {
    cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const { updateCell, CreateBundle } = useActions();
    const bundle = useTypedSelector((state) => state.bundles[cell.id]);

    useEffect(() => {
        if (!bundle) {
            CreateBundle(cell.id, cell.content);
            return;
        }

        const timer = setTimeout(async () => {
            CreateBundle(cell.id, cell.content);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cell.id, cell.content, CreateBundle]);

    return (
        <Resizable direction="vertical">
            <div
                style={{ height: 'calc(100% - 10px)' }}
                className="flex border-gray-900 border-2 rounded-md shadow-md"
            >
                <Resizable direction="horizontal">
                    <CodeEditor
                        onEditorChange={(value) => updateCell(cell.id, value)}
                        initialValue=""
                    />
                </Resizable>
                {!bundle || bundle.loading ? (
                    <ProgressBar>
                        <div className="flex justify-center items-center w-full">
                            <div className="progress-bar flex bg-red-600 py-2 px-4 rounded-md">
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                <span>bundling</span>
                            </div>
                        </div>
                    </ProgressBar>
                ) : (
                    <Preview code={bundle.code} err={bundle.error} />
                )}
            </div>
        </Resizable>
    );
};

export default CodeCell;

const ProgressBar = styled.div`
    height: 100%;
    width: 100%;
    flex: 1;
    display: flex;
    background-color: #ffffff;

    .progress-bar {
        animation: fadeIn 0.5s;
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;
