import { Injectable } from '@angular/core';
import { CommandContainerNgrxRepositoryService } from './command-container-ngrx-repository.service';
import { CommandContainerEvents } from 'src/warcommands/commands-panel/domain/command-container/services/command-container.events';
import { CommandEvents } from 'src/warcommands/commands-panel/domain/command/services/command.events';

@Injectable({
    providedIn: 'root'
})
export class CommandContainerEventListeners {

    constructor(
        private readonly commandContainerNgrxRepositoryService: CommandContainerNgrxRepositoryService,
        private readonly commandContainerEvents: CommandContainerEvents,
        private readonly commandEvents: CommandEvents
    ) {
        this.onLoadedCommandContainerAddItToStore();
        this.onLoadedCommandAddItToCommandContainer();
    }

    private onLoadedCommandContainerAddItToStore(): void {
        this.commandContainerEvents.commandContainerLoadedListener().subscribe((commandContainer) => {
            this.commandContainerNgrxRepositoryService.addCommandContainer(commandContainer);
        });
    }

    private onLoadedCommandAddItToCommandContainer(): void {
        this.commandEvents.commandLoadedListener().subscribe((event) => {
            this.commandContainerNgrxRepositoryService.addCommandToCommandContainer(event.command, event.position);
        });
    }
}
