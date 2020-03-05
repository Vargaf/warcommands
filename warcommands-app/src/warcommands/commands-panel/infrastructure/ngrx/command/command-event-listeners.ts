import { Injectable } from '@angular/core';
import { CommandNgrxRepositoryService } from './command-ngrx-repository.service';
import { CommandEvents } from 'src/warcommands/commands-panel/domain/command/services/command.events';

@Injectable({
    providedIn: 'root'
})
export class CommandEventListeners {

    constructor(
        private readonly commandNgrxRepositoryService: CommandNgrxRepositoryService,
        private readonly commandEvents: CommandEvents
    ) {
        this.onLoadedCommandAddItToStore();
    }

    private onLoadedCommandAddItToStore(): void {
        this.commandEvents.commandLoadedListener().subscribe((event) => {
            this.commandNgrxRepositoryService.saveCommand(event.command);
        });
    }
}
