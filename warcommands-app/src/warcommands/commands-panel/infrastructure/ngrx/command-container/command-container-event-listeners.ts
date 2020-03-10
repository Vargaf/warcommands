import { Injectable } from '@angular/core';
import { CommandContainerNgrxRepositoryService } from './command-container-ngrx-repository.service';
import { CommandContainerEvents } from 'src/warcommands/commands-panel/domain/command-container/services/command-container.events';
import { CommandFromFileLoadEvents } from 'src/warcommands/commands-panel/domain/command/events/command-from-file-load.events';
import { CommandCreatedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-created-events';
import { CommandContainerCreatedEvents } from 'src/warcommands/commands-panel/domain/command-container/events/command-container-created-events';
import { CommandMovedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-moved-events';
import { CommandMovedEventDTO } from 'src/warcommands/commands-panel/domain/command/events/command-modeved-event.dto';

@Injectable({
    providedIn: 'root'
})
export class CommandContainerEventListeners {

    constructor(
        private readonly commandContainerNgrxRepositoryService: CommandContainerNgrxRepositoryService,
        private readonly commandContainerEvents: CommandContainerEvents,
        private readonly commandEvents: CommandFromFileLoadEvents,
        private readonly commandCreatedEvents: CommandCreatedEvents,
        private readonly commandContainerCreatedEvents: CommandContainerCreatedEvents,
        private readonly commandMovedEvents: CommandMovedEvents
    ) {
        this.onLoadedCommandContainerAddItToStore();
        this.onLoadedCommandAddItToCommandContainer();
        this.onNewCommandContainerAddItToStore();
        this.onNewCommandAddItToCommandContainer();
        this.onCommandMovedUpdateStore();
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
}
