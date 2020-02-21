import * as PageReducer from './page/reducers';
import * as CommandContainerReducer from './command-container/reducers';
import * as CommandReducer from './command/reducers';
import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

export const CommandsPanelStoreKey = 'commands-panel';

interface State {
    [PageReducer.PageStoreKey]: PageReducer.PageState;
    [CommandContainerReducer.CommandContainerStoreKey]: CommandContainerReducer.CommandContainerState;
    [CommandReducer.CommandStoreKey]: CommandReducer.CommandState;
}

export const COMMANDS_PAGE_REDUCER_MAP_TOKEN = new InjectionToken<ActionReducerMap<State>>('Commands panel reducers');

export function reducers(): ActionReducerMap<State> {
    // To work with AOT
    const userProgramKey = PageReducer.PageStoreKey;
    const commandContainerKey = CommandContainerReducer.CommandContainerStoreKey;
    const commandKey = CommandReducer.CommandStoreKey;

    return {
        [userProgramKey]: PageReducer.reducer,
        [commandContainerKey]: CommandContainerReducer.reducer,
        [commandKey]: CommandReducer.reducer
    };
}
