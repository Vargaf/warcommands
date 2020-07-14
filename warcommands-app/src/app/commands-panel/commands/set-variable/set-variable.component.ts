import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SetVariableCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/set-variable-command.entity';
import { GenericCommandDTO } from 'src/warcommands/commands-panel/domain/command/model/generic-command.dto';
import { CommandUpdatedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-updated-events';
import * as _ from 'lodash';
import { CommandNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service';
import { Subscription } from 'rxjs';
import { ClassNameENUM } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-name.enum';
import { CommandPathErrorManagerService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service';
import { CommandComponent } from 'src/warcommands/commands-panel/domain/command-component/composition/command-component';
import { CommandPathFinderService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-finder.service';

@Component({
    selector: 'app-set-variable',
    templateUrl: './set-variable.component.html',
    styleUrls: ['./set-variable.component.scss']
})
export class SetVariableComponent extends CommandComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input() commandData: GenericCommandDTO;
    setVariableCommand: SetVariableCommandEntity;

    varName: string;
    varValue: string;

    private subscriptionManager: Subscription = new Subscription();

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly commandUpdatedEvents: CommandUpdatedEvents,
        private readonly commandNgrxRepositoryService: CommandNgrxRepositoryService,
        protected readonly commandPathErrorManagerService: CommandPathErrorManagerService,
        protected readonly commandPathFinderService: CommandPathFinderService,
    ) { 
        super(commandPathFinderService, commandPathErrorManagerService);
    }

    ngOnInit() {
        this.initializeCommand();
        this.initializeForm();

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

    initializeForm(): void {
        this.commandForm = this.formBuilder.group({
            varName: [this.varName, [Validators.required, Validators.pattern('^[_a-z]\\w*$')]],
            varValue: [this.varValue, [Validators.required]]
        });

        const valueChangesSubscription = this.commandForm.valueChanges.subscribe(() => {
            this.setVariableCommand.data = {
                className: ClassNameENUM.String,
                varName: this.commandForm.get('varName').value,
                varValue: this.commandForm.get('varValue').value
            }
            this.commandUpdatedEvents.commandUpdatedDispatch(this.setVariableCommand);
        });

        const statusChangesSubscription = this.commandForm.statusChanges.subscribe(() => {
            this.commandFormStatusManager();
            
        });

        this.subscriptionManager.add(valueChangesSubscription);
        this.subscriptionManager.add(statusChangesSubscription);
    }

    getCommandErrorMessages(): String[] {
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
        }

        if (varValeuInput.errors) {
            if (varValeuInput.errors.required) {
                errorFormMessage.push('- A value is required for the variable.');
            }
        }

        return errorFormMessage;
    }

    private initializeCommand(): void {
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
