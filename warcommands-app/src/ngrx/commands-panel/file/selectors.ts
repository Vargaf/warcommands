import * as CommandsPanelReducerMap from '../reducer-map';
import { FileStoreKey, FileState } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface FileSelectorState {
    [CommandsPanelReducerMap.CommandsPanelStoreKey]: {
        [FileStoreKey]: FileState;
    };
}

export const fileFeatureSelector =
    createFeatureSelector<FileSelectorState, FileState>(CommandsPanelReducerMap.CommandsPanelStoreKey);

export const fileSelector = createSelector(
    fileFeatureSelector,
    (state: FileState, props) => state.fileList[props.fileId]
);
