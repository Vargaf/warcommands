import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { VariableInScopeFinderService } from 'src/warcommands/commands-panel/domain/command/model/variable/services/variables-in-scope-finder.service';
import { VariableCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/variable/model/variable-command.entity';
import { GenericCommandDTO } from 'src/warcommands/commands-panel/domain/command/model/generic-command.dto';
import { CommandCreatedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-created-events';
import { CommandMovedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-moved-events';
import { CommandRemovedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-removed-events';
import { CommandAddedEventDTO } from 'src/warcommands/commands-panel/domain/command/events/command-added-event.dto';
import { CommandMovedEventDTO } from 'src/warcommands/commands-panel/domain/command/events/command-modeved-event.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommandUpdatedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-updated-events';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

interface VariableOption { value: string, label: string };

@Component({
    selector: 'app-variable',
    templateUrl: './variable.component.html',
    styleUrls: ['./variable.component.scss']
})
export class VariableComponent implements OnInit, OnDestroy {

    @Input() commandData: VariableCommandEntity;
    variableCommandData: VariableCommandEntity;

    variableCommandForm: FormGroup;

    varSelected: string;
    variableListInScope: GenericCommandDTO[] = [];

    variableOptionList: VariableOption[] = [];

    private onVarSelectedChangeSubscription: Subscription;
    private onCommandCreatedListenerSubscription: Subscription;
    private onCommandMovedListenerSubscription: Subscription;
    private onCommandRemoveListenerSubscription: Subscription;
    private onCommandUpdatedListenerSubscription: Subscription;


    constructor(
        private readonly variablesInScopeFinderService: VariableInScopeFinderService,
        private readonly commandCreatedEvents: CommandCreatedEvents,
        private readonly commandMovedEvents: CommandMovedEvents,
        private readonly commandRemovedEvents: CommandRemovedEvents,
        private readonly formBuilder: FormBuilder,
        private readonly commandUpdatedEvents: CommandUpdatedEvents,
    ) { }

    ngOnInit() {

        this.initializeCommand();
        this.initializeForm();

        this.generateVariableOptionList();

        this.onCommandCreatedListener();
        this.onCommandMovedListener();
        this.onCommandRemoveListener();
        this.onCommandUpdatedListener();
    }

    ngOnDestroy() {
        this.onVarSelectedChangeSubscription.unsubscribe();
        this.onCommandCreatedListenerSubscription.unsubscribe();
        this.onCommandMovedListenerSubscription.unsubscribe();
        this.onCommandRemoveListenerSubscription.unsubscribe();
        this.onCommandUpdatedListenerSubscription.unsubscribe();
    }

    private initializeForm(): void {
        this.variableCommandForm = this.formBuilder.group({
            variable: [this.varSelected, [Validators.required]]
        });

        this.setVarSelectesWatcher();
    }

    private setVarSelectesWatcher(): void {
        this.onVarSelectedChangeSubscription = this.variableCommandForm.valueChanges.subscribe(() => {
            this.varSelected = this.variableCommandForm.get('variable').value;
            this.variableCommandData.data = {
                variableCommandId: this.varSelected
            };
            this.commandUpdatedEvents.commandUpdatedDispatch(this.variableCommandData);
        });
    }

    private initializeCommand(): void {
        this.variableCommandData = _.cloneDeep(this.commandData);

        this.varSelected = this.variableCommandData.data?.variableCommandId || '';
    }

    private onCommandCreatedListener(): void {
        this.onCommandCreatedListenerSubscription = this.commandCreatedEvents.commandCreatedListener().subscribe((event: CommandAddedEventDTO) => {
            // To avoid circular updates
            if (event.command.id !== this.variableCommandData.id) {
                this.generateVariableOptionList();
            }
        });
    }
    private onCommandMovedListener(): void {
        this.onCommandMovedListenerSubscription = this.commandMovedEvents.commandMovedListener().subscribe((event: CommandMovedEventDTO) => {
            // To avoid circular updates
            if (event.command.id !== this.variableCommandData.id) {
                this.generateVariableOptionList();
            }
        });
    }

    private onCommandRemoveListener(): void {
        this.onCommandRemoveListenerSubscription = this.commandRemovedEvents.commandRemovedListener().subscribe((command: GenericCommandDTO) => {
            // To avoid circular updates
            if (command.id !== this.variableCommandData.id) {
                this.generateVariableOptionList();
            }
        });
    }

    private onCommandUpdatedListener(): void {
        this.onCommandUpdatedListenerSubscription = this.commandUpdatedEvents.commandCreatedListener().subscribe((command: GenericCommandDTO) => {
            // To avoid circular updates
            if (command.id !== this.variableCommandData.id) {
                this.generateVariableOptionList();
            }
        });
    }

    private generateVariableOptionList(): void {

        this.variableListInScope = this.variablesInScopeFinderService.getVariablesInScope(this.commandData);

        const newVariableOptionList: VariableOption[] = [];

        this.variableListInScope.forEach((variableCommand) => {
            if (variableCommand.data.varName) {
                newVariableOptionList.push({ value: variableCommand.id, label: variableCommand.data.varName });
            }
        });

        const isCurrentSelecteVariableAvailable = newVariableOptionList.some((option) => {
            return option.value === this.varSelected;
        });

        if (!isCurrentSelecteVariableAvailable) {
            this.varSelected = '';
            this.variableCommandForm.get('variable').setValue('');
        }

        this.variableOptionList = newVariableOptionList;
    }

}
