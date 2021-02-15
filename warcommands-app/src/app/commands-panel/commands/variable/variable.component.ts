import { Component, OnInit, Input, OnDestroy, ViewChild, ComponentRef, AfterViewInit } from '@angular/core';
import { VariableInScopeFinderService } from 'src/warcommands/commands-panel/domain/command/model/variable/services/variables-in-scope-finder.service';
import { VariableCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/variable/model/variable-command.entity';
import { GenericCommandDTO } from 'src/warcommands/commands-panel/domain/command/model/generic-command.dto';
import { CommandCreatedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-created-events';
import { CommandMovedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-moved-events';
import { CommandRemovedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-removed-events';
import { CommandAddedEventDTO } from 'src/warcommands/commands-panel/domain/command/events/command-added-event.dto';
import { CommandMovedEventDTO } from 'src/warcommands/commands-panel/domain/command/events/command-modeved-event.dto';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CommandUpdatedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-updated-events';
import * as _ from 'lodash';
import { CommandRepositoryService } from 'src/warcommands/commands-panel/domain/command/services/command-repository.service';
import { BaseSetVariableCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/set-variable-command.entity';
import { ClassNameENUM } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-name.enum';
import { ClassMemberDirective } from '../class-member.directive';
import { ClassMemberComponentFactory } from 'src/warcommands/commands-panel/domain/command/services/class-member-component/class-member-component-factory.service';
import { ClassMemberComponent } from 'src/warcommands/commands-panel/domain/command/model/class-member-component';
import { CommandClassMemberAddedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-class-member-added-events';
import { CommandNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service';
import { CommandComponent } from 'src/warcommands/commands-panel/domain/command-component/composition/command-component';
import { CommandPathFinderService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-finder.service';
import { CommandPathErrorManagerService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service';

interface VariableOption { value: string, label: string };

@Component({
    selector: 'app-variable',
    templateUrl: './variable.component.html',
    styleUrls: ['./variable.component.scss']
})
export class VariableComponent extends CommandComponent implements OnInit, OnDestroy, AfterViewInit {
    
    @ViewChild(ClassMemberDirective)
    classMemberDirecitve: ClassMemberDirective;

    @Input() commandData: VariableCommandEntity;
    variableCommandData: VariableCommandEntity;

    commandForm: FormGroup;

    varSelected: string;
    hasMemberOptions = false;
    classMemberComponent: ComponentRef<any>;
    
    variableOptionList: VariableOption[] = [];

    private currentClassName: string = null;
    private previousVariableId: string = null;

    constructor(
        private readonly variablesInScopeFinderService: VariableInScopeFinderService,
        private readonly commandCreatedEvents: CommandCreatedEvents,
        private readonly commandMovedEvents: CommandMovedEvents,
        private readonly commandRemovedEvents: CommandRemovedEvents,
        private readonly formBuilder: FormBuilder,
        private readonly commandUpdatedEvents: CommandUpdatedEvents,
        private readonly commandRepositoryService: CommandRepositoryService,
        private readonly classMemberComponentFactory: ClassMemberComponentFactory,
        private readonly commandClassMemberAddedEvent: CommandClassMemberAddedEvents,
        private readonly commandNgrxRepositoryService: CommandNgrxRepositoryService,
        protected readonly commandPathFinderService: CommandPathFinderService,
        protected readonly commandPathErrorManagerService: CommandPathErrorManagerService,
        
    ) {
        super(commandPathFinderService, commandPathErrorManagerService);
     }

    ngOnInit() {

        this.commandComponentInitialize();
        this.generateVariableOptionList();
        this.setCommandListeners();
    }

    ngOnDestroy() {
        this.commandComponentDestroy();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.commandForm.updateValueAndValidity();
        });
        
    }

    protected initializeForm(): void {
        this.commandForm = this.formBuilder.group({
            variable: [this.varSelected, [Validators.required]]
        });

        this.setVarSelectedWatcher();

        const statusChangesSubscription = this.commandForm.statusChanges.subscribe(() => {
            this.commandFormStatusManager();
        });
        this.subscriptionManager.add(statusChangesSubscription);
    }

    private setVarSelectedWatcher(): void {
        const subscription = this.commandForm.valueChanges.subscribe(() => {
            this.varSelected = this.commandForm.get('variable').value;

            if (this.commandForm.valid) {
                // To avoid circular updates between the component variable.component and set-variable-from-command.component
                if (this.isUpdateNeeded()) {
                    this.variableCommandData.data = {
                        variableCommandId: this.varSelected
                    };
                    this.variableCommandData.classMember = null;
                    this.commandUpdatedEvents.commandUpdatedDispatch(this.variableCommandData);
                }
            } else {
                if (this.isUpdateNeeded()) {
                    this.variableCommandData.data = {
                        variableCommandId: null
                    };
                    this.variableCommandData.classMember = null;
                    this.commandUpdatedEvents.commandUpdatedDispatch(this.variableCommandData);
                }
            }
            
            this.loadClassMembersIfNeeded();
        });

        this.subscriptionManager.add(subscription);
    }

    private isUpdateNeeded(): boolean {
        return this.variableCommandData.data?.variableCommandId !== this.varSelected;
    }

    protected initializeCommand(): void {
        this.variableCommandData = _.cloneDeep((this.commandData as VariableCommandEntity));
        this.variableCommandData.commandPathErrorsCounter = 0;

        const subscription = this.commandNgrxRepositoryService.getCommand(this.commandData.id).subscribe((command) => {
            this.variableCommandData = _.cloneDeep((command as VariableCommandEntity));

            this.handleInvalidCommandBackground(command);
        });

        this.subscriptionManager.add(subscription);

        this.varSelected = this.variableCommandData.data?.variableCommandId || '';
        this.loadClassMembersIfNeeded();        
    }

    private loadClassMembersIfNeeded(): void {
        const variable: BaseSetVariableCommandEntity = (this.commandRepositoryService.findById(this.varSelected) as BaseSetVariableCommandEntity);

        if (this.isClassMemberRefreshNeeded(variable)) {
            this.currentClassName = variable.data.className;
            this.previousVariableId = this.varSelected;

            switch (variable.data.className) {
                case ClassNameENUM.Game:
                case ClassNameENUM.Array:
                case ClassNameENUM.Worker: 
                case ClassNameENUM.Base: {
                    this.hasMemberOptions = true;
                    break;
                }
                default: {
                    this.hasMemberOptions = false;
                    if (this.variableCommandData.classMember) {
                        this.variableCommandData.classMember = null;
                        this.commandClassMemberAddedEvent.commandClassMemberAddedDispatch(this.variableCommandData.id, null);   
                        
                    }
                }
            }

            if (this.hasMemberOptions) {
                setTimeout(() => {
                    this.initializeClassMemberComponent(variable);
                }, 0);
            }
        }
    }

    private isClassMemberRefreshNeeded(variable: BaseSetVariableCommandEntity): boolean {
        return this.varSelected && (this.previousVariableId !== variable.id || this.currentClassName !== variable.data.className);
    }

    private initializeClassMemberComponent(variable: BaseSetVariableCommandEntity): void {
        if (this.classMemberDirecitve) {
            this.classMemberComponent = this.classMemberComponentFactory.getComponent(variable.data.className, this.classMemberDirecitve);
            (this.classMemberComponent.instance as ClassMemberComponent).classMember = this.variableCommandData.classMember;
            (this.classMemberComponent.instance as ClassMemberComponent).commandId = this.variableCommandData.id;
            (this.classMemberComponent.instance as ClassMemberComponent).classMemberChange.subscribe((componentClassMember) => {
                if (!_.isEqual(this.variableCommandData.classMember, componentClassMember)) {
                    this.variableCommandData.classMember = componentClassMember;
                    this.commandClassMemberAddedEvent.commandClassMemberAddedDispatch(this.variableCommandData.id, componentClassMember);   
                }
            });
        }
    }

    private generateVariableOptionListIfRequired(commandId: string): void {
        // To avoid circular updates
        if (this.variableCommandData && commandId !== this.variableCommandData.id) {
            this.generateVariableOptionList();
        }
    }

    private generateVariableOptionList(): void {

        const newVariableOptionList: VariableOption[] = this.variablesInScopeFinderService.getVariablesInPreviuosScope(this.commandData);

        const isCurrentSelecteVariableAvailable = newVariableOptionList.some((option) => {
            return option.value === this.varSelected;
        });

        if (!isCurrentSelecteVariableAvailable && this.variableCommandData.classMember) {
            this.varSelected = '';
            this.variableCommandData.classMember = null;
            this.commandForm.get('variable').setValue('');
        } else {
            this.loadClassMembersIfNeeded();
        }

        this.variableOptionList = newVariableOptionList;
    }

    private setCommandListeners(): void {
        this.onCommandCreatedListener();
        this.onCommandMovedListener();
        this.onCommandRemoveListener();
        this.onCommandUpdatedListener();
    }

    private onCommandCreatedListener(): void {
        const subscription = this.commandCreatedEvents.commandCreatedListener().subscribe((event: CommandAddedEventDTO) => {
            this.generateVariableOptionListIfRequired(event.command.id);
        });

        this.subscriptionManager.add(subscription);
    }

    private onCommandMovedListener(): void {
        const subscription = this.commandMovedEvents.commandMovedListener().subscribe((event: CommandMovedEventDTO) => {
            this.generateVariableOptionListIfRequired(event.command.id);
        });

        this.subscriptionManager.add(subscription);
    }

    private onCommandRemoveListener(): void {
        const subscription = this.commandRemovedEvents.commandRemovedListener().subscribe((command: GenericCommandDTO) => {
            this.generateVariableOptionListIfRequired(command.id);
        });

        this.subscriptionManager.add(subscription);
    }

    private onCommandUpdatedListener(): void {
        const subscription = this.commandUpdatedEvents.commandCreatedListener().subscribe((command: GenericCommandDTO) => {
            this.generateVariableOptionListIfRequired(command.id);
        });

        this.subscriptionManager.add(subscription);
    }

    protected getCommandErrorMessages(): String[] {
        let errorFormMessage: String[] = [];
        const variableInput: AbstractControl = this.commandForm.get('variable');

        if(variableInput.errors) {
            if (variableInput.errors.required) {
                errorFormMessage.push('- Select a variable.');
            }
        }

        return errorFormMessage;
    }

}
