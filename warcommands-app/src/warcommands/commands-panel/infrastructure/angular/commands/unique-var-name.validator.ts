import { Injectable } from '@angular/core';
import { VariableInScopeFinderService } from 'src/warcommands/commands-panel/domain/command/model/variable/services/variables-in-scope-finder.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { CommandRepositoryService } from 'src/warcommands/commands-panel/domain/command/services/command-repository.service';


@Injectable({
    providedIn: 'root'
})
export class UniqueVarNameValidator {

    constructor(
        private readonly variablesInScopeFinderService: VariableInScopeFinderService,
        private readonly commandRepositoryService: CommandRepositoryService,
    ) {}

    createValidator(commandId: string): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {
            const command = this.commandRepositoryService.findById(commandId);
            const varInScope = this.variablesInScopeFinderService.getVariablesInPreviuosScope(command);
            const isVarNameAlreadyInUse = varInScope.some((varItem) => {
                return varItem.label === control.value && varItem.value !== command.id;

            });

            return isVarNameAlreadyInUse ? { 'uniqueVarName': true } : null;
        }
    }
}