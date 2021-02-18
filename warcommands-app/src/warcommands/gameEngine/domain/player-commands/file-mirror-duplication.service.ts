import { FileJsonDTO, CommandContainerJsonDTO, CommandJsonDTO } from '../file/file-json.dto';
import { v4 as uuid } from 'uuid';
import { CommandType } from '../command/model/command-type.enum';
import * as _ from 'lodash';

export class FileMirrorDuplicationService {

    private readonly commandMappingList: Map<string, String> = new Map<string, String>();

    private readonly commandContainerMappingList: Map<string, String> = new Map<string, String>();

    duplicateFile(file: FileJsonDTO, newPlayerId: string): FileJsonDTO {

        const newCommandContainer = this.duplicateCommandContainer(file.commandContainer!, newPlayerId);

        const newFile: FileJsonDTO = {
            id: file.id,
            name: file.name,
            playerId: newPlayerId,
            commandContainer: newCommandContainer
        };

        return newFile;

    }

    private duplicateCommandContainer(commandContainer: CommandContainerJsonDTO, newPlayerId: string): CommandContainerJsonDTO {
        const newCommandContainerId = this.getNewCommandContainerId(commandContainer.id);
        const newCommandContainer: CommandContainerJsonDTO = {
            id: newCommandContainerId,
            commands: []
        };

        for (const command of commandContainer.commands) {
            const newCommand: CommandJsonDTO = this.duplicateCommand(command, newPlayerId);
            newCommandContainer.commands.push(newCommand);
        }

        return newCommandContainer;
    }

    private duplicateCommand(command: CommandJsonDTO, newPlayerId: string): CommandJsonDTO {
        const newCommandId = this.getNewCommandId(command.id);
        const newCommand: CommandJsonDTO = {
            id: newCommandId,
            type: command.type,
            data: _.cloneDeep(command.data),
            commandContainerList: {},
            classMember: null,
        }

        if (newCommand.type === CommandType.Variable) {
            const currentCommandId = (newCommand as any).data.variableCommandId;
            (newCommand as any).data.variableCommandId = this.getNewCommandId(currentCommandId);
        }

        if (command.classMember) {
            newCommand.classMember = { ...command.classMember };
        }

        for (const commandContainerIndex in command.commandContainerList) {
            const commandContainer = command.commandContainerList[commandContainerIndex];
            const newCommandContainer = this.duplicateCommandContainer(commandContainer, newPlayerId);
            newCommand.commandContainerList[commandContainerIndex] = newCommandContainer;
        }

        return newCommand;
    }

    private getNewCommandContainerId(currentCommandContainerId: string): string {
        if (!this.commandContainerMappingList.has(currentCommandContainerId)) {
            this.commandContainerMappingList.set(currentCommandContainerId, uuid());
        }

        return <string>this.commandContainerMappingList.get(currentCommandContainerId);
    }

    private getNewCommandId(currentCommandId: string): string {
        if (!this.commandMappingList.has(currentCommandId)) {
            this.commandMappingList.set(currentCommandId, uuid());
        }

        return <string>this.commandMappingList.get(currentCommandId);
    }

}