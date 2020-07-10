import { Injectable } from "@angular/core";
import { CommandContainerRepositoryService } from '../../command-container/services/command-container-repository.service';
import { CommandRepositoryService } from '../../command/services/command-repository.service';
import { CommandPathItemDTO } from '../model/comand-path-item.dto';
import { GenericCommandDTO } from '../../command/model/generic-command.dto';
import { CommandPathItemType } from '../model/command-path-tiem-type.enum';
import { CommandContainerDTO } from '../../command-container/model/command-container.dto';

@Injectable({
    providedIn: 'root'
})
export class CommandPathFinderService {

    constructor(
        private readonly commandContainerRepositoryService: CommandContainerRepositoryService,
        private readonly commandRepositoryService: CommandRepositoryService
    ) {}

    getCommandPath(commandId: string): CommandPathItemDTO[] {

        const commandPath: CommandPathItemDTO[] = this.buildCommandPath(commandId);

        return commandPath;
    }

    private buildCommandPath(commandId: string): CommandPathItemDTO[] {

        const commandPath: CommandPathItemDTO[] = [];
        const command: GenericCommandDTO = this.commandRepositoryService.findById(commandId);

        const commandItem: CommandPathItemDTO = {
            type: CommandPathItemType.Command,
            itemId: commandId
        }
        commandPath.push(commandItem);

        const commandContainerPath = this.buildCommandContainerPath(command.parentCommandContainerId);
        Array.prototype.push.apply(commandPath, commandContainerPath);
        
        return commandPath;
    }

    private buildCommandContainerPath(commandContainerId: string): CommandPathItemDTO[] {
        const commandContainerPath: CommandPathItemDTO[] = [];
        const commandContainer: CommandContainerDTO = this.commandContainerRepositoryService.findById(commandContainerId);

        const commandItem: CommandPathItemDTO = {
            type: CommandPathItemType.CommandContainer,
            itemId: commandContainerId
        }

        commandContainerPath.push(commandItem);

        if (commandContainer.parentCommandId) {
            const commandPath: CommandPathItemDTO[] = this.buildCommandPath(commandContainer.parentCommandId);
            Array.prototype.push.apply(commandContainerPath, commandPath);
        }
        
        return commandContainerPath;
    }



}