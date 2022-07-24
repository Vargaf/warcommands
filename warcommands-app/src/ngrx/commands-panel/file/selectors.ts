import * as CommandsPanelReducerMap from '../reducer-map';
import { FileStoreKey, FileState } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FileDTO } from 'src/warcommands/commands-panel/domain/file/model/file.dto';

interface FileStore {
    [FileStoreKey]: FileState;
}

export interface FileSelectorState {
    [CommandsPanelReducerMap.CommandsPanelStoreKey]: FileStore;
}

export const commandPanelFeatureSelector =
    createFeatureSelector<FileStore>(CommandsPanelReducerMap.CommandsPanelStoreKey);

const fileFeatureSelector = createSelector(
    commandPanelFeatureSelector,
    (state) => state[FileStoreKey]
);

export const fileSelector = createSelector(
    fileFeatureSelector,
    (state: FileState, props: { fileId: string }) => {
        return state.fileList.find((file: FileDTO) => {
            return file.id === props.fileId;
        });
    }
);

export const fileListSelector = createSelector(
    fileFeatureSelector,
    (state: FileState) => state.fileList
);
