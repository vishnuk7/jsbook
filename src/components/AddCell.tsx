import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useActions } from '../hooks/useActions';

interface AddCellProps {
    nextCellId: string | null;
    forceVisible?: boolean;
}

export const AddCell: React.FC<AddCellProps> = ({
    nextCellId,
    forceVisible,
}) => {
    const { InsertBeforeCell } = useActions();

    return (
        <div
            className={`relative opacity-0 ${
                forceVisible && 'opacity-100'
            } hover:opacity-100 ease-in delay-100 z-0`}
        >
            <div className="flex justify-center my-4">
                <button
                    className="bg-red-600 p-2 mr-6 rounded-sm"
                    onClick={() => {
                        InsertBeforeCell(nextCellId, 'code');
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span className="ml-2">Code</span>
                </button>
                <button
                    className="bg-red-600 p-2 mr-6 rounded-sm"
                    onClick={() => {
                        InsertBeforeCell(nextCellId, 'text');
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span className="ml-2">Text</span>
                </button>
            </div>
            <div
                style={{
                    zIndex: -1,
                    left: '2.5%',
                    right: '2.5%',
                    width: '95%',
                }}
                className="absolute border-b-2 top-1/2 bg-red-500"
            ></div>
        </div>
    );
};
