import * as CommandsPanelReducerMap from '../reducer-map';
import { CommandState, CommandStoreKey } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface CommandFeatureState {
    [CommandsPanelReducerMap.CommandsPanelStoreKey]: {
        [CommandStoreKey]: CommandState;
    };
}

export const commandPanelFeatureSelector =
    createFeatureSelector<CommandFeatureState>(CommandsPanelReducerMap.CommandsPanelStoreKey);

const commandFeatureSelector = createSelector(
    commandPanelFeatureSelector,
    (state) => state[CommandStoreKey]
);

export const commandSelector = createSelector(
    commandFeatureSelector,
    (state: CommandState, props) => state.commandList[props.commandId]
);
