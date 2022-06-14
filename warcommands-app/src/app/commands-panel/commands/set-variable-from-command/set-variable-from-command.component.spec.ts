import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SetVariableFromCommandComponent} from './set-variable-from-command.component';
import {of} from "rxjs";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
    CommandContainerNgrxRepositoryService
} from "../../../../warcommands/commands-panel/infrastructure/ngrx/command-container/command-container-ngrx-repository.service";
import {
    CommandNgrxRepositoryService
} from "../../../../warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service";
import {
    CommandRepositoryService
} from "../../../../warcommands/commands-panel/domain/command/services/command-repository.service";
import {
    CommandPathErrorManagerService
} from "../../../../warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service";
import {
    CommandPathFinderService
} from "../../../../warcommands/commands-panel/domain/commands-panel/services/command-path-finder.service";
import {
    UniqueVarNameValidator
} from "../../../../warcommands/commands-panel/infrastructure/angular/commands/unique-var-name.validator";
import {
    SetVariableFromCommandCommandEntity
} from "../../../../warcommands/commands-panel/domain/command/model/set-variable-from-command-command.entity";
import {
    ClassNameENUM
} from "../../../../warcommands/commands-panel/domain/command/model/class-definition/class-name.enum";
import {CommandType} from "../../../../warcommands/commands-panel/domain/command/model/command-type.enum";
import {
    CommandContainerDTO
} from "../../../../warcommands/commands-panel/domain/command-container/model/command-container.dto";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
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
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('SetVariableFromCommandComponent', () => {
    let component: SetVariableFromCommandComponent;
    let fixture: ComponentFixture<SetVariableFromCommandComponent>;

    let formBuilderSpy;
    let commandContainerNgrxRepositoryServiceSpy;
    let commandNgrxRepositoryServiceSpy;
    let commandRepositoryServiceSpy;
    let commandPathErrorManagerServiceSpy;
    let commandPathFinderServiceSpy;
    let uniqueVarNameValidatorSpy;

    let setVariableFromCommandCommandEntityMock: SetVariableFromCommandCommandEntity;

    let commandListDragDropManagerServiceSpy;
    let commandContainerDragDropManagerServiceSpy;
    let commandComponentManagerServiceSpy;
    let commandDropRemoveManagerServiceSpy;
    let commandDropCancelManagerServiceSpy;

    beforeEach(waitForAsync(() => {
        setVariableFromCommandCommandEntityMock = {
            classMember: undefined,
            commandPathErrorsCounter: 0,
            data: {
                className: ClassNameENUM.Game,
                innerCommandId: '',
                varName: ""
            },
            fileId: "",
            id: "",
            innerCommandContainerIdList: {command: ""},
            parentCommandContainerId: "",
            type: CommandType.SetVariableFromCommand
        };
        formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
        commandContainerNgrxRepositoryServiceSpy = jasmine.createSpyObj('CommandContainerNgrxRepositoryService', ['getCommandContainer']);
        const commandContainerMock: CommandContainerDTO = {
            commands: [],
            fileId: "",
            id: "",
            parentCommandId: ''
        };
        commandContainerNgrxRepositoryServiceSpy.getCommandContainer.and.returnValue(of(commandContainerMock));
        commandNgrxRepositoryServiceSpy = jasmine.createSpyObj('CommandNgrxRepositoryService', ['getCommand']);
        commandNgrxRepositoryServiceSpy.getCommand.and.returnValue(of(setVariableFromCommandCommandEntityMock));
        commandRepositoryServiceSpy = jasmine.createSpyObj('CommandRepositoryService', ['a']);
        commandPathErrorManagerServiceSpy = jasmine.createSpyObj('CommandPathErrorManagerService', ['buildCommandPathError', 'resetCommandPathError']);
        commandPathFinderServiceSpy = jasmine.createSpyObj('CommandPathFinderService', ['getCommandPath']);
        uniqueVarNameValidatorSpy = jasmine.createSpyObj('UniqueVarNameValidator', ['createValidator']);
        const controlsConfigMock = new FormGroup({
            varName: new FormControl('', Validators.required),
            innerCommandId: new FormControl('', Validators.required),
        });
        formBuilderSpy.group.and.returnValue(controlsConfigMock);

        commandContainerDragDropManagerServiceSpy = jasmine.createSpyObj('CommandContainerDragDropManagerService', ['createCommandContainerDrop']);
        commandListDragDropManagerServiceSpy = jasmine.createSpyObj('CommandListDragDropManagerService', ['a']);
        commandComponentManagerServiceSpy = jasmine.createSpyObj('CommandComponentManagerService', ['a']);
        commandDropRemoveManagerServiceSpy = jasmine.createSpyObj('CommandDropRemoveManagerService', ['a']);
        commandDropCancelManagerServiceSpy = jasmine.createSpyObj('CommandDropCancelManagerService', ['a']);
        TestBed.configureTestingModule({
            imports: [MatTooltipModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, BrowserAnimationsModule],
            declarations: [SetVariableFromCommandComponent, CommandDropComponent],
            providers: [
                {provide: FormBuilder, useValue: formBuilderSpy},
                {provide: CommandContainerNgrxRepositoryService, useValue: commandContainerNgrxRepositoryServiceSpy},
                {provide: CommandNgrxRepositoryService, useValue: commandNgrxRepositoryServiceSpy},
                {provide: CommandRepositoryService, useValue: commandRepositoryServiceSpy},
                {provide: CommandPathErrorManagerService, useValue: commandPathErrorManagerServiceSpy},
                {provide: CommandPathFinderService, useValue: commandPathFinderServiceSpy},
                {provide: UniqueVarNameValidator, useValue: uniqueVarNameValidatorSpy},
                {provide: CommandListDragDropManagerService, useValue: commandListDragDropManagerServiceSpy},
                {provide: CommandContainerDragDropManagerService, useValue: commandContainerDragDropManagerServiceSpy},
                {provide: CommandComponentManagerService, useValue: commandComponentManagerServiceSpy},
                {provide: CommandDropRemoveManagerService, useValue: commandDropRemoveManagerServiceSpy},
                {provide: CommandDropCancelManagerService, useValue: commandDropCancelManagerServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SetVariableFromCommandComponent);
        component = fixture.componentInstance;
        component.commandData = setVariableFromCommandCommandEntityMock;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
