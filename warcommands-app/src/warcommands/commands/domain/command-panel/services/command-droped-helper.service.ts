import { Injectable } from '@angular/core';
import { CommandWrapperDTO } from 'src/warcommands/commands/infrastructure/angular/drag-drop/command-wrapper.dto';
import { v4 as uuid } from 'uuid';
import { DropType } from 'src/warcommands/commands/infrastructure/angular/drag-drop/drop-type.enum';
import { CommandInterface } from '../../command/model/command.interface';
import { CommandDataFactory } from './command-data.factory';
import { CommandRepositoryService } from '../../command/services/command-repository.service';
import { CommandContainerRepositoryService } from '../../command-container/services/command-container-repository.service';
import { CommandContainerDTO } from '../../command-container/model/command-container.dto';

@Injectable({
    providedIn: 'root'
})
export class CommandDropedHelperService {

    constructor(
        private readonly commandRepositoryService: CommandRepositoryService,
        private readonly commandContainerRepository: CommandContainerRepositoryService
    ) {}

    buildNewCommandWrapper(event: any): CommandWrapperDTO {
        const commandWrapper: CommandWrapperDTO = {
            containerId: (event.container.element as any).getAttribute('id'),
            previousContainerId: (event.previousContainer.element as any).getAttribute('id'),
            fileId: (event.container.element as any).getAttribute('fileId'),
            itemId: uuid(),
            previousIndex: event.previousIndex,
            currentIndex: event.currentIndex,
            commandType: event.item.data,
            dropType: DropType.New
        };

        return commandWrapper;
    }

    updateCommandWrapper(event: any, commandWrapper: CommandWrapperDTO): CommandWrapperDTO {
        commandWrapper.containerId = (event.container.element as any).getAttribute('id');
        commandWrapper.previousContainerId = (event.previousContainer.element as any).getAttribute('id');
        commandWrapper.fileId = (event.previousContainer.element as any).getAttribute('fileId');
        commandWrapper.previousIndex = event.previousIndex;
        commandWrapper.currentIndex = event.currentIndex;

        if (event.previousContainer.id === event.container.id) {
            commandWrapper.dropType = DropType.MoveSameList;
        } else {
            commandWrapper.dropType = DropType.MoveAnotherList;
        }

        return commandWrapper;
    }

    createNewCommand(commandWrapper: CommandWrapperDTO): void {

        const command: CommandInterface = CommandDataFactory.getCommandObject(commandWrapper);

        this.commandRepositoryService.saveCommand(command);
        this.commandContainerRepository.addCommandToCommandContainer(command, commandWrapper.currentIndex);

        // tslint:disable-next-line: forin
        for (const commandContainerIndex in command.innerCommandContainerIdList) {
            const commandContainerId = command.innerCommandContainerIdList[commandContainerIndex];
            this.createInnerCommandContainers(commandContainerId, command.fileId);
        }
    }

    private createInnerCommandContainers(commandContainerId: string, fileId: string): void {
        const commandContainer: CommandContainerDTO = {
            id: commandContainerId,
            fileId,
            commands: []
        };

        this.commandContainerRepository.saveCommandContainer(commandContainer);
    }

}
