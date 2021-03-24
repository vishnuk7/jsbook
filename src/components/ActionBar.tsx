import { useActions } from '../hooks/useActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowUp,
    faArrowDown,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';

interface ActionBarProps {
    id: string;
}

export const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
    const { moveCell, deleteCell } = useActions();

    return (
        <div className="absolute top-0 right-0 z-30">
            <button
                className="bg-red-500 shadow-md p-2 hover:bg-red-700"
                onClick={() => moveCell(id, 'up')}
            >
                <FontAwesomeIcon icon={faArrowUp} />
            </button>
            <button
                className="bg-red-500 shadow-md p-2 hover:bg-red-700"
                onClick={() => moveCell(id, 'down')}
            >
                <FontAwesomeIcon icon={faArrowDown} />
            </button>
            <button
                className="bg-red-500 shadow-md p-2 hover:bg-red-700"
                onClick={() => deleteCell(id)}
            >
                <FontAwesomeIcon icon={faTimes} />
            </button>
        </div>
    );
};
