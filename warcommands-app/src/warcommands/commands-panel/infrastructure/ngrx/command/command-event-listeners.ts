import { Injectable } from '@angular/core';
import { CommandNgrxRepositoryService } from './command-ngrx-repository.service';
import { CommandFromFileLoadEvents } from 'src/warcommands/commands-panel/domain/command/events/command-from-file-load.events';
import { CommandCreatedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-created-events';
import { CommandMovedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-moved-events';
import { CommandRemovedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-removed-events';

@Injectable({
    providedIn: 'root'
})
export class CommandEventListeners {

    constructor(
        private readonly commandNgrxRepositoryService: CommandNgrxRepositoryService,
        private readonly commandEventsFromFileLoad: CommandFromFileLoadEvents,
        private readonly commandCreatedEvents: CommandCreatedEvents,
        private readonly commandMovedEvents: CommandMovedEvents,
        private readonly commandRemovedEvents: CommandRemovedEvents
    ) {
        this.onLoadedCommandAddItToStore();
        this.onNewCommandAddItToStore();
        this.onCommandMovedUpdateStore();
        this.onCommandRemovedUpdateStore();
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

    private onCommandRemovedUpdateStore(): void {
        this.commandRemovedEvents.commandRemovedListener().subscribe((command) => {
            this.commandNgrxRepositoryService.removeCommand(command);
        });
    }
}
