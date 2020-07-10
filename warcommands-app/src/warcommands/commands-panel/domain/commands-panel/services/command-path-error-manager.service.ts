import { Injectable } from "@angular/core";
import { CommandPathFinderService } from './command-path-finder.service';
import { CommandRepositoryService } from '../../command/services/command-repository.service';
import { CommandPathItemType } from '../model/command-path-tiem-type.enum';
import { GenericCommandDTO } from '../../command/model/generic-command.dto';
import { CommandUpdatedEvents } from '../../command/events/command-updated-events';

@Injectable({
    providedIn: 'root'
})
export class CommandPathErrorManagerService {
 
    constructor(
        private readonly commandPathFinderService: CommandPathFinderService,
        private readonly commandRepositoryService: CommandRepositoryService,
        private readonly commandUpdatedEvents: CommandUpdatedEvents,
    ) {}

    setCommandPathError(commandId: string, commandWasValid: boolean, commandIsValid: boolean): void {

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

}