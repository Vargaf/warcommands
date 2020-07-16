import { Component, OnInit, Input, OnDestroy, ViewChild, ComponentRef } from '@angular/core';
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
import { CommandRepositoryService } from 'src/warcommands/commands-panel/domain/command/services/command-repository.service';
import { BaseSetVariableCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/set-variable-command.entity';
import { ClassNameENUM } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-name.enum';
import { ClassMemberDirective } from '../class-member.directive';
import { ClassMemberComponentFactory } from 'src/warcommands/commands-panel/domain/command/services/class-member-component/class-member-component-factory.service';
import { ClassMemberComponent } from 'src/warcommands/commands-panel/domain/command/model/class-member-component';
import { CommandClassMemberAddedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-class-member-added-events';
import { CommandNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service';

interface VariableOption { value: string, label: string };

@Component({
    selector: 'app-variable',
    templateUrl: './variable.component.html',
    styleUrls: ['./variable.component.scss']
})
export class VariableComponent implements OnInit, OnDestroy {

    @ViewChild(ClassMemberDirective)
    classMemberDirecitve: ClassMemberDirective;

    @Input() commandData: VariableCommandEntity;
    variableCommandData: VariableCommandEntity;

    variableCommandForm: FormGroup;

    varSelected: string;
    hasMemberOptions = false;
    classMemberComponent: ComponentRef<any>;
    
    variableOptionList: VariableOption[] = [];

    private onVarSelectedChangeSubscription: Subscription;
    private onCommandCreatedListenerSubscription: Subscription;
    private onCommandMovedListenerSubscription: Subscription;
    private onCommandRemoveListenerSubscription: Subscription;
    private onCommandUpdatedListenerSubscription: Subscription;
    private commandDataSubscription: Subscription;

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
        private readonly commandNgrxRepositoryService: CommandNgrxRepositoryService
    ) { }

    ngOnInit() {

        this.initializeCommand();
        this.initializeForm();

        this.generateVariableOptionList();

        this.setCommandListeners();

        this.commandDataSubscription = this.commandNgrxRepositoryService.getCommand(this.commandData.id).subscribe((command) => {
            this.variableCommandData = _.cloneDeep((command as VariableCommandEntity));
        });
    }

    ngOnDestroy() {
        this.onVarSelectedChangeSubscription.unsubscribe();
        this.onCommandCreatedListenerSubscription.unsubscribe();
        this.onCommandMovedListenerSubscription.unsubscribe();
        this.onCommandRemoveListenerSubscription.unsubscribe();
        this.onCommandUpdatedListenerSubscription.unsubscribe();
        this.commandDataSubscription.unsubscribe();
    }

    private initializeForm(): void {
        this.variableCommandForm = this.formBuilder.group({
            variable: [this.varSelected, [Validators.required]]
        });

        this.setVarSelectedWatcher();
    }

    private setVarSelectedWatcher(): void {
        this.onVarSelectedChangeSubscription = this.variableCommandForm.valueChanges.subscribe(() => {
            this.varSelected = this.variableCommandForm.get('variable').value;

            if (this.variableCommandForm.valid) {
                // To avoid circular updates between the component variable.component and set-variable-from-command.component
                if (this.variableCommandData.data?.variableCommandId !== this.varSelected) {
                    this.variableCommandData.data = {
                        variableCommandId: this.varSelected
                    };
                    this.variableCommandData.classMember = null;
                    this.commandUpdatedEvents.commandUpdatedDispatch(this.variableCommandData);
                }
            }
            
            this.loadClassMembersIfNeeded();
        });
    }

    private initializeCommand(): void {
        this.variableCommandData = _.cloneDeep(this.commandData);

        this.varSelected = this.variableCommandData.data?.variableCommandId || '';
        this.loadClassMembersIfNeeded();        
    }

    private loadClassMembersIfNeeded(): void {
        if (this.varSelected) {
            const variable: BaseSetVariableCommandEntity = (this.commandRepositoryService.findById(this.varSelected) as BaseSetVariableCommandEntity);
            
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

    private initializeClassMemberComponent(variable: BaseSetVariableCommandEntity): void {
        if (this.classMemberDirecitve) {
            this.classMemberComponent = this.classMemberComponentFactory.getComponent(variable.data.className, this.classMemberDirecitve);
            (this.classMemberComponent.instance as ClassMemberComponent).classMember = this.variableCommandData.classMember;
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

        if (!isCurrentSelecteVariableAvailable) {
            this.varSelected = '';
            this.variableCommandForm.get('variable').setValue('');
            this.variableCommandData.classMember = null;
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
        this.onCommandCreatedListenerSubscription = this.commandCreatedEvents.commandCreatedListener().subscribe((event: CommandAddedEventDTO) => {
            this.generateVariableOptionListIfRequired(event.command.id);
        });
    }

    private onCommandMovedListener(): void {
        this.onCommandMovedListenerSubscription = this.commandMovedEvents.commandMovedListener().subscribe((event: CommandMovedEventDTO) => {
            this.generateVariableOptionListIfRequired(event.command.id);
        });
    }

    private onCommandRemoveListener(): void {
        this.onCommandRemoveListenerSubscription = this.commandRemovedEvents.commandRemovedListener().subscribe((command: GenericCommandDTO) => {
            this.generateVariableOptionListIfRequired(command.id);
        });
    }

    private onCommandUpdatedListener(): void {
        this.onCommandUpdatedListenerSubscription = this.commandUpdatedEvents.commandCreatedListener().subscribe((command: GenericCommandDTO) => {
            this.generateVariableOptionListIfRequired(command.id);
        });
    }

}
