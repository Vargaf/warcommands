import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LogicOperatorCommandComponent} from './logic-operator-command.component';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
    CommandContainerNgrxRepositoryService
} from "../../../../warcommands/commands-panel/infrastructure/ngrx/command-container/command-container-ngrx-repository.service";
import {
    CommandNgrxRepositoryService
} from "../../../../warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service";
import {
    CommandPathFinderService
} from "../../../../warcommands/commands-panel/domain/commands-panel/services/command-path-finder.service";
import {
    CommandPathErrorManagerService
} from "../../../../warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service";
import {
    CommandComponent
} from "../../../../warcommands/commands-panel/domain/command-component/composition/command-component";
import {
    CommandPathManageable
} from "../../../../warcommands/commands-panel/domain/command-component/composition/command-path-manageable";
import {
    CommandFormValidable
} from "../../../../warcommands/commands-panel/domain/command-component/composition/command-form-validable";
import {
    CommandComponentBase
} from "../../../../warcommands/commands-panel/domain/command-component/composition/command-component-base";
import {
    LogicOperatorCommandEntity
} from "../../../../warcommands/commands-panel/domain/command/model/logic-operator/logic-operator-command.entity";
import {
    LogicOperatorENUM
} from "../../../../warcommands/commands-panel/domain/command/model/logic-operator/logic-operator.enum";
import {CommandType} from "../../../../warcommands/commands-panel/domain/command/model/command-type.enum";
import {of} from "rxjs";
import {
    CommandPathItemDTO
} from "../../../../warcommands/commands-panel/domain/commands-panel/model/command-path-item.dto";
import {
    CommandPathItemType
} from "../../../../warcommands/commands-panel/domain/commands-panel/model/command-path-item-type.enum";
import {
    CommandContainerDTO
} from "../../../../warcommands/commands-panel/domain/command-container/model/command-container.dto";
import {MatTooltipModule} from "@angular/material/tooltip";
import {CommandDropComponent} from "../../command-drop/command-drop.component";
import {
    CommandListDragDropManagerService
} from "../../../../warcommands/commands-panel/domain/command-drag-drop/services/command-list-drag-drop-manager.service";
import {
    CommandContainerDragDropManagerService
} from "../../../../warcommands/commands-panel/domain/command-container/services/command-container-drag-drop-manager.service";
import {
    CommandComponentManagerService
} from "../../../../warcommands/commands-panel/domain/command-component/services/command-component-manager.service";
import {
    CommandDropRemoveManagerService
} from "../../../../warcommands/commands-panel/domain/command/services/command-drop-remove-manager.service";
import {
    CommandDropCancelManagerService
} from "../../../../warcommands/commands-panel/domain/command/services/command-drop-cancel-manager.service";
import {
    CommandRepositoryService
} from "../../../../warcommands/commands-panel/domain/command/services/command-repository.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('LogicOperatorCommandComponent', () => {
    let component: LogicOperatorCommandComponent;
    let fixture: ComponentFixture<LogicOperatorCommandComponent>;

    let formBuilderSpy;
    let commandContainerNgrxRepositoryServiceSpy;
    let commandNgrxRepositoryServiceSpy;
    let commandPathFinderServiceSpy;
    let commandPathErrorManagerServiceSpy;

    let commandListDragDropManagerServiceSpy;
    let commandContainerDragDropManagerServiceSpy;
    let commandComponentManagerServiceSpy;
    let commandDropRemoveManagerServiceSpy;
    let commandDropCancelManagerServiceSpy;
    let commandRepositoryServiceSpy;

    beforeEach(waitForAsync(() => {
        formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
        const controlsConfigMock = new FormGroup({
            logicOperator: new FormControl('', Validators.required),
            firstCommandId: new FormControl('', Validators.required),
            secondCommandId: new FormControl('', Validators.required),
        });
        formBuilderSpy.group.and.returnValue(controlsConfigMock);

        commandContainerNgrxRepositoryServiceSpy = jasmine.createSpyObj('CommandContainerNgrxRepositoryService', ['getCommandContainer']);
        const commandContainerMock: CommandContainerDTO = {
            commands: [],
            fileId: "",
            id: "",
            parentCommandId: ''
        };
        commandContainerNgrxRepositoryServiceSpy.getCommandContainer.and.returnValue(of(commandContainerMock));

        commandNgrxRepositoryServiceSpy = jasmine.createSpyObj('CommandNgrxRepositoryService', ['getCommand']);
        commandNgrxRepositoryServiceSpy.getCommand.and.returnValue(of(null));

        commandPathFinderServiceSpy = jasmine.createSpyObj('CommandPathFinderService', ['getCommandPath', 'resetCommandPathError']);
        const commandPathItemDTOMock: CommandPathItemDTO = {
            itemId: "",
            type: CommandPathItemType.Command
        };
        commandPathFinderServiceSpy.getCommandPath.and.returnValue([commandPathItemDTOMock]);

        commandPathErrorManagerServiceSpy = jasmine.createSpyObj('CommandPathErrorManagerService', ['buildCommandPathError', 'LogicOperatorCommandComponent', 'resetCommandPathError']);

        commandListDragDropManagerServiceSpy = jasmine.createSpyObj('CommandListDragDropManagerService', ['a']);
        commandContainerDragDropManagerServiceSpy = jasmine.createSpyObj('CommandContainerDragDropManagerService', ['createCommandContainerDrop']);
        commandComponentManagerServiceSpy = jasmine.createSpyObj('CommandComponentManagerService', ['a']);
        commandDropRemoveManagerServiceSpy = jasmine.createSpyObj('CommandDropRemoveManagerService', ['a']);
        commandDropCancelManagerServiceSpy = jasmine.createSpyObj('CommandDropCancelManagerService', ['a']);
        commandRepositoryServiceSpy = jasmine.createSpyObj('CommandRepositoryService', ['a']);

        TestBed.configureTestingModule({
            imports: [MatTooltipModule, MatFormFieldModule, MatSelectModule, BrowserAnimationsModule, MatIconModule, ReactiveFormsModule],
            declarations: [LogicOperatorCommandComponent, CommandDropComponent],
            providers: [
                {provide: FormBuilder, useValue: formBuilderSpy},
                {provide: CommandContainerNgrxRepositoryService, useValue: commandContainerNgrxRepositoryServiceSpy},
                {provide: CommandNgrxRepositoryService, useValue: commandNgrxRepositoryServiceSpy},
                {provide: CommandPathFinderService, useValue: commandPathFinderServiceSpy},
                {provide: CommandPathErrorManagerService, useValue: commandPathErrorManagerServiceSpy},
                {provide: CommandListDragDropManagerService, useValue: commandListDragDropManagerServiceSpy},
                {provide: CommandContainerDragDropManagerService, useValue: commandContainerDragDropManagerServiceSpy},
                {provide: CommandComponentManagerService, useValue: commandComponentManagerServiceSpy},
                {provide: CommandDropRemoveManagerService, useValue: commandDropRemoveManagerServiceSpy},
                {provide: CommandDropCancelManagerService, useValue: commandDropCancelManagerServiceSpy},
                {provide: CommandRepositoryService, useValue: commandRepositoryServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        const commandData: LogicOperatorCommandEntity = {
            commandPathErrorsCounter: 0,
            data: {
                operator: LogicOperatorENUM.EqualTo
            },
            fileId: "",
            id: "",
            innerCommandContainerIdList: {firstCommandContainerId: "", secondCommandContainerId: ""},
            parentCommandContainerId: "",
            type: CommandType.LogicOperator

        };
        fixture = TestBed.createComponent(LogicOperatorCommandComponent);
        component = fixture.componentInstance;
        component.commandData = commandData;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

applyMixins(CommandComponent, [CommandPathManageable, CommandFormValidable, CommandComponentBase]);

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            Object.defineProperty(derivedCtor.prototype, name, <PropertyDescriptor>Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
        });
    });
}
