import * as CommandsPanelReducerMap from '../reducer-map';
import { CommandContainerState, CommandContainerStoreKey } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface CommandContainerFeatureState {
    [CommandsPanelReducerMap.CommandsPanelStoreKey]: {
        [CommandContainerStoreKey]: CommandContainerState;
    };
}

export const commandPanelFeatureSelector =
    createFeatureSelector<CommandContainerFeatureState, CommandContainerState>(CommandsPanelReducerMap.CommandsPanelStoreKey);

const commandContainerFeatureSelector = createSelector(
    commandPanelFeatureSelector,
    (state) => state[CommandContainerStoreKey]
);

export const commandContainerSelector = createSelector(
    commandContainerFeatureSelector,
    (state: CommandContainerState, props) => state.commandContainerList[props.commandContainerId]
);