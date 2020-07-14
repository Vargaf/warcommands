import { Injectable } from "@angular/core";
import { CommandPathFinderService } from './command-path-finder.service';
import { CommandRepositoryService } from '../../command/services/command-repository.service';
import { CommandPathItemType } from '../model/command-path-item-type.enum';
import { GenericCommandDTO } from '../../command/model/generic-command.dto';
import { CommandUpdatedEvents } from '../../command/events/command-updated-events';
import { CommandPathItemDTO } from '../model/command-path-item.dto';

@Injectable({
    providedIn: 'root'
})
export class CommandPathErrorManagerService {
 
    constructor(
        private readonly commandPathFinderService: CommandPathFinderService,
        private readonly commandRepositoryService: CommandRepositoryService,
        private readonly commandUpdatedEvents: CommandUpdatedEvents,
    ) {}

    buildCommandPathError(commandId: string, commandWasValid: boolean, commandIsValid: boolean): void {

        if (commandWasValid !== commandIsValid) {
            const commandPath = this.commandPathFinderService.getCommandPath(commandId);

            let errorCounterModifier = -1;

            if (commandIsValid === false) {
                errorCounterModifier = 1;
            }

            for (const commandPathItem of commandPath) {
                if (commandPathItem.type === CommandPathItemType.Command) {
                    const command: GenericCommandDTO = this.commandRepositoryService.findById(commandPathItem.itemId);

                    command.commandPathErrorsCounter += errorCounterModifier;
                    this.commandUpdatedEvents.commandUpdatedDispatch(command);

                }
            }
        }

    }

    resetCommandPathError(commandPath: CommandPathItemDTO[]): void {
        for (const commandPathItem of commandPath) {
            if (commandPathItem.type === CommandPathItemType.Command) {
                const command: GenericCommandDTO = this.commandRepositoryService.findById(commandPathItem.itemId);

                command.commandPathErrorsCounter--;
                this.commandUpdatedEvents.commandUpdatedDispatch(command);

            }
        }
    }

}