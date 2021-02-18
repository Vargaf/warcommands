import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { IfThenCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/if-then-command.entity';
import { CommandNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service';
import { CommandPathFinderService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-finder.service';
import { CommandPathErrorManagerService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service';
import { CommandComponent } from 'src/warcommands/commands-panel/domain/command-component/composition/command-component';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CommandContainerNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command-container/command-container-ngrx-repository.service';
import { CommandContainerDTO } from 'src/warcommands/commands-panel/domain/command-container/model/command-container.dto';
import { GenericCommandDTO } from 'src/warcommands/commands-panel/domain/command/model/generic-command.dto';
import { CommandRepositoryService } from 'src/warcommands/commands-panel/domain/command/services/command-repository.service';
import * as _ from 'lodash';

@Component({
    selector: 'app-if-then',
    templateUrl: './if-then.component.html',
    styleUrls: ['./if-then.component.scss']
})
export class IfThenComponent extends CommandComponent implements OnInit, OnDestroy, AfterViewInit {
    
    
    @Input() commandData!: GenericCommandDTO;
    ifThenCommand!: IfThenCommandEntity;

    thenCommandContainerId!: string;
    conditionCommandContainerId!: string;
    conditionCommandId!: string | null;

    conditionCommand!: GenericCommandDTO;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly commandNgrxRepositoryService: CommandNgrxRepositoryService,
        private readonly commandContainerNgrxRepositoryService: CommandContainerNgrxRepositoryService,
        private readonly commandRepositoryService: CommandRepositoryService,
        protected readonly commandPathFinderService: CommandPathFinderService,
        protected readonly commandPathErrorManagerService: CommandPathErrorManagerService,
    ) {
        super(commandPathFinderService, commandPathErrorManagerService);
     }

    ngOnInit() {
        this.commandComponentInitialize();
        this.setCommandContainerWatcher();
    }

    ngOnDestroy() {
        this.commandComponentDestroy();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.commandForm.updateValueAndValidity();
        });
    }

    protected initializeCommand(): void {
        this.ifThenCommand = (_.cloneDeep(this.commandData) as IfThenCommandEntity);

        this.conditionCommandContainerId = this.ifThenCommand.innerCommandContainerIdList.conditionCommandContainerId;
        this.thenCommandContainerId = this.ifThenCommand.innerCommandContainerIdList.thenCommandContainerId;
        
        const commandWatcherSubscription = this.commandNgrxRepositoryService.getCommand(this.ifThenCommand.id).subscribe((command) => {
            this.ifThenCommand = (command as IfThenCommandEntity);
            this.handleInvalidCommandBackground(command);
        });

        this.subscriptionManager.add(commandWatcherSubscription);
    }

    protected initializeForm(): void {
        this.commandForm = this.formBuilder.group({
            conditionCommandId: [this.conditionCommandId, [Validators.required]]
        });

        const statusChangesSubscription = this.commandForm.statusChanges.subscribe(() => {
            this.commandFormStatusManager();
        });

        this.subscriptionManager.add(statusChangesSubscription);
    }

    protected getCommandErrorMessages(): String[] {
        let errorFormMessage: String[] = [];
        const conditionCommandIdInput: AbstractControl | null = this.commandForm.get('conditionCommandId');

        if (conditionCommandIdInput?.errors) {
            if (conditionCommandIdInput.errors.required) {
                errorFormMessage.push('- A condition to evaluate is required.');
            }
        }

        return errorFormMessage;
    }

    private setCommandContainerWatcher(): void {
        const commandContainerId = this.conditionCommandContainerId;
        const subscription = 
            this.commandContainerNgrxRepositoryService.getCommandContainer(commandContainerId).subscribe((commandContainer) => {
            if (this.isANewCommand(commandContainer)) {
                this.conditionCommand = this.commandRepositoryService.findById(commandContainer.commands[0]);
                this.conditionCommandId = this.conditionCommand.id;
                this.commandForm.get('conditionCommandId')?.setValue(this.conditionCommandId);
            } else {
                this.conditionCommandId = null;
                this.commandForm.get('conditionCommandId')?.setValue(this.conditionCommandId);
            }

            this.commandForm.updateValueAndValidity();
        });

        this.subscriptionManager.add(subscription);
    }

    private isANewCommand(commandContainer: CommandContainerDTO): boolean {
        return (!this.conditionCommand && commandContainer.commands.length > 0) || (
                commandContainer.commands.length > 0 &&
                this.conditionCommand &&
                commandContainer.commands[0] !== this.conditionCommand.id
            );
    }

}
