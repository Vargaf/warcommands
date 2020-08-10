import { CommandPathItemDTO } from 'src/warcommands/commands-panel/domain/commands-panel/model/command-path-item.dto';
import { CommandPathFinderService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-finder.service';
import { CommandPathErrorManagerService } from '../../commands-panel/services/command-path-error-manager.service';
import { GenericCommandDTO } from '../../command/model/generic-command.dto';

export class CommandPathManageable {

    commandPath: CommandPathItemDTO[];
    showCommandInvalidBackground: boolean = false;
    
    private commandIsValid: boolean;
    
    protected commandPathFinderService: CommandPathFinderService;
    protected commandPathErrorManagerService: CommandPathErrorManagerService;

    loadCommandPath(commandId: string): void {
        this.commandPath = this.commandPathFinderService.getCommandPath(commandId);
    }

    setCommandPathError(commandId: string, commandWasValid: boolean, commandIsValid: boolean): void {
        this.commandIsValid = commandIsValid;
        this.commandPathErrorManagerService.buildCommandPathError(commandId, commandWasValid, commandIsValid);
    }

    resetCommandPathError(): void {
        if (!this.commandIsValid) {
            this.commandPathErrorManagerService.resetCommandPathError(this.commandPath);
        }
    }

    handleInvalidCommandBackground(command: GenericCommandDTO): void {
        if (command) {
            setTimeout(() => {
                this.showCommandInvalidBackground = command.commandPathErrorsCounter > 0;
            });
        }
    }
}