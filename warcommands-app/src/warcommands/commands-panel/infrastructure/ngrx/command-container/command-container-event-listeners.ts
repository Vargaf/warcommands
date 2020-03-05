import { Injectable } from '@angular/core';
import { CommandContainerNgrxRepositoryService } from './command-container-ngrx-repository.service';
import { CommandContainerEvents } from 'src/warcommands/commands-panel/domain/command-container/services/command-container.events';

@Injectable({
    providedIn: 'root'
})
export class CommandContainerEventListeners {

    constructor(
        private readonly commandContainerNgrxRepositoryService: CommandContainerNgrxRepositoryService,
        private readonly commandContainerEvents: CommandContainerEvents,
    ) {
        this.onLoadedCommandContainerAddItToStore();
    }

    private onLoadedCommandContainerAddItToStore(): void {
        this.commandContainerEvents.commandContainerLoadedListener().subscribe((commandContainer) => {
            this.commandContainerNgrxRepositoryService.addCommandContainer(commandContainer);
        });
    }
}
