import { Injectable } from "@angular/core";
import { CommandContainerCreatedEvents } from '../events/command-container-created-events';
import { CommandContainerRepositoryService } from './command-container-repository.service';
import { CommandContainerDTO } from '../model/command-container.dto';
import { CommandCreatedEvents } from '../../command/events/command-created-events';
import { CommandAddedEventDTO } from '../../command/events/command-added-event.dto';
import { CommandMovedEvents } from '../../command/events/command-moved-events';
import { CommandMovedEventDTO } from '../../command/events/command-modeved-event.dto';

@Injectable({
    providedIn: 'root'
})
export class CommandContainerRepositoryListenersService {

    constructor(
        private readonly commandContainerCreatedEvents: CommandContainerCreatedEvents,
        private readonly commandCreatedEvents: CommandCreatedEvents,
        private readonly commandMovedEvents: CommandMovedEvents,
        private readonly commandContainerRepositoryService: CommandContainerRepositoryService
    ) {
        this.onCommandContainerCreatedListener();
        this.onCommandAddedToCommandContainerListener();
        this.onCommandMovedListener();
    }

    private onCommandContainerCreatedListener(): void {
        this.commandContainerCreatedEvents.newCommandContainerListener().subscribe((commandContainer: CommandContainerDTO) => {
            this.commandContainerRepositoryService.save(commandContainer);
        });
    }

    private onCommandAddedToCommandContainerListener(): void {
        this.commandCreatedEvents.commandCreatedListener().subscribe((event: CommandAddedEventDTO) => {
            const commandContainer: CommandContainerDTO = this.commandContainerRepositoryService.findById(event.command.parentCommandContainerId);
            commandContainer.commands.splice(event.position, 0, event.command.id);
            this.commandContainerRepositoryService.save(commandContainer);
        });
    }

    private onCommandMovedListener(): void {
        this.commandMovedEvents.commandMovedListener().subscribe((event: CommandMovedEventDTO) => {
            const commandContainerFrom: CommandContainerDTO = this.commandContainerRepositoryService.findById(event.fromContainerId);
            commandContainerFrom.commands.splice(event.fromPosition, 1);
            this.commandContainerRepositoryService.save(commandContainerFrom);

            const commandContainerTo: CommandContainerDTO = this.commandContainerRepositoryService.findById(event.toContainerId);
            commandContainerTo.commands.splice(event.toPosition, 0, event.command.id);
            this.commandContainerRepositoryService.save(commandContainerTo);
        });
    }

}