import { FileDTO } from 'src/warcommands/commands-panel/domain/file/model/file.dto';
import { createReducer, on, Action } from '@ngrx/store';
import * as FileActions from './actions';

export const FileStoreKey = 'fileStore';

export interface FileState {
    fileList: FileDTO[];
}

const initalState: FileState = {
    fileList: []
};

const fileReducer = createReducer(
    initalState,
    on(FileActions.loadFile, (state, { file }) => {
        return {
            fileList: [ ...state.fileList, file ]
        };
    })
);

export function reducer(state: FileState | undefined, action: Action) {
    return fileReducer(state, action);
}
