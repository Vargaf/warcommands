import * as FileReducer from './file/reducers';
import * as CommandContainerReducer from './command-container/reducers';
import * as CommandReducer from './command/reducers';
import * as PlayerListReducer from './player-list/reducers';
import * as UxUiReducer from './ux-ui/reducers';
import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

export const CommandsPanelStoreKey = 'commands-panel';

interface State {
    [FileReducer.FileStoreKey]: FileReducer.FileState;
    [CommandContainerReducer.CommandContainerStoreKey]: CommandContainerReducer.CommandContainerState;
    [CommandReducer.CommandStoreKey]: CommandReducer.CommandState;
    [PlayerListReducer.PlayerListStoreKey]: PlayerListReducer.PlayerListState;
    [UxUiReducer.UxUiStoreKey]: UxUiReducer.UxUiState;
}

export const COMMANDS_FILE_REDUCER_MAP_TOKEN = new InjectionToken<ActionReducerMap<State>>('Commands panel reducers');

export function reducers(): ActionReducerMap<State> {
    // To work with AOT
    const fileStoreKey = FileReducer.FileStoreKey;
    const commandContainerKey = CommandContainerReducer.CommandContainerStoreKey;
    const commandKey = CommandReducer.CommandStoreKey;
    const currentPlayerKey = PlayerListReducer.PlayerListStoreKey;
    const uxUiKey = UxUiReducer.UxUiStoreKey;

    return {
        [fileStoreKey]: FileReducer.reducer,
        [commandContainerKey]: CommandContainerReducer.reducer,
        [commandKey]: CommandReducer.reducer,
        [currentPlayerKey]: PlayerListReducer.reducer,
        [uxUiKey]: UxUiReducer.reducer
    };
}
