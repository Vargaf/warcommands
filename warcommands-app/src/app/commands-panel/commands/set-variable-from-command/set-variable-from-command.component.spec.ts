import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SetVariableFromCommandComponent} from './set-variable-from-command.component';
import {of} from "rxjs";
import {FormBuilder} from "@angular/forms";
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
        commandPathErrorManagerServiceSpy = jasmine.createSpyObj('CommandPathErrorManagerService', ['buildCommandPathError']);
        commandPathFinderServiceSpy = jasmine.createSpyObj('CommandPathFinderService', ['getCommandPath']);
        uniqueVarNameValidatorSpy = jasmine.createSpyObj('UniqueVarNameValidator', ['createValidator']);
        const controlsConfigMock = {
            statusChanges: of(null),
            valueChanges: of(null),
            get: () => {},
            updateValueAndValidity: () => {},
        };
        formBuilderSpy.group.and.returnValue(controlsConfigMock);
        TestBed.configureTestingModule({
            imports: [MatTooltipModule],
            declarations: [SetVariableFromCommandComponent],
            providers: [
                {provide: FormBuilder, useValue: formBuilderSpy},
                {provide: CommandContainerNgrxRepositoryService, useValue: commandContainerNgrxRepositoryServiceSpy},
                {provide: CommandNgrxRepositoryService, useValue: commandNgrxRepositoryServiceSpy},
                {provide: CommandRepositoryService, useValue: commandRepositoryServiceSpy},
                {provide: CommandPathErrorManagerService, useValue: commandPathErrorManagerServiceSpy},
                {provide: CommandPathFinderService, useValue: commandPathFinderServiceSpy},
                {provide: UniqueVarNameValidator, useValue: uniqueVarNameValidatorSpy},
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
