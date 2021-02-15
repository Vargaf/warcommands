import { Injectable } from '@angular/core';
import { CommandType } from '../../command/model/command-type.enum';
import { CommandContainerRepositoryService } from './command-container-repository.service';
import { CommandRepositoryService } from '../../command/services/command-repository.service';
import { CommandContainerDTO } from '../model/command-container.dto';
import { GenericCommandDTO } from '../../command/model/generic-command.dto';
import { commandDraggedAvailability } from '../model/command-dragged-availability';
import { IfThenCommandEntity } from '../../command/model/if-then-command.entity';


@Injectable({
    providedIn: 'root'
})
export class CommandEnterPredicateAvalabilityService {

    constructor(
        private readonly commandContainerRepositoryService: CommandContainerRepositoryService,
        private readonly commandRepositoryService: CommandRepositoryService,
    ) {}

    isDraggedCommandAvailableToDrop(draggedCommandType: CommandType, commandContainerId: string): boolean {
        let isCommandAvailable = false;

        const commandContainer: CommandContainerDTO = this.commandContainerRepositoryService.findById(commandContainerId);

        if (this.isCommandDraggedOnFileCommandContainer(commandContainer)) {
            isCommandAvailable = true;
        } else {
            const command: GenericCommandDTO = this.commandRepositoryService.findById(commandContainer.parentCommandId);

            switch (command.type) {
                case CommandType.GameLoop: {
                    isCommandAvailable = true;
                    break;
                }
                case CommandType.LogicOperator:
                case CommandType.SetVariableFromCommand: {
                    isCommandAvailable = this.isDropAvailableOnSimpleCommand(draggedCommandType, command.type, commandContainer);
                    break;
                }
                case CommandType.IfThen: {
                    isCommandAvailable = this.isDropAvailableOnComplexCommand(command, commandContainer, draggedCommandType);
                }
                
            }
        }

        return isCommandAvailable;
    }

    private isCommandDraggedOnFileCommandContainer(commandContainer: CommandContainerDTO): boolean {
        return commandContainer.parentCommandId === null;
    }

    private isDropAvailableOnSimpleCommand(draggedCommandType: CommandType, commandContainerType: CommandType, commandContainer: CommandContainerDTO): boolean {
        let isCommandAvailable = false;

        if (commandContainer.commands.length === 0) {
            const dragAvailable = commandDraggedAvailability[commandContainerType].some((element) => element === draggedCommandType);
        if (dragAvailable) {
            isCommandAvailable = true;
        }
        }
        
        return isCommandAvailable;
    }

    private isDropAvailableOnComplexCommand(command: GenericCommandDTO, commandContainer: CommandContainerDTO, commandDraggedType: CommandType): boolean {
        let isCommandAvailable = true;

        switch (command.type) {
            case CommandType.IfThen: {
                const containerCommand: IfThenCommandEntity = (command as IfThenCommandEntity);
                if (containerCommand.innerCommandContainerIdList.conditionCommandContainerId === commandContainer.id) {
                    isCommandAvailable = this.isDropAvailableOnSimpleCommand(commandDraggedType, command.type, commandContainer);
                    break;
                }
            }
        }

        return isCommandAvailable;
    }

}