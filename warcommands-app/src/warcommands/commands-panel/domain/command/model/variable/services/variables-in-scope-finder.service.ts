import { Injectable } from "@angular/core";
import { CommandContainerRepositoryService } from 'src/warcommands/commands-panel/domain/command-container/services/command-container-repository.service';
import { CommandRepositoryService } from '../../../services/command-repository.service';
import { CommandContainerDTO } from 'src/warcommands/commands-panel/domain/command-container/model/command-container.dto';
import { GenericCommandDTO } from '../../generic-command.dto';
import { CommandType } from '../../command-type.enum';


@Injectable({
    providedIn: 'root'
})
export class VariableInScopeFinderService {

    constructor(
        private readonly commandContainerRepositoryService: CommandContainerRepositoryService,
        private readonly commandRepositoryService: CommandRepositoryService
    ) {}

    getVariablesInScope(currentCommand: GenericCommandDTO): GenericCommandDTO[] {
        return this.findVariablesInCurrentScope(currentCommand);
    }

    private findVariablesInCurrentScope(currentCommand: GenericCommandDTO): GenericCommandDTO[] {
        const currentCommandContainer: CommandContainerDTO = this.commandContainerRepositoryService.findById(currentCommand.parentCommandContainerId);
        const currentCommandIndex = currentCommandContainer.commands.findIndex((commandId) => {
            return commandId === currentCommand.id;
        });

        const currentVariableCommandList: GenericCommandDTO[] = [];
        let parentVariableCommandList: GenericCommandDTO[] = [];


        for (let commandIndex = 0; commandIndex < currentCommandIndex; commandIndex++) {
            const commandIdToCheck = currentCommandContainer.commands[commandIndex];
            const commandToCheck = this.commandRepositoryService.findById(commandIdToCheck);
            if (this.isVariableCommand(commandToCheck)) {
                currentVariableCommandList.push(commandToCheck);
            }
        }

        const parentCommand = this.getParentCommand(currentCommand.parentCommandContainerId);
        if (parentCommand) {
            parentVariableCommandList = this.findVariablesInCurrentScope(parentCommand);
        }

        return currentVariableCommandList.concat(parentVariableCommandList);
    }

    private isVariableCommand(command: GenericCommandDTO): boolean {
        let isVariableCommand = false;

        switch (command.type) {
            case CommandType.SetVariable:
            case CommandType.SetVariableFromCommand: {
                isVariableCommand = true;
                break;
            }
        }

        return isVariableCommand;
    }

    private getParentCommand(currentCommandContainerId: string): GenericCommandDTO {
        let parentCommand: GenericCommandDTO;
        const parentCommandContainer: CommandContainerDTO = this.commandContainerRepositoryService.findById(currentCommandContainerId);

        if (parentCommandContainer.parentCommandId) {
            parentCommand = this.commandRepositoryService.findById(parentCommandContainer.parentCommandId);
        }

        return parentCommand;
    }

}