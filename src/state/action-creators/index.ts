import { ActionType } from '../action-types';
import {
    UpdateCellAction,
    DeleteCellAction,
    MoveCellAction,
    InsertBeforeCellAction,
    Direction,
} from '../actions';
import { CellTypes } from '../cell';

export const updateCell = (id: string, content: string): UpdateCellAction => {
    return {
        type: ActionType.UPDATE_CELL,
        payload: {
            id,
            content,
        },
    };
};

export const deleteCell = (id: string): DeleteCellAction => {
    return {
        type: ActionType.DELETE_CELL,
        payload: id,
    };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
    return {
        type: ActionType.MOVE_CELL,
        payload: {
            id,
            direction,
        },
    };
};

export const InsertBeforeCell = (
    id: string,
    cellType: CellTypes
): InsertBeforeCellAction => {
    return {
        type: ActionType.INSERT_BEFORE_CELL,
        payload: {
            id,
            type: cellType,
        },
    };
};
