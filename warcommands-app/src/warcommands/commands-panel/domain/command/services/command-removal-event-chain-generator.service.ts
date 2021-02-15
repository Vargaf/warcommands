import { Injectable } from "@angular/core";
import { CommandRepositoryService } from './command-repository.service';
import { CommandContainerRepositoryService } from '../../command-container/services/command-container-repository.service';
import { GenericCommandDTO } from '../model/generic-command.dto';
import { CommandContainerDTO } from '../../command-container/model/command-container.dto';
import { CommandRemovedEvents } from '../events/command-removed-events';
import { CommandContainerRemovedEvents } from '../../command-container/events/command-container-removed-events';

@Injectable({
    providedIn: 'root'
})
export class CommandRemovalEventChainGeneratorService {

    constructor(
        private readonly commandRepositoryService: CommandRepositoryService,
        private readonly commandContainerRepositoryService: CommandContainerRepositoryService,
        private readonly commandRemoveEvents: CommandRemovedEvents,
        private readonly commandContainerRemovedEvents: CommandContainerRemovedEvents,
    ) {

    }

    generateCommandRemovalEventChain(commandId: string): void {

        const commandList: GenericCommandDTO[] = this.generateCommandRemovalChain(commandId);
        
        for (const command of commandList) {
            this.commandRemoveEvents.commandRemovedDispatch(command);
            this.commandRemoveEvents.commandRemovedFromCommandContainerDispatch(command);

            for (const commandContainerIndex in command.innerCommandContainerIdList) {
                const commandContainerId = command.innerCommandContainerIdList[commandContainerIndex];
                const commandContainer = this.commandContainerRepositoryService.findById(commandContainerId);
                this.commandContainerRemovedEvents.commandContainerRemovedDispatch(commandContainer);
            }
        };

    }

    private generateCommandRemovalChain(commandId: string): GenericCommandDTO[] {
        const command: GenericCommandDTO = this.commandRepositoryService.findById(commandId);
        let commandList: GenericCommandDTO[] = [];

        commandList.splice(0, 0, command);

        for (const commandContainerIndex in command.innerCommandContainerIdList) {
            const commandContainerId = command.innerCommandContainerIdList[commandContainerIndex];
            const commandContainer: CommandContainerDTO = this.commandContainerRepositoryService.findById(commandContainerId);

            for (const innerCommandId of commandContainer.commands) {
                const innerCommands: GenericCommandDTO[] = this.generateCommandRemovalChain(innerCommandId);
                commandList = innerCommands.concat(commandList);
            }
        }

        return commandList;
    }
    

}