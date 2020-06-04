import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GenericCommandDTO } from 'src/warcommands/commands-panel/domain/command/model/generic-command.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SetVariableFromCommandCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/set-variable-from-command-command.entity';
import * as _ from 'lodash';
import { CommandUpdatedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-updated-events';
import { CommandContainerNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command-container/command-container-ngrx-repository.service';
import { Subscription } from 'rxjs';
import { CommandRepositoryService } from 'src/warcommands/commands-panel/domain/command/services/command-repository.service';
import { CommandNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service';
import { CommandContainerDTO } from 'src/warcommands/commands-panel/domain/command-container/model/command-container.dto';
import { GetClassNameFromCommandService } from 'src/warcommands/commands-panel/domain/command/model/set-variable-from-command/get-class-name-from-command.service';


@Component({
    selector: 'app-set-variable-from-command',
    templateUrl: './set-variable-from-command.component.html',
    styleUrls: ['./set-variable-from-command.component.scss']
})
export class SetVariableFromCommandComponent implements OnInit, OnDestroy {

    @Input() commandData: GenericCommandDTO;
    setVariableCommand: SetVariableFromCommandCommandEntity;

    setVarForm: FormGroup;
    varName: string;
    setVarCommandContainerId: string;

    commandContainerWatcherSubscription: Subscription;
    commandWatcherSubscription: Subscription;
    onCommandRemoveListenerSubscription: Subscription;
    innerCommand: GenericCommandDTO;
    
    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly commandUpdatedEvents: CommandUpdatedEvents,
        private readonly commandContainerNgrxRepositoryService: CommandContainerNgrxRepositoryService,
        private readonly commandNgrxRepositoryService: CommandNgrxRepositoryService,
        private readonly commandRepositoryService: CommandRepositoryService,
        private readonly getClassNameFromCommandService: GetClassNameFromCommandService,
    ) { }

    ngOnInit(): void {

        this.initializeCommand();
        this.initializeForm();
        this.setCommandContainerWatcher();
    }

    ngOnDestroy(): void {
        this.commandContainerWatcherSubscription?.unsubscribe();
        this.commandWatcherSubscription?.unsubscribe();
        this.onCommandRemoveListenerSubscription?.unsubscribe();
    }

    private setCommandContainerWatcher(): void {
        const commandContainerId = (this.commandData as SetVariableFromCommandCommandEntity).innerCommandContainerIdList.command;
        this.commandContainerWatcherSubscription = 
            this.commandContainerNgrxRepositoryService.getCommandContainer(commandContainerId).subscribe((commandContainer) => {
            if (this.isANewCommand(commandContainer)) {
                this.innerCommand = this.commandRepositoryService.findById(commandContainer.commands[0]);
                if (this.innerCommand) {
                    this.setCommandWatcher();
                }
            }
        });
    }

    private setCommandWatcher(): void {
        this.commandWatcherSubscription?.unsubscribe();

        this.commandWatcherSubscription = this.commandNgrxRepositoryService.getCommand(this.innerCommand.id).subscribe((command: GenericCommandDTO) => {
            if (command) {
                this.setVariableCommand.data.innerCommandId = command.id;
                this.setVariableCommand.data.className = this.getClassNameFromCommandService.getClassName(command.id);
                this.commandUpdatedEvents.commandUpdatedDispatch(this.setVariableCommand);
            } else {
                if (this.setVariableCommand.data.innerCommandId) {
                    this.setVariableCommand.data.innerCommandId = null;
                    this.setVariableCommand.data.className = null;
                    this.commandUpdatedEvents.commandUpdatedDispatch(this.setVariableCommand);
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
        });

        this.setVarForm.valueChanges.subscribe(() => {
            this.setVariableCommand.data.varName = this.setVarForm.get('varName').value;
            this.commandUpdatedEvents.commandUpdatedDispatch(this.setVariableCommand);
        });
        
    }

    private initializeCommand(): void {
        this.setVariableCommand = (_.cloneDeep(this.commandData) as SetVariableFromCommandCommandEntity);

        this.varName = this.setVariableCommand.data?.varName || '';
        this.setVarCommandContainerId = this.setVariableCommand.innerCommandContainerIdList.command;
    }

}
