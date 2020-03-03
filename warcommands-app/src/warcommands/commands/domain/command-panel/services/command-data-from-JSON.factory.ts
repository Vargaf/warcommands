import { CommandInterface } from '../../command/model/command.interface';
import { CommandJsonDTO } from '../../file/model/file-json.dto';
import { CommandType } from '../../command/model/command-type.enum';
import { IfThenCommandEntity } from '../../command/model/if-then-command.entity';
import { IfThenElseCommandEntity } from '../../command/model/if-then-else-command.entity';
import { GameLoopCommandEntity } from '../../command/model/game-loop-command.enntity';

export class CommandDataFromJSONFactory {

    static getCommand(rawCommand: CommandJsonDTO, fileId: string, parentCommandContainerId: string): CommandInterface {

        if (!(rawCommand.type in CommandType)) {
            throw new Error('This command type has no command data. Command type: ' + rawCommand.type);
        }

        const command: CommandInterface = {
            id: rawCommand.id,
            type: rawCommand.type,
            parentCommandContainerId,
            fileId
        };

        switch (rawCommand.type) {
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
                    thenCommandContainerId: rawCommand.commandContainerList[0].id
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
