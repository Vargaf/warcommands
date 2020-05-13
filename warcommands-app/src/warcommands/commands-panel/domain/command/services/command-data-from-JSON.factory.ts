import { CommandJsonDTO } from '../../file/model/file-json.dto';
import { CommandType } from '../../command/model/command-type.enum';
import { GenericCommandDTO } from '../model/generic-command.dto';
import { IfThenCommandEntity } from '../model/if-then-command.entity';
import { IfThenElseCommandEntity } from '../model/if-then-else-command.entity';
import { GameLoopCommandEntity } from '../model/game-loop-command.enntity';
import { GameCommandEntity } from '../model/game-command/game-command.entity';
import { SetVariableFromCommandCommandEntity } from '../model/set-variable-from-command-command.entity';

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
                break;
            }
            case (CommandType.SetVariable): {
                break;
            }
            case (CommandType.SetVariableFromCommand) : {
                (command as SetVariableFromCommandCommandEntity).innerCommandContainerIdList = {
                    command: rawCommand.commandContainerList[0].id
                }
            }
            case (CommandType.Game): {
                (command as GameCommandEntity).classMember = rawCommand.classMember;
                break;
            }
            case (CommandType.IfThen): {
                (command as IfThenCommandEntity).innerCommandContainerIdList = {
                    conditionCommandContainerId: rawCommand.commandContainerList[0].id,
                    thenCommandContainerId: rawCommand.commandContainerList[1].id
                };
                break;
            }
            case (CommandType.IfThenElse): {
                (command as IfThenElseCommandEntity).innerCommandContainerIdList = {
                    thenCommandContainerId: rawCommand.commandContainerList[0].id,
                    elseCommandContainerId: rawCommand.commandContainerList[1].id
                };
                break;
            }
            case (CommandType.GameLoop): {
                (command as GameLoopCommandEntity).innerCommandContainerIdList = {
                    commandContainerId: rawCommand.commandContainerList[0].id
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
