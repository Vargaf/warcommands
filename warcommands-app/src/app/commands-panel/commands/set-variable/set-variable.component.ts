import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SetVariableCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/set-variable-command.entity';
import { GenericCommandDTO } from 'src/warcommands/commands-panel/domain/command/model/generic-command.dto';
import { CommandUpdatedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-updated-events';
import * as _ from 'lodash';
import { CommandNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service';
import { ClassNameENUM } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-name.enum';
import { CommandPathErrorManagerService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service';
import { CommandPathFinderService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-finder.service';
import { UniqueVarNameValidator } from 'src/warcommands/commands-panel/infrastructure/angular/commands/unique-var-name.validator';
import { CommandMovedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-moved-events';
import { SetVarCommandComponent } from 'src/warcommands/commands-panel/domain/command-component/composition/set-var-command-component';

@Component({
    selector: 'app-set-variable',
    templateUrl: './set-variable.component.html',
    styleUrls: ['./set-variable.component.scss']
})
export class SetVariableComponent extends SetVarCommandComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input() commandData: GenericCommandDTO;
    setVariableCommand: SetVariableCommandEntity;

    varName: string;
    varValue: string;

    constructor(
        private readonly formBuilder: FormBuilder,
        protected readonly commandUpdatedEvents: CommandUpdatedEvents,
        protected readonly commandMovedEvents: CommandMovedEvents,
        private readonly commandNgrxRepositoryService: CommandNgrxRepositoryService,
        protected readonly commandPathErrorManagerService: CommandPathErrorManagerService,
        protected readonly commandPathFinderService: CommandPathFinderService,
        protected readonly uniqueVarNameValidator: UniqueVarNameValidator,
    ) { 
        super(commandPathFinderService, commandPathErrorManagerService, commandUpdatedEvents, commandMovedEvents);
    }

    ngOnInit() {
        this.commandComponentInitialize();
    }

    ngOnDestroy() {
        this.subscriptionManager.unsubscribe();

        this.commandComponentDestroy();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.commandForm.updateValueAndValidity();
        });
        
    }

    protected initializeForm(): void {
        this.commandForm = this.formBuilder.group({
            varName: [this.varName, [Validators.required, Validators.pattern('^[_a-z]\\w*$'), this.uniqueVarNameValidator.createValidator(this.commandData.id)]],
            varValue: [this.varValue, [Validators.required]]
        });

        const valueChangesSubscription = this.commandForm.valueChanges.subscribe(() => {
            if (this.isUpdateNeeded()) {
                this.setVariableCommand.data = {
                    className: ClassNameENUM.String,
                    varName: this.commandForm.get('varName').value,
                    varValue: this.commandForm.get('varValue').value
                }
                this.commandUpdatedEvents.commandUpdatedDispatch(this.setVariableCommand);
            }
        });

        const statusChangesSubscription = this.commandForm.statusChanges.subscribe(() => {
            this.commandFormStatusManager();
        });

        this.subscriptionManager.add(valueChangesSubscription);
        this.subscriptionManager.add(statusChangesSubscription);
    }

    protected getCommandErrorMessages(): String[] {
        let errorFormMessage: String[] = [];
        const varNameInput: AbstractControl = this.commandForm.get('varName');
        const varValeuInput: AbstractControl = this.commandForm.get('varValue');

        if(varNameInput.errors) {
            if (varNameInput.errors.required) {
                errorFormMessage.push('- A name is required for the variable.');
            }
            if (varNameInput.errors.pattern) {
                errorFormMessage.push('- The variable name must begin with a lowercase letter or with an "_".');
            }
            if (varNameInput.errors.uniqueVarName) {
                errorFormMessage.push('- The variable name is already in use.');
            }
        }

        if (varValeuInput.errors) {
            if (varValeuInput.errors.required) {
                errorFormMessage.push('- A value is required for the variable.');
            }
        }

        return errorFormMessage;
    }

    relaunchFormValidation(): void {
        this.commandForm.get('varName').updateValueAndValidity();
    }

    private isUpdateNeeded(): boolean {
        return this.setVariableCommand.data.varName !== this.commandForm.get('varName').value ||
            this.setVariableCommand.data.varValue !== this.commandForm.get('varValue').value;
    }

    protected initializeCommand(): void {
        this.setVariableCommand = (_.cloneDeep(this.commandData) as SetVariableCommandEntity);

        this.varName = this.setVariableCommand.data?.varName || '';
        this.varValue = this.setVariableCommand.data?.varValue || '';

        const subscription = this.commandNgrxRepositoryService.getCommand(this.setVariableCommand.id).subscribe((command) => {
            this.setVariableCommand = (_.cloneDeep(command) as SetVariableCommandEntity);

            this.handleInvalidCommandBackground(command);
            
        });

        this.subscriptionManager.add(subscription);
        
    }

}
