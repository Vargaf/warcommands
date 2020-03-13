import { Injectable } from "@angular/core";
import { FileJsonDTO, CommandContainerJsonDTO, CommandJsonDTO } from '../model/file-json.dto';
import { FileDTO } from '../model/file.dto';
import { CommandContainerRepositoryService } from '../../command-container/services/command-container-repository.service';
import { CommandRepositoryService } from '../../command/services/command-repository.service';
import { GenericCommandDTO } from '../../command/model/generic-command.dto';


@Injectable({
    providedIn: 'root'
})
export class JSONFileGeneratorService {

    constructor(
        private readonly commandContainerRepositoryService: CommandContainerRepositoryService,
        private readonly commandRepositoryService: CommandRepositoryService
    ) {

    }

    buildFileJSON(file: FileDTO): FileJsonDTO {

        const commandContainer: CommandContainerJsonDTO = this.buildCommandContainerJSON(file.commandContainerId);

        return {
            id: file.id,
            name: file.name,
            commandContainer: commandContainer
        };
    }

    private buildCommandContainerJSON(commandContainerId: string): CommandContainerJsonDTO {
        const commandContainer = this.commandContainerRepositoryService.findById(commandContainerId);
        const commandJsonList: CommandJsonDTO[] = [];

        for (const commandId of commandContainer.commands) {
            const commandJsonDTO: CommandJsonDTO = this.buildCommandJSON(commandId);
            commandJsonList.push(commandJsonDTO);
        }

        return {
            id: commandContainer.id,
            commands: commandJsonList
        };
    }

    private buildCommandJSON(commandId: string): CommandJsonDTO {

        const command: GenericCommandDTO = this.commandRepositoryService.findById(commandId);
        const commandContainerJsonList: CommandContainerJsonDTO[] = [];

        for (const commandContainerIndex in command.innerCommandContainerIdList) {
            const commandContainerId = command.innerCommandContainerIdList[commandContainerIndex];
            const commandContainetJson: CommandContainerJsonDTO = this.buildCommandContainerJSON(commandContainerId);

            commandContainerJsonList.push(commandContainetJson);
        }

        return {
            id: command.id,
            type: command.type,
            data: null,
            commandContainerList: commandContainerJsonList
        };

    }

}