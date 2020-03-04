import * as FileReducer from './file/reducers';
import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

export const CommandsPanelStoreKey = 'commands-panel';

interface State {
    [FileReducer.FileStoreKey]: FileReducer.FileState;
}

export const COMMANDS_FILE_REDUCER_MAP_TOKEN = new InjectionToken<ActionReducerMap<State>>('Commands panel reducers');

export function reducers(): ActionReducerMap<State> {
    // To work with AOT
    const fileStoreKey = FileReducer.FileStoreKey;

    return {
        [fileStoreKey]: FileReducer.reducer,
    };
}
