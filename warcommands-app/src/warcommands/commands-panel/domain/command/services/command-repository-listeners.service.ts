import { Injectable } from "@angular/core";
import { CommandCreatedEvents } from '../events/command-created-events';
import { CommandRepositoryService } from './command-repository.service';
import { CommandAddedEventDTO } from '../events/command-added-event.dto';
import { CommandMovedEvents } from '../events/command-moved-events';
import { CommandMovedEventDTO } from '../events/command-modeved-event.dto';
import { CommandRemovedEvents } from '../events/command-removed-events';
import { GenericCommandDTO } from '../model/generic-command.dto';
import { CommandClassMemberAddedEvents } from '../events/command-class-member-added-events';
import { CommandClassMemberAddedEventDTO } from '../events/command-class-member-added-event.dto';

@Injectable({
    providedIn: 'root'
})
export class CommandRepositoryListenersService {

    constructor(
        private readonly commandRepositoryService: CommandRepositoryService,
        private readonly commandCreatedEvents: CommandCreatedEvents,
        private readonly commandMovedEvents: CommandMovedEvents,
        private readonly commandRemovedEvents: CommandRemovedEvents,
        private readonly commandClassMemberAddedEvents: CommandClassMemberAddedEvents
    ) {
        this.onCommandCreatedListener();
        this.onCommandMovedListener();
        this.onCommandRemoveListener();
        this.onCommandClassMemberAddedListener();
    }

    private onCommandCreatedListener(): void {
        this.commandCreatedEvents.commandCreatedListener().subscribe((event: CommandAddedEventDTO) => {
            this.commandRepositoryService.save(event.command);
        });
    }

    private onCommandMovedListener(): void {
        this.commandMovedEvents.commandMovedListener().subscribe((event: CommandMovedEventDTO) => {
            this.commandRepositoryService.save(event.command);
        });
    }

    private onCommandRemoveListener(): void {
        this.commandRemovedEvents.commandRemovedListener().subscribe((command: GenericCommandDTO) => {
            this.commandRepositoryService.remove(command.id);
        });
    }

    private onCommandClassMemberAddedListener(): void {
        this.commandClassMemberAddedEvents.commandClassMemberAddedListener().subscribe((event: CommandClassMemberAddedEventDTO) => {
            this.commandRepositoryService.addClassMember(event.commandId, event.classMember);
        });
    }

}
