import { Injectable } from '@angular/core';
import { CommandContainerNgrxRepositoryService } from './command-container-ngrx-repository.service';
import { CommandContainerEvents } from 'src/warcommands/commands-panel/domain/command-container/services/command-container.events';
import { CommandCreatedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-created-events';
import { CommandContainerCreatedEvents } from 'src/warcommands/commands-panel/domain/command-container/events/command-container-created-events';
import { CommandMovedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-moved-events';
import { CommandMovedEventDTO } from 'src/warcommands/commands-panel/domain/command/events/command-modeved-event.dto';
import { CommandRemovedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-removed-events';
import { CommandContainerRemovedEvents } from 'src/warcommands/commands-panel/domain/command-container/events/command-container-removed-events';

@Injectable({
    providedIn: 'root'
})
export class CommandContainerEventListeners {

    constructor(
        private readonly commandContainerNgrxRepositoryService: CommandContainerNgrxRepositoryService,
        private readonly commandContainerEvents: CommandContainerEvents,
        private readonly commandCreatedEvents: CommandCreatedEvents,
        private readonly commandContainerCreatedEvents: CommandContainerCreatedEvents,
        private readonly commandMovedEvents: CommandMovedEvents,
        private readonly commandRemovedEvents: CommandRemovedEvents,
        private readonly commandContainerRemovedEvents: CommandContainerRemovedEvents,
    ) {
        this.onLoadedCommandContainerAddItToStore();
        this.onNewCommandContainerAddItToStore();
        this.onNewCommandAddItToCommandContainer();
        this.onCommandMovedUpdateStore();
        this.onCommandRemovedUpdateStore();
        this.onCommandContainerRemovedUpdateStore();
    }

    private onLoadedCommandContainerAddItToStore(): void {
        this.commandContainerEvents.commandContainerLoadedListener().subscribe((commandContainer) => {
            this.commandContainerNgrxRepositoryService.addCommandContainer(commandContainer);
        });
    }

    private onNewCommandContainerAddItToStore(): void {
        this.commandContainerCreatedEvents.newCommandContainerListener().subscribe((commandContainerDTO) => {
            this.commandContainerNgrxRepositoryService.addCommandContainer(commandContainerDTO);
        });
    }

    private onNewCommandAddItToCommandContainer(): void {
        this.commandCreatedEvents.commandCreatedListener().subscribe((event) => {
            this.commandContainerNgrxRepositoryService.addCommandToCommandContainer(
                event.command,
                event.position);
        });
    }

    private onCommandMovedUpdateStore(): void {
        this.commandMovedEvents.commandMovedListener().subscribe((event: CommandMovedEventDTO) => {
            this.commandContainerNgrxRepositoryService.removeCommandFromContainer(event.command.id, event.fromContainerId);
            this.commandContainerNgrxRepositoryService.addCommandToCommandContainer(
                event.command,
                event.toPosition);
        });
    }

    private onCommandRemovedUpdateStore(): void {
        this.commandRemovedEvents.commandRemovedListener().subscribe((command) => {
            this.commandContainerNgrxRepositoryService.removeCommandFromContainer(command.id, command.parentCommandContainerId);
        });
    }

    private onCommandContainerRemovedUpdateStore(): void {
        this.commandContainerRemovedEvents.commandContainerRemovedListener().subscribe((commandContainer) => {
            this.commandContainerNgrxRepositoryService.removeCommandContainer(commandContainer);
        });
    }
}
