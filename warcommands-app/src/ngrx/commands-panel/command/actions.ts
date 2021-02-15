import { createAction, props } from '@ngrx/store';
import { GenericCommandDTO } from 'src/warcommands/commands-panel/domain/command/model/generic-command.dto';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';

const actionNamespace = '[Commands panel commands]';

export const addCommand = createAction(actionNamespace + ' Add a command', props<{ command: GenericCommandDTO }>());

export const updateCommand = createAction(actionNamespace + ' Update a command', props<{ command: GenericCommandDTO }>());

export const removeCommand = createAction(actionNamespace + ' Remove command', props<{ command: GenericCommandDTO }>());

export const addClassMember =
    createAction(actionNamespace + ' Add a classMember to a command', props<{ commandId: string, classMember: ClassMemberDTO }>());
