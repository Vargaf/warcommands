import { CommandPathManageable } from 'src/warcommands/commands-panel/domain/command-component/composition/command-path-manageable';
import { CommandPathValidable } from 'src/warcommands/commands-panel/domain/command-component/composition/command-path-validable';
import { CommandPathFinderService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-finder.service';
import { CommandPathErrorManagerService } from '../../commands-panel/services/command-path-error-manager.service';
import { GenericCommandDTO } from '../../command/model/generic-command.dto';

export interface CommandComponent extends CommandPathManageable, CommandPathValidable {}

export class CommandComponent {

    commandData: GenericCommandDTO;

    constructor(
        protected readonly commandPathFinderService: CommandPathFinderService,
        protected readonly commandPathErrorManagerService: CommandPathErrorManagerService,
    ) {

    }

    commandComponentInitialize(): void {
        this.loadCommandPath(this.commandData.id);
    }

    commandComponentDestroy(): void {
        this.resetCommandPathError();
    }

    commandFormStatusManager(): void {
        const previousStatus = this.isCommandValid;

        this.commandFormStatusChange();
        this.setCommandPathError(this.commandData.id, previousStatus, this.commandForm.valid);

    }

}