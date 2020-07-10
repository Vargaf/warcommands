import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SetVariableCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/set-variable-command.entity';
import { GenericCommandDTO } from 'src/warcommands/commands-panel/domain/command/model/generic-command.dto';
import { CommandUpdatedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-updated-events';
import * as _ from 'lodash';
import { CommandNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service';
import { Subscription } from 'rxjs';
import { ClassNameENUM } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-name.enum';
import { CommandPathErrorManagerService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service';

@Component({
    selector: 'app-set-variable',
    templateUrl: './set-variable.component.html',
    styleUrls: ['./set-variable.component.scss']
})
export class SetVariableComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input() commandData: GenericCommandDTO;
    setVariableCommand: SetVariableCommandEntity;
    varName: string;
    varValue: string;

    private subscriptionManager: Subscription = new Subscription();

    formErrorMessage: string;
    
    setVarForm: FormGroup;
    isCommandValid = true;
    showCommandInvalidBackground = false;
    
    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly commandUpdatedEvents: CommandUpdatedEvents,
        private readonly commandNgrxRepositoryService: CommandNgrxRepositoryService,
        private readonly commandPathErrorManagerService: CommandPathErrorManagerService
    ) { }

    ngOnInit() {
        this.initializeCommand();
        this.initializeForm();
    }

    ngOnDestroy() {
        this.subscriptionManager.unsubscribe();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.setVarForm.updateValueAndValidity();
        }, 0);
        
    }

    private initializeForm(): void {
        this.setVarForm = this.formBuilder.group({
            varName: [this.varName, [Validators.required, Validators.pattern('^[_a-z]\\w*$')]],
            varValue: [this.varValue, [Validators.required]]
        });

        const subscription = this.setVarForm.statusChanges.subscribe(() => {
            const previousFormStatus = this.isCommandValid;

            if (this.setVarForm.valid) {
                this.isCommandValid = true;
            } else {
                this.isCommandValid = false;
                this.buildCommandErrorMessage();
            }

            this.setVariableCommand.data = {
                className: ClassNameENUM.String,
                varName: this.setVarForm.get('varName').value,
                varValue: this.setVarForm.get('varValue').value
            }

            this.commandUpdatedEvents.commandUpdatedDispatch(this.setVariableCommand);
            this.commandPathErrorManagerService.setCommandPathError(this.setVariableCommand.id, previousFormStatus, this.isCommandValid);
        });

        this.subscriptionManager.add(subscription);
    }

    private buildCommandErrorMessage(): void {
        let errorFormMessage: Array<string> = [];
        const varNameInput: AbstractControl = this.setVarForm.get('varName');
        const varValeuInput: AbstractControl = this.setVarForm.get('varValue');

        if(varNameInput.errors) {
            if (varNameInput.errors.required) {
                errorFormMessage.push('- A name is required for the variable.');
            }
            if (varNameInput.errors.pattern) {
                errorFormMessage.push('- The variable name must begin with a lowercase letter or with an "_".');
            }
        }

        if (varValeuInput.errors) {
            if (varValeuInput.errors.required) {
                errorFormMessage.push('- A value is required for the variable.');
            }
        }

        this.formErrorMessage = errorFormMessage.join('\n\n');
    }

    private initializeCommand(): void {
        this.setVariableCommand = (_.cloneDeep(this.commandData) as SetVariableCommandEntity);

        this.varName = this.setVariableCommand.data?.varName || '';
        this.varValue = this.setVariableCommand.data?.varValue || '';

        const subscription = this.commandNgrxRepositoryService.getCommand(this.setVariableCommand.id).subscribe((command) => {
            this.setVariableCommand = (_.cloneDeep(command) as SetVariableCommandEntity);

            this.showCommandInvalidBackground = command.commandPathErrorsCounter > 0;
            
        });

        this.subscriptionManager.add(subscription);
        
    }

}
