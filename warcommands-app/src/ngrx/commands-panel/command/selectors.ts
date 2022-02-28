import * as CommandsPanelReducerMap from '../reducer-map';
import { CommandState, CommandStoreKey } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

interface CommandStore {
    [CommandStoreKey]: CommandState;
}

export interface CommandFeatureState {
    [CommandsPanelReducerMap.CommandsPanelStoreKey]: CommandStore;
}

export const commandPanelFeatureSelector =
    createFeatureSelector<CommandStore>(CommandsPanelReducerMap.CommandsPanelStoreKey);

const commandFeatureSelector = createSelector(
    commandPanelFeatureSelector,
    (state) => state[CommandStoreKey]
);

export const commandSelector = createSelector(
    commandFeatureSelector,
    (state: CommandState, props: { commandId: string }) => {
        return state.commandList[props.commandId];
    }
);
