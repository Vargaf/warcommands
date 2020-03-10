import { Injectable } from '@angular/core';
import { CommandNgrxRepositoryService } from './command-ngrx-repository.service';
import { CommandFromFileLoadEvents } from 'src/warcommands/commands-panel/domain/command/events/command-from-file-load.events';
import { CommandCreatedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-created-events';
import { CommandMovedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-moved-events';

@Injectable({
    providedIn: 'root'
})
export class CommandEventListeners {

    constructor(
        private readonly commandNgrxRepositoryService: CommandNgrxRepositoryService,
        private readonly commandEventsFromFileLoad: CommandFromFileLoadEvents,
        private readonly commandCreatedEvents: CommandCreatedEvents,
        private readonly commandMovedEvents: CommandMovedEvents
    ) {
        this.onLoadedCommandAddItToStore();
        this.onNewCommandAddItToStore();
        this.onCommandMovedUpdateStore();
    }

    private onLoadedCommandAddItToStore(): void {
        this.commandEventsFromFileLoad.commandLoadedListener().subscribe((event) => {
            this.commandNgrxRepositoryService.saveCommand(event.command);
        });
    }

    private onNewCommandAddItToStore(): void {
        this.commandCreatedEvents.commandCreatedListener().subscribe((event) => {
            this.commandNgrxRepositoryService.saveCommand(event.command);
        });
    }

    private onCommandMovedUpdateStore(): void {
        this.commandMovedEvents.commandMovedListener().subscribe((event) => {
            this.commandNgrxRepositoryService.saveCommand(event.command);
        });
    }
}
