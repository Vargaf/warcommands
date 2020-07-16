import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { GenericCommandDTO } from 'src/warcommands/commands-panel/domain/command/model/generic-command.dto';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
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
import { CommandPathFinderService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-finder.service';
import { UniqueVarNameValidator } from 'src/warcommands/commands-panel/infrastructure/angular/commands/unique-var-name.validator';
import { SetVarCommandComponent } from 'src/warcommands/commands-panel/domain/command-component/composition/set-var-command-component';
import { CommandMovedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-moved-events';


@Component({
    selector: 'app-set-variable-from-command',
    templateUrl: './set-variable-from-command.component.html',
    styleUrls: ['./set-variable-from-command.component.scss']
})
export class SetVariableFromCommandComponent extends SetVarCommandComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input() commandData: GenericCommandDTO;
    setVariableCommand: SetVariableFromCommandCommandEntity;

    varName: string;
    setVarCommandContainerId: string;

    private commandWatcherSubscription: Subscription;
    
    innerCommand: GenericCommandDTO;
    
    constructor(
        private readonly formBuilder: FormBuilder,
        protected readonly commandUpdatedEvents: CommandUpdatedEvents,
        protected readonly commandMovedEvents: CommandMovedEvents,
        private readonly commandContainerNgrxRepositoryService: CommandContainerNgrxRepositoryService,
        private readonly commandNgrxRepositoryService: CommandNgrxRepositoryService,
        private readonly commandRepositoryService: CommandRepositoryService,
        private readonly getClassNameFromCommandService: GetClassNameFromCommandService,
        protected readonly commandPathErrorManagerService: CommandPathErrorManagerService,
        protected readonly commandPathFinderService: CommandPathFinderService,
        protected readonly uniqueVarNameValidator: UniqueVarNameValidator,
    ) {
        super(commandPathFinderService, commandPathErrorManagerService, commandUpdatedEvents, commandMovedEvents);
    }

    ngOnInit(): void {
        this.commandComponentInitialize();
        this.setCommandContainerWatcher();
    }

    ngOnDestroy(): void {
        this.commandWatcherSubscription?.unsubscribe();
        this.subscriptionManager.unsubscribe();

        this.commandComponentDestroy();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.commandForm.updateValueAndValidity();
        });
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
                this.commandForm.get('innerCommandId').setValue(command.id);
            } else {
                if (this.setVariableCommand.data.innerCommandId) {
                    this.setVariableCommand.data.innerCommandId = null;
                    this.setVariableCommand.data.className = null;
                    this.commandUpdatedEvents.commandUpdatedDispatch(this.setVariableCommand);
                    this.commandForm.get('innerCommandId').reset();
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

    protected initializeForm(): void {
        this.commandForm = this.formBuilder.group({
            varName: [this.varName, [Validators.required, Validators.pattern('^[_a-z]\\w*$'), this.uniqueVarNameValidator.createValidator(this.commandData.id)]],
            innerCommandId: [this.setVariableCommand.data.innerCommandId, [Validators.required]],
        });

        const valueChangesSubscription = this.commandForm.valueChanges.subscribe(() => {
            if (this.isUpdateNeeded()) {
                this.setVariableCommand.data.varName = this.commandForm.get('varName').value;
                this.commandUpdatedEvents.commandUpdatedDispatch(this.setVariableCommand);
            }
        });

        const statusChangesSubscription = this.commandForm.statusChanges.subscribe(() => {
            this.commandFormStatusManager();
        });

        this.subscriptionManager.add(valueChangesSubscription);
        this.subscriptionManager.add(statusChangesSubscription);
    }

    relaunchFormValidation(): void {
        this.commandForm.get('varName').updateValueAndValidity();
    }

    protected getCommandErrorMessages(): String[] {
        let errorFormMessage: String[] = [];
        const varNameInput: AbstractControl = this.commandForm.get('varName');
        const innerCommandIdInput: AbstractControl = this.commandForm.get('innerCommandId');

        if (varNameInput.errors) {
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

        if (innerCommandIdInput.errors) {
            if (innerCommandIdInput.errors.required) {
                errorFormMessage.push('- The variable needs a command value.');
            }
        }

        return errorFormMessage;
    }

    private isUpdateNeeded(): boolean {
        return this.setVariableCommand.data.varName !== this.commandForm.get('varName').value;
    }

    protected initializeCommand(): void {
        this.setVariableCommand = (_.cloneDeep(this.commandData) as SetVariableFromCommandCommandEntity);

        this.varName = this.setVariableCommand.data?.varName || '';
        this.setVarCommandContainerId = this.setVariableCommand.innerCommandContainerIdList.command;

        const subscription = this.commandNgrxRepositoryService.getCommand(this.setVariableCommand.id).subscribe((command) => {
            if (command) {
                this.setVariableCommand = (_.cloneDeep(command) as SetVariableFromCommandCommandEntity);

                this.handleInvalidCommandBackground(command);
            }
        });

        this.subscriptionManager.add(subscription);
    }

}