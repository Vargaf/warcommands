import { FileJsonDTO, CommandContainerJsonDTO, CommandJsonDTO } from '../file/file-json.dto';
import { v4 as uuid } from 'uuid';

export class FileMirrorDuplicationService {

    private readonly commandMappingList = [];
    private readonly commandContainerMappingList = [];

    duplicateFile(file: FileJsonDTO, newPlayerId: string): FileJsonDTO {

        const newFile: FileJsonDTO = {
            id: file.id,
            name: file.name,
            playerId: newPlayerId,
            commandContainer: null
        };

        const newCommandContainer = this.duplicateCommandContainer(file.commandContainer, newPlayerId);
        newFile.commandContainer = newCommandContainer;

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
            data: command.data,
            commandContainerList: {},
            classMember: null,
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
        if (this.commandContainerMappingList[currentCommandContainerId] === undefined) {
            this.commandContainerMappingList[currentCommandContainerId] = uuid();
        }

        return this.commandContainerMappingList[currentCommandContainerId];
    }

    private getNewCommandId(currentCommandId: string): string {
        if (this.commandMappingList[currentCommandId] === undefined) {
            this.commandMappingList[currentCommandId] = uuid();
        }

        return this.commandMappingList[currentCommandId];
    }

}