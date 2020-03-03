import { Injectable } from '@angular/core';
import { CommandType } from '../../command/model/command-type.enum';
import { v4 as uuid } from 'uuid';
import { CommandWrapperDTO } from 'src/warcommands/commands/infrastructure/angular/drag-drop/command-wrapper.dto';
import { IfThenCommandEntity } from '../../command/model/if-then-command.entity';
import { IfThenElseCommandEntity } from '../../command/model/if-then-else-command.entity';
import { CommandInterface } from '../../command/model/command.interface';
import { GameLoopCommandEntity } from '../../command/model/game-loop-command.enntity';

@Injectable({
    providedIn: 'root'
})
export class CommandDataFactory {

    static getCommandObject(commandDropped: CommandWrapperDTO): CommandInterface {

        const command: CommandInterface = {
            id: commandDropped.itemId,
            type: commandDropped.commandType,
            fileId: commandDropped.fileId,
            parentCommandContainerId: commandDropped.containerId
        };

        switch (commandDropped.commandType) {
            case (CommandType.CreateMinion): {
                break;
            }
            case (CommandType.Variable): {
                break;
            }
            case (CommandType.SetVariable): {
                break;
            }
            case (CommandType.IfThen): {
                (command as IfThenCommandEntity).innerCommandContainerIdList = {
                    thenCommandContainerId: uuid()
                };
                break;
            }
            case (CommandType.IfThenElse): {
                (command as IfThenElseCommandEntity).innerCommandContainerIdList = {
                    thenCommandContainerId: uuid(),
                    elseCommandContainerId: uuid(),
                };
                break;
            }
            case (CommandType.GameLoop): {
                (command as GameLoopCommandEntity).innerCommandContainerIdList = {
                    commandContainerId: uuid()
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
