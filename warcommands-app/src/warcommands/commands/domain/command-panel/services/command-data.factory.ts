import { Injectable } from '@angular/core';
import { CommandType } from '../../command/model/command-type.enum';
import { v4 as uuid } from 'uuid';
import { CreateMinionCommandEntity } from '../../command/model/create-minion-command.entity';
import { CommandDroppedInterface } from 'src/warcommands/commands/infrastructure/angular/drag-drop/command-droped';
import { VariableCommandEntity } from '../../command/model/variable-command.entity';
import { SetVariableCommandEntity } from '../../command/model/set-variable-command.entity';
import { IfThenCommandEntity } from '../../command/model/if-then-command.entity';
import { IfThenElseCommandEntity } from '../../command/model/if-then-else-command.entity';

@Injectable({
    providedIn: 'root'
})
export class CommandDataFactory {

    static getCommandObject(commandDropped: CommandDroppedInterface): CreateMinionCommandEntity {

        let command: any;

        switch (commandDropped.commandType) {
            case (CommandType.CreateMinion): {
                (command as CreateMinionCommandEntity) = {
                    id: commandDropped.itemId,
                    type: CommandType.CreateMinion,
                    commandContainerId: commandDropped.containerId,
                    pageId: commandDropped.pageId
                };
                break;
            }
            case (CommandType.Variable): {
                (command as VariableCommandEntity) = {
                    id: commandDropped.itemId,
                    type: CommandType.Variable,
                    commandContainerId: commandDropped.containerId,
                    pageId: commandDropped.pageId
                };
                break;
            }
            case (CommandType.SetVariable): {
                (command as SetVariableCommandEntity) = {
                    id: commandDropped.itemId,
                    type: CommandType.SetVariable,
                    commandContainerId: commandDropped.containerId,
                    pageId: commandDropped.pageId
                };
                break;
            }
            case (CommandType.IfThen): {
                (command as IfThenCommandEntity) = {
                    id: commandDropped.itemId,
                    type: CommandType.IfThen,
                    commandContainerId: commandDropped.containerId,
                    thenCommandContainerId: uuid(),
                    pageId: commandDropped.pageId
                };
                break;
            }
            case (CommandType.IfThenElse): {
                (command as IfThenElseCommandEntity) = {
                    id: commandDropped.itemId,
                    type: CommandType.IfThenElse,
                    commandContainerId: commandDropped.containerId,
                    thenCommandContainerId: uuid(),
                    elseCommandContainerId: uuid(),
                    pageId: commandDropped.pageId
                };
                break;
            }
            default: {
                throw new Error('This command type has no command data. Command type: ' + commandDropped.commandType);
            }
        }

        return command;

    }

}
