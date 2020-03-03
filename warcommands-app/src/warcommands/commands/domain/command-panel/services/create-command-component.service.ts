import { Injectable } from '@angular/core';
import { CommandInterface } from '../../command/model/command.interface';
import { CommandsDragDropRepositoy } from 'src/warcommands/commands/infrastructure/angular/drag-drop/commands-drag-drop.repository';
import { CommandWrapperDTO } from 'src/warcommands/commands/infrastructure/angular/drag-drop/command-wrapper.dto';

@Injectable({
    providedIn: 'root'
})
export class CreateCommandComponentService {

    constructor(
        private readonly commandsDragDropRepository: CommandsDragDropRepositoy,
    ) {}

    addCommandViewFromFile(command: CommandInterface): void {

        const commandContainerList = this.commandsDragDropRepository.getCommandWrapperList(command.parentCommandContainerId);

        const commandWrapper: CommandWrapperDTO = {
            containerId: command.parentCommandContainerId,
            fileId: command.fileId,
            itemId: command.id,
            previousIndex: 0,
            currentIndex: commandContainerList.length,
            commandType: command.type
        };

        commandContainerList.push(commandWrapper);
        this.commandsDragDropRepository.saveCommandWrapperList(commandWrapper.containerId, commandContainerList);
    }

}
