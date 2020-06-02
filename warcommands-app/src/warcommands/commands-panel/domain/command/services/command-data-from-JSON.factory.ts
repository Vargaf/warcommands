import { CommandJsonDTO } from '../../file/model/file-json.dto';
import { CommandType } from '../../command/model/command-type.enum';
import { GenericCommandDTO } from '../model/generic-command.dto';
import { IfThenCommandEntity } from '../model/if-then-command.entity';
import { IfThenElseCommandEntity } from '../model/if-then-else-command.entity';
import { GameLoopCommandEntity } from '../model/game-loop-command.entity';
import { GameCommandEntity } from '../model/game-command/game-command.entity';
import { SetVariableFromCommandCommandEntity } from '../model/set-variable-from-command-command.entity';
import { LogicOperatorCommandEntity } from '../model/logic-operator/logic-operator-command.entity';
import { VariableCommandEntity } from '../model/variable/model/variable-command.entity';

export class CommandDataFromJSONFactory {

    static getCommand(rawCommand: CommandJsonDTO, fileId: string, parentCommandContainerId: string): GenericCommandDTO {

        if (!(rawCommand.type in CommandType)) {
            throw new Error('This command type has no command data. Command type: ' + rawCommand.type);
        }

        const command: GenericCommandDTO = {
            id: rawCommand.id,
            type: rawCommand.type,
            parentCommandContainerId,
            fileId,
            data: rawCommand.data,
        };

        switch (rawCommand.type) {
            case (CommandType.Variable): {
                (command as VariableCommandEntity).classMember = rawCommand.classMember;
                break;
            }
            case (CommandType.SetVariable): {
                break;
            }
            case (CommandType.SetVariableFromCommand) : {
                (command as SetVariableFromCommandCommandEntity).innerCommandContainerIdList = {
                    command: rawCommand.commandContainerList.command.id
                }
            }
            case (CommandType.Game): {
                (command as GameCommandEntity).classMember = rawCommand.classMember;
                break;
            }
            case (CommandType.IfThen): {
                (command as IfThenCommandEntity).innerCommandContainerIdList = {
                    conditionCommandContainerId: rawCommand.commandContainerList.conditionCommandContainerId.id,
                    thenCommandContainerId: rawCommand.commandContainerList.thenCommandContainerId.id
                };
                break;
            }
            case (CommandType.IfThenElse): {
                (command as IfThenElseCommandEntity).innerCommandContainerIdList = {
                    thenCommandContainerId: rawCommand.commandContainerList.thenCommandContainerId.id,
                    elseCommandContainerId: rawCommand.commandContainerList.elseCommandContainerId.id
                };
                break;
            }
            case (CommandType.GameLoop): {
                (command as GameLoopCommandEntity).innerCommandContainerIdList = {
                    commandContainerId: rawCommand.commandContainerList.commandContainerId.id
                };
                break;
            }
            case CommandType.LogicOperator: {
                (command as LogicOperatorCommandEntity).innerCommandContainerIdList = {
                    firstCommandContainerId: rawCommand.commandContainerList.firstCommandContainerId.id,
                    secondCommandContainerId: rawCommand.commandContainerList.secondCommandContainerId.id
                };
                break;
            }
            default: {
                throw new Error('This command type has no command data. Command type: ' + rawCommand.type);
            }
        }

        return command;

    }

}
