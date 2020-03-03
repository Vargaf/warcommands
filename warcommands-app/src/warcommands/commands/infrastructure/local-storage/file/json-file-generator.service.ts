import { Injectable } from '@angular/core';
import { FileDTO } from 'src/warcommands/commands/domain/file/model/file.dto';
import { CommandContainerListDTO, CommandContainerDTO } from 'src/warcommands/commands/domain/command-container/model/command-container.dto';
import { FileJsonDTO, CommandContainerJsonDTO, CommandJsonDTO } from 'src/warcommands/commands/domain/file/model/file-json.dto';
import { CommandInterface } from 'src/warcommands/commands/domain/command/model/command.interface';

@Injectable({
    providedIn: 'root'
})
export class JsonFileGeneratorService {

    static buildFileJson(file: FileDTO, commandContainerList: CommandContainerListDTO): FileJsonDTO {

        const buildCommandContainerJson =
            (commandContainerId: string): CommandContainerJsonDTO => {
                const commandContainer: CommandContainerDTO = commandContainerList[commandContainerId];
                const commandListJson: CommandJsonDTO[] = [];

                for (const command of commandContainer.commands) {
                    const commandJson: CommandJsonDTO = buildCommandJson(command);
                    commandListJson.push(commandJson);
                }

                return {
                    id: commandContainer.id,
                    commands: commandListJson
                };
            };

        const buildCommandJson =
            (command: CommandInterface): CommandJsonDTO => {

            const commandContainerListJson: CommandContainerJsonDTO[] = [];

            // tslint:disable-next-line: forin
            for (const commandContainerIndex in command.innerCommandContainerIdList) {
                const commandContainerId = command.innerCommandContainerIdList[commandContainerIndex];
                const currentCommandContainerJson: CommandContainerJsonDTO =
                    buildCommandContainerJson(commandContainerId);

                commandContainerListJson.push(currentCommandContainerJson);
            }

            return {
                id: command.id,
                type: command.type,
                data: null,
                commandContainerList: commandContainerListJson
            };

        };


        //const commandContainerJson = this.buildCommandContainerJson(file.commandContainerId, commandContainerList);
        const commandContainerJson = buildCommandContainerJson(file.commandContainerId);

        const fileJson: FileJsonDTO = {
            id: file.id,
            name: file.name,
            isMain: file.isMain,
            commandContainer: commandContainerJson
        };

        return fileJson;
    }

    private buildCommandContainerJson(commandContainerId: string, commandContainerList: CommandContainerListDTO): CommandContainerJsonDTO {

        const commandContainer: CommandContainerDTO = commandContainerList[commandContainerId];
        const commandListJson: CommandJsonDTO[] = [];

        for (const command of commandContainer.commands) {
            const commandJson: CommandJsonDTO = this.buildCommandJson(command, commandContainerList);
            commandListJson.push(commandJson);
        }

        const commandContainerJson: CommandContainerJsonDTO = {
            id: commandContainer.id,
            commands: commandListJson
        };

        return commandContainerJson;

    }

    private buildCommandJson(command: CommandInterface, commandContainerList: CommandContainerListDTO): CommandJsonDTO {

        const commandContainerListJson: CommandContainerJsonDTO[] = [];

        // tslint:disable-next-line: forin
        for (const commandContainerIndex in command.innerCommandContainerIdList) {
            const commandContainerId = command.innerCommandContainerIdList[commandContainerIndex];
            const commandContainerJson: CommandContainerJsonDTO =
                this.buildCommandContainerJson(commandContainerId, commandContainerList);

            commandContainerListJson.push(commandContainerJson);
        }

        const commandJson: CommandJsonDTO = {
            id: command.id,
            type: command.type,
            data: null,
            commandContainerList: commandContainerListJson
        };

        return commandJson;

    }

}
