import { CommandListDTO } from 'src/warcommands/commands/domain/command/model/command-list.dto';
import * as CommandActions from './actions';
import { createReducer, on, Action } from '@ngrx/store';

export const CommandStoreKey = 'command';

export interface CommandState {
    commandList: CommandListDTO;
}

const initialState: CommandState = {
    commandList: {}
}

const commandReducer = createReducer(
    initialState,
    on(CommandActions.addCommand, (state, { command }) => {
        const newCommand: CommandListDTO = {
            [command.id]: command
        };
        return {
            commandList: { ...state.commandList, ...newCommand }
        };
    })
);

export function reducer(state: CommandState | undefined, action: Action) {
    return commandReducer(state, action);
}