import { Injectable } from "@angular/core";
import { CommandContainerRepositoryService } from 'src/warcommands/commands-panel/domain/command-container/services/command-container-repository.service';
import { CommandRepositoryService } from '../../../services/command-repository.service';
import { CommandContainerDTO } from 'src/warcommands/commands-panel/domain/command-container/model/command-container.dto';
import { GenericCommandDTO } from '../../generic-command.dto';
import { CommandType } from '../../command-type.enum';

interface VariableOption { value: string, label: string };

@Injectable({
    providedIn: 'root'
})
export class VariableInScopeFinderService {

    constructor(
        private readonly commandContainerRepositoryService: CommandContainerRepositoryService,
        private readonly commandRepositoryService: CommandRepositoryService
    ) {}

    getVariablesInPreviuosScope(currentCommand: GenericCommandDTO): VariableOption[] {

        const variableListInScope: GenericCommandDTO[] = this.findPreviousVariablesInCurrentScope(currentCommand);

        const newVariableOptionList: VariableOption[] = [];

        variableListInScope.forEach((variableCommand) => {
            if (variableCommand.data.varName) {
                newVariableOptionList.push({ value: variableCommand.id, label: variableCommand.data.varName });
            }
        });

        return newVariableOptionList;
    }

    getAllVariablesInCurrentScope(currentCommand: GenericCommandDTO): VariableOption[] {
        const variableListInScope: GenericCommandDTO[] = this.findAllVariablesInCurrentScope(currentCommand);

        const newVariableOptionList: VariableOption[] = [];

        variableListInScope.forEach((variableCommand) => {
            if (variableCommand.data.varName) {
                newVariableOptionList.push({ value: variableCommand.id, label: variableCommand.data.varName });
            }
        });

        return newVariableOptionList;
    }

    private findPreviousVariablesInCurrentScope(currentCommand: GenericCommandDTO): GenericCommandDTO[] {
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
            parentVariableCommandList = this.findPreviousVariablesInCurrentScope(parentCommand);
        }

        return currentVariableCommandList.concat(parentVariableCommandList);
    }

    private findAllVariablesInCurrentScope(currentCommand: GenericCommandDTO): GenericCommandDTO[] {
        const currentCommandContainer: CommandContainerDTO = this.commandContainerRepositoryService.findById(currentCommand.parentCommandContainerId);
        
        const currentVariableCommandList: GenericCommandDTO[] = [];
        let parentVariableCommandList: GenericCommandDTO[] = [];


        for (const commandId of currentCommandContainer.commands) {
            const commandToCheck = this.commandRepositoryService.findById(commandId);
            if (this.isVariableCommand(commandToCheck)) {
                currentVariableCommandList.push(commandToCheck);
            }
        }

        const parentCommand = this.getParentCommand(currentCommand.parentCommandContainerId);
        if (parentCommand) {
            parentVariableCommandList = this.findAllVariablesInCurrentScope(parentCommand);
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