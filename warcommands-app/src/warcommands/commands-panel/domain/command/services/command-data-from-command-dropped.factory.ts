import { Injectable } from '@angular/core';
import { CommandType } from '../../command/model/command-type.enum';
import { v4 as uuid } from 'uuid';
import { IfThenCommandEntity } from '../../command/model/if-then-command.entity';
import { IfThenElseCommandEntity } from '../../command/model/if-then-else-command.entity';
import { GameLoopCommandEntity } from '../../command/model/game-loop-command.enntity';
import { GenericCommandDTO } from '../model/generic-command.dto';

@Injectable({
    providedIn: 'root'
})
export class CommandDataFromCommandDroppedFactory {

    static getCommandObject(commandType: CommandType, fileId: string, commandContainerId: string): GenericCommandDTO {

        const command: GenericCommandDTO = {
            id: uuid(),
            type: commandType,
            fileId,
            parentCommandContainerId: commandContainerId
        };

        switch (commandType) {
            case (CommandType.Variable): {
                break;
            }
            case (CommandType.SetVariable): {
                break;
            }
            case (CommandType.Game): {
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
                throw new Error('This command type has no command data. Command type: ' + commandType);
            }
        }

        return command;

    }

}
