import * as CommandsPanelReducerMap from '../reducer-map';
import { CommandContainerState, CommandContainerStoreKey } from './reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommandContainerListDTO, CommandContainerDTO } from 'src/warcommands/commands/domain/command-container/model/command-container.dto';

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

export const getCommandContainersOnPage = createSelector(
    commandContainerFeatureSelector,
    (state: CommandContainerState, props) => {
        let commandContainerList: CommandContainerListDTO = {};

        // tslint:disable-next-line: forin
        for (const index in state.commandContainerList) {
            const commandContainer: CommandContainerDTO = state.commandContainerList[index];
            if (commandContainer.fileId === props.fileId) {
                commandContainerList = { ...commandContainerList, ...{ [index]: commandContainer } };
            }
        }

        return commandContainerList;
    }
);
