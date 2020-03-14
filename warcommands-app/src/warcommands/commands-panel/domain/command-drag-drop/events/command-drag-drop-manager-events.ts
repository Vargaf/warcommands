import { Injectable } from '@angular/core';
import { CommandWrapperDTO } from '../model/command-wrapper.dto';
import { CommandContainerDTO } from '../../command-container/model/command-container.dto';
import { CommandCreatedEvents } from '../../command/events/command-created-events';
import { CommandContainerCreatedEvents } from '../../command-container/events/command-container-created-events';
import { CommandMovedEvents } from '../../command/events/command-moved-events';
import { CommandMovedEventDTO } from '../../command/events/command-modeved-event.dto';
import { CommandRemovedEvents } from '../../command/events/command-removed-events';
import { CommandContainerRemovedEvents } from '../../command-container/events/command-container-removed-events';
import { CommandAddedEventDTO } from '../../command/events/command-added-event.dto';

@Injectable({
    providedIn: 'root'
})
export class CommandDragDropManagerEvents {

    constructor(
        private readonly commandCreatedEvents: CommandCreatedEvents,
        private readonly commandContainerCreatedEvents: CommandContainerCreatedEvents,
        private readonly commandMovedEvents: CommandMovedEvents,
        private readonly commandRemovedEvents: CommandRemovedEvents,
        private readonly commandContainerRemovedEvents: CommandContainerRemovedEvents
    ) {}

    commandCreatedDispatch(commandWrapperDTO: CommandWrapperDTO): void {
        const commandEvent: CommandAddedEventDTO = {
            command: commandWrapperDTO.command,
            position: commandWrapperDTO.currentIndex
        };
        this.commandCreatedEvents.commandCreatedDispatch(commandEvent);
        this.commandCreatedEvents.commandAddedToCommandContainerDispatch(commandEvent);
    }

    commandContainerCreatedDispatch(commandContainer: CommandContainerDTO): void {
        this.commandContainerCreatedEvents.newCommandContainerDispatch(commandContainer);
    }

    commandMovedDispatch(commandWrapperDTO: CommandWrapperDTO): void {
        const commandMovedDTO: CommandMovedEventDTO = {
            fromContainerId: commandWrapperDTO.previousContainerId,
            toContainerId: commandWrapperDTO.containerId,
            fromPosition: commandWrapperDTO.previousIndex,
            toPosition: commandWrapperDTO.currentIndex,
            command: commandWrapperDTO.command
        };
        this.commandMovedEvents.commandMovedDispatch(commandMovedDTO);
        this.commandMovedEvents.commandMovedFromCommandContainerDispatch(commandMovedDTO);
        this.commandMovedEvents.commandMovedToCommandContainerDispatch(commandMovedDTO);
    }

    commandRemovedDispatch(commandWrapperDTO: CommandWrapperDTO): void {
        this.commandRemovedEvents.commandRemovedDispatch(commandWrapperDTO.command);
        this.commandRemovedEvents.commandRemovedFromCommandContainerDispatch(commandWrapperDTO.command);
    }

    commandContainerRemovedDispatch(commandContainerDTO: CommandContainerDTO): void {
        this.commandContainerRemovedEvents.commandContainerRemovedDispatch(commandContainerDTO);
    }

}
