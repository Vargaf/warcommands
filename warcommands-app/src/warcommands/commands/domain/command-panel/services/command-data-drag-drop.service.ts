import { Injectable } from '@angular/core';
import { CommandRepositoryService } from '../../command/services/command-repository.service';
import { CommandContainerRepositoryService } from '../../command-container/services/command-container-repository.service';
import { CommandInterface } from '../../command/model/command.interface';
import { CommandWrapperDTO } from 'src/warcommands/commands/infrastructure/angular/drag-drop/command-wrapper.dto';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommandDataDragDropService {

    constructor(
        private readonly commandRepositoryService: CommandRepositoryService,
        private readonly commandContainerRepositoryService: CommandContainerRepositoryService
    ) { }

    saveCommand(command: CommandInterface, index: number): void {
        this.commandRepositoryService.saveCommand(command);
        this.commandContainerRepositoryService.addCommandToCommandContainer(command, index);
    }

    getCommand(commandId: string): Observable<CommandInterface> {
        return this.commandRepositoryService.getCommand(commandId);
    }

    moveSameList(data: CommandWrapperDTO): void {
        this.commandContainerRepositoryService.moveCommandSameContainer(data.containerId, data.previousIndex, data.currentIndex);
    }

    removeCommandDataFromContainerList(data: CommandWrapperDTO): void {
        this.commandContainerRepositoryService.removeCommandFromCommandContainer(data.previousContainerId, data.itemId);
    }

}