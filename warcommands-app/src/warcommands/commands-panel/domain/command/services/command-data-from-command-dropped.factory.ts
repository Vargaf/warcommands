import { Injectable } from '@angular/core';
import { CommandType } from '../../command/model/command-type.enum';
import { v4 as uuid } from 'uuid';
import { IfThenCommandEntity } from '../../command/model/if-then-command.entity';
import { IfThenElseCommandEntity } from '../../command/model/if-then-else-command.entity';
import { GameLoopCommandEntity } from '../model/game-loop-command.entity';
import { GenericCommandDTO } from '../model/generic-command.dto';
import { SetVariableFromCommandCommandEntity } from '../model/set-variable-from-command-command.entity';
import { LogicOperatorCommandEntity } from '../model/logic-operator/logic-operator-command.entity';
import { SetVariableCommandEntity } from '../model/set-variable-command.entity';
import { ClassNameENUM } from '../model/class-definition/class-name.enum';

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
            case (CommandType.Variable):
            case (CommandType.Game): {
                break;
            }
            case (CommandType.SetVariable): {
                (command as SetVariableCommandEntity).data = {
                    varName: '',
                    varValue: '',
                    className: ClassNameENUM.String
                }
                break;
            }
            case (CommandType.SetVariableFromCommand): {
                (command as SetVariableFromCommandCommandEntity).innerCommandContainerIdList = {
                    command: uuid()
                };
                (command as SetVariableFromCommandCommandEntity).data = {
                    varName: '',
                    className: ClassNameENUM.String,
                    innerCommandId: null
                }
                break;
            }
            case (CommandType.IfThen): {
                (command as IfThenCommandEntity).innerCommandContainerIdList = {
                    conditionCommandContainerId: uuid(),
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
            case CommandType.LogicOperator: {
                (command as LogicOperatorCommandEntity).innerCommandContainerIdList = {
                    firstCommandContainerId: uuid(),
                    secondCommandContainerId: uuid()
                }
                break;
            }
            default: {
                throw new Error('This command type has no command entity. Command type: ' + commandType);
            }
        }

        return command;

    }

}
