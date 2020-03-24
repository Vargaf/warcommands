import { GenericCommandListDTO } from 'src/warcommands/commands-panel/domain/command/model/generic-command.dto';
import { createReducer, on, Action } from '@ngrx/store';
import * as CommandActions from './actions';

export const CommandStoreKey = 'command';

export interface CommandState {
    commandList: GenericCommandListDTO;
}

const initialState: CommandState = {
    commandList: {}
};

const commandReducer = createReducer(
    initialState,
    on(CommandActions.addCommand, (state, { command }) => {
        const newCommand: GenericCommandListDTO = {
            [command.id]: command
        };
        return {
            commandList: { ...state.commandList, ...newCommand }
        };
    }),
    on(CommandActions.updateCommand, (state, { command }) => {
        const newCommand: GenericCommandListDTO = {
            [command.id]: command
        };
        return {
            commandList: { ...state.commandList, ...newCommand }
        };
    }),
    on(CommandActions.removeCommand, (state, { command }) => {
        const commandList = { ...state.commandList };
        delete commandList[command.id];

        return {
            commandList
        };
    }),
    on(CommandActions.addClassMember, (state, { commandId, classMember }) => {
        const command = { ...state.commandList[commandId] };
        command.classMember = classMember;
        return {
            commandList: { ...state.commandList, ...{ [commandId]: command } }
        };
    })
);

export function reducer(state: CommandState | undefined, action: Action) {
    return commandReducer(state, action);
}
