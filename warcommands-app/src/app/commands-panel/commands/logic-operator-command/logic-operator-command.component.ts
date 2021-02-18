import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { LogicOperatorCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/logic-operator/logic-operator-command.entity';
import { logicOperatorSelectOptions } from 'src/warcommands/commands-panel/domain/command/model/logic-operator/logic-operator-select-options';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CommandUpdatedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-updated-events';
import * as _ from 'lodash';
import { GenericCommandDTO } from 'src/warcommands/commands-panel/domain/command/model/generic-command.dto';
import { CommandComponent } from 'src/warcommands/commands-panel/domain/command-component/composition/command-component';
import { CommandPathFinderService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-finder.service';
import { CommandPathErrorManagerService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service';
import { CommandContainerNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command-container/command-container-ngrx-repository.service';
import { CommandNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service';

@Component({
    selector: 'app-logic-operator-command',
    templateUrl: './logic-operator-command.component.html',
    styleUrls: ['./logic-operator-command.component.scss']
})
export class LogicOperatorCommandComponent extends CommandComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input() commandData!: GenericCommandDTO;
    logicOperatorCommandData!: LogicOperatorCommandEntity;

    firstCommandContainerId!: string;
    secondCommandContainerId!: string;

    logicOperatorSelected!: number | null;
    firstCommandId!: number;
    secondCommandId!: number;

    logicOperatorOptions = logicOperatorSelectOptions;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly commandUpdatedEvents: CommandUpdatedEvents,
        private readonly commandContainerNgrxRepositoryService: CommandContainerNgrxRepositoryService,
        private readonly commandNgrxRepositoryService: CommandNgrxRepositoryService,
        protected readonly commandPathFinderService: CommandPathFinderService,
        protected readonly commandPathErrorManagerService: CommandPathErrorManagerService,
    ) { 
        super(commandPathFinderService, commandPathErrorManagerService);
    }

    ngOnInit(): void {
        this.commandComponentInitialize();
        this.setFirstCommandWatcher();
        this.setSecondCommandWatcher();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.commandForm.updateValueAndValidity();
        });
    }

    ngOnDestroy() {
        this.commandComponentDestroy();
    }

    protected initializeForm(): void {
        this.commandForm = this.formBuilder.group({
            logicOperator: [this.logicOperatorSelected, [Validators.required]],
            firstCommandId: [this.firstCommandId, [Validators.required]],
            secondCommandId: [this.secondCommandId, [Validators.required]]
        });

        const valueChangesSubscription = this.commandForm.valueChanges.subscribe(() => {
            if (this.commandForm.valid) {
                this.logicOperatorCommandData.data = {
                    operator: this.commandForm.get('logicOperator')?.value
                }
                this.commandUpdatedEvents.commandUpdatedDispatch(this.logicOperatorCommandData);
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
        const logicOperatorInput: AbstractControl | null = this.commandForm.get('logicOperator');
        const firstCommandIdInput: AbstractControl | null = this.commandForm.get('firstCommandId');
        const secondCommandIdInput: AbstractControl | null = this.commandForm.get('secondCommandId');

        if (logicOperatorInput?.errors) {
            if (logicOperatorInput.errors.required) {
                errorFormMessage.push('- A comparison operator is required.');
            }
        }

        if (firstCommandIdInput?.errors) {
            if (firstCommandIdInput.errors.required) {
                errorFormMessage.push('- A first value to compare is required.');
            }
        }

        if (secondCommandIdInput?.errors) {
            if (secondCommandIdInput.errors.required) {
                errorFormMessage.push('- A second value to compare is required.');
            }
        }

        return errorFormMessage;
    }

    protected initializeCommand(): void {
        this.logicOperatorCommandData = (_.cloneDeep(this.commandData) as LogicOperatorCommandEntity);
        this.logicOperatorSelected = this.logicOperatorCommandData.data?.operator || null;

        this.firstCommandContainerId = this.logicOperatorCommandData.innerCommandContainerIdList.firstCommandContainerId;
        this.secondCommandContainerId = this.logicOperatorCommandData.innerCommandContainerIdList.secondCommandContainerId;

        const subscription = this.commandNgrxRepositoryService.getCommand(this.logicOperatorCommandData.id).subscribe((command) => {
            if (command) {
                this.handleInvalidCommandBackground(command);
            }
        });

        this.subscriptionManager.add(subscription);
    }

    private setFirstCommandWatcher(): void {
        const subscription = 
            this.commandContainerNgrxRepositoryService.getCommandContainer(this.firstCommandContainerId).subscribe((commandContainer) => {
                const commandId = commandContainer.commands[0] || null;

                if (commandId) {
                    this.commandForm.get('firstCommandId')?.setValue(commandId);
                } else {
                    this.commandForm.get('firstCommandId')?.reset();
                }
        });

        this.subscriptionManager.add(subscription);
    }

    private setSecondCommandWatcher(): void {
        const subscription = 
            this.commandContainerNgrxRepositoryService.getCommandContainer(this.secondCommandContainerId).subscribe((commandContainer) => {
                const commandId = commandContainer.commands[0] || null;

                if (commandId) {
                    this.commandForm.get('secondCommandId')?.setValue(commandId);
                } else {
                    this.commandForm.get('secondCommandId')?.reset();
                }
        });

        this.subscriptionManager.add(subscription);
    }
}
