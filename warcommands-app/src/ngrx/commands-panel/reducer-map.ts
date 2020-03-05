import * as FileReducer from './file/reducers';
import * as CommandContainerReducer from './command-container/reducers';
import * as CommandReducer from './command/reducers';
import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

export const CommandsPanelStoreKey = 'commands-panel';

interface State {
    [FileReducer.FileStoreKey]: FileReducer.FileState;
    [CommandContainerReducer.CommandContainerStoreKey]: CommandContainerReducer.CommandContainerState;
    [CommandReducer.CommandStoreKey]: CommandReducer.CommandState;
}

export const COMMANDS_FILE_REDUCER_MAP_TOKEN = new InjectionToken<ActionReducerMap<State>>('Commands panel reducers');

export function reducers(): ActionReducerMap<State> {
    // To work with AOT
    const fileStoreKey = FileReducer.FileStoreKey;
    const commandContainerKey = CommandContainerReducer.CommandContainerStoreKey;
    const commandKey = CommandReducer.CommandStoreKey;

    return {
        [fileStoreKey]: FileReducer.reducer,
        [commandContainerKey]: CommandContainerReducer.reducer,
        [commandKey]: CommandReducer.reducer,
    };
}
