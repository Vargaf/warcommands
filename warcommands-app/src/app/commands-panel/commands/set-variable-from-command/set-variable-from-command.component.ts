import { Component, OnInit, Input, OnDestroy, AfterContentInit, AfterViewInit } from '@angular/core';
import { GenericCommandDTO } from 'src/warcommands/commands-panel/domain/command/model/generic-command.dto';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SetVariableFromCommandCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/set-variable-from-command-command.entity';
import * as _ from 'lodash';
import { CommandUpdatedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-updated-events';
import { CommandContainerNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command-container/command-container-ngrx-repository.service';
import { Subscription } from 'rxjs';
import { CommandRepositoryService } from 'src/warcommands/commands-panel/domain/command/services/command-repository.service';
import { CommandNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service';
import { CommandContainerDTO } from 'src/warcommands/commands-panel/domain/command-container/model/command-container.dto';
import { GetClassNameFromCommandService } from 'src/warcommands/commands-panel/domain/command/model/set-variable-from-command/get-class-name-from-command.service';
import { CommandPathErrorManagerService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service';


@Component({
    selector: 'app-set-variable-from-command',
    templateUrl: './set-variable-from-command.component.html',
    styleUrls: ['./set-variable-from-command.component.scss']
})
export class SetVariableFromCommandComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input() commandData: GenericCommandDTO;
    setVariableCommand: SetVariableFromCommandCommandEntity;

    setVarForm: FormGroup;
    varName: string;
    isCommandValid = true;
    formErrorMessage: string;
    showCommandInvalidBackground = false;
    setVarCommandContainerId: string;

    private subscriptionManager: Subscription = new Subscription();
    private commandWatcherSubscription: Subscription;
    
    innerCommand: GenericCommandDTO;
    
    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly commandUpdatedEvents: CommandUpdatedEvents,
        private readonly commandContainerNgrxRepositoryService: CommandContainerNgrxRepositoryService,
        private readonly commandNgrxRepositoryService: CommandNgrxRepositoryService,
        private readonly commandRepositoryService: CommandRepositoryService,
        private readonly getClassNameFromCommandService: GetClassNameFromCommandService,
        private readonly commandPathErrorManagerService: CommandPathErrorManagerService
    ) { }

    ngOnInit(): void {

        this.initializeCommand();
        this.initializeForm();
        this.setCommandContainerWatcher();
    }

    ngOnDestroy(): void {
        this.commandWatcherSubscription?.unsubscribe();
        this.subscriptionManager.unsubscribe();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.setVarForm.updateValueAndValidity();
        }, 0);
        
    }

    private setCommandContainerWatcher(): void {
        const commandContainerId = (this.commandData as SetVariableFromCommandCommandEntity).innerCommandContainerIdList.command;
        const subscription = 
            this.commandContainerNgrxRepositoryService.getCommandContainer(commandContainerId).subscribe((commandContainer) => {
            if (this.isANewCommand(commandContainer)) {
                this.innerCommand = this.commandRepositoryService.findById(commandContainer.commands[0]);
                if (this.innerCommand) {
                    this.setCommandWatcher();
                }
            }
        });

        this.subscriptionManager.add(subscription);
    }

    private setCommandWatcher(): void {
        this.commandWatcherSubscription?.unsubscribe();

        this.commandWatcherSubscription = this.commandNgrxRepositoryService.getCommand(this.innerCommand.id).subscribe((command: GenericCommandDTO) => {
            if (command) {
                this.setVariableCommand.data.innerCommandId = command.id;
                this.setVariableCommand.data.className = this.getClassNameFromCommandService.getClassName(command.id);
                this.commandUpdatedEvents.commandUpdatedDispatch(this.setVariableCommand);
                this.setVarForm.get('innerCommandId').setValue(command.id);
            } else {
                if (this.setVariableCommand.data.innerCommandId) {
                    this.setVariableCommand.data.innerCommandId = null;
                    this.setVariableCommand.data.className = null;
                    this.commandUpdatedEvents.commandUpdatedDispatch(this.setVariableCommand);
                    this.setVarForm.get('innerCommandId').reset();
                }
            }
        });
    }

    private isANewCommand(commandContainer: CommandContainerDTO): boolean {
        return (!this.innerCommand && commandContainer.commands.length > 0) || (
                commandContainer.commands.length > 0 &&
                this.innerCommand &&
                commandContainer.commands[0] !== this.innerCommand.id
            );
    }

    private initializeForm(): void {
        this.setVarForm = this.formBuilder.group({
            varName: [this.varName, [Validators.required, Validators.pattern('^[_a-z]\\w*$')]],
            innerCommandId: [this.setVariableCommand.data.innerCommandId, [Validators.required]],
        });

        const valueChangesSubscription = this.setVarForm.valueChanges.subscribe(() => {
            this.setVariableCommand.data.varName = this.setVarForm.get('varName').value;
            this.commandUpdatedEvents.commandUpdatedDispatch(this.setVariableCommand);
        });

        const statusChangesSubscription = this.setVarForm.statusChanges.subscribe(() => {
            const previousFormStatus = this.isCommandValid;

            if (this.setVarForm.valid) {
                this.isCommandValid = true;
            } else {
                this.isCommandValid = false;
                this.buildCommandErrorMessage();
            }

            this.commandPathErrorManagerService.setCommandPathError(this.setVariableCommand.id, previousFormStatus, this.isCommandValid);
        });

        this.subscriptionManager.add(valueChangesSubscription);
        this.subscriptionManager.add(statusChangesSubscription);
    }

    private buildCommandErrorMessage(): void {
        let errorFormMessage: Array<string> = [];
        const varNameInput: AbstractControl = this.setVarForm.get('varName');
        const innerCommandIdInput: AbstractControl = this.setVarForm.get('innerCommandId');

        if (varNameInput.errors) {
            if (varNameInput.errors.required) {
                errorFormMessage.push('- A name is required for the variable.');
            }
            if (varNameInput.errors.pattern) {
                errorFormMessage.push('- The variable name must begin with a lowercase letter or with an "_".');
            }
        }

        if (innerCommandIdInput.errors) {
            if (innerCommandIdInput.errors.required) {
                errorFormMessage.push('- The variable needs a command value.');
            }
        }

        this.formErrorMessage = errorFormMessage.join('\n\n');
    }

    private initializeCommand(): void {
        this.setVariableCommand = (_.cloneDeep(this.commandData) as SetVariableFromCommandCommandEntity);

        this.varName = this.setVariableCommand.data?.varName || '';
        this.setVarCommandContainerId = this.setVariableCommand.innerCommandContainerIdList.command;

        const subscription = this.commandNgrxRepositoryService.getCommand(this.setVariableCommand.id).subscribe((command) => {
            this.setVariableCommand = (_.cloneDeep(command) as SetVariableFromCommandCommandEntity);

            this.showCommandInvalidBackground = command.commandPathErrorsCounter > 0;
        });

        this.subscriptionManager.add(subscription);
    }

}
