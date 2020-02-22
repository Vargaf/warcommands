import * as FileActions from './actions';
import { FileDTO } from 'src/warcommands/commands/domain/file/model/file.dto';
import { createReducer, on, Action } from '@ngrx/store';

export const FileStoreKey = 'file';

export interface FileState {
    fileList: FileDTO[];
}

const initialState: FileState = {
    fileList: []
};

const FileReducer = createReducer(
    initialState,
    on(FileActions.addFile, (state, { file }) => {
        return {
            fileList: [ ...state.fileList, file ]
        };
    })
);

export function reducer(state: FileState | undefined, action: Action) {
    return FileReducer(state, action);
}
