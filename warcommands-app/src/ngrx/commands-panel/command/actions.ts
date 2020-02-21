import { props, createAction } from '@ngrx/store';
import { CommandInterface } from 'src/warcommands/commands/domain/command/model/command.interface';

export const addCommand = createAction('[Commands panel commands] Add a command', props<{ command: CommandInterface }>());
