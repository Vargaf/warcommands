import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SetVariableComponent} from './set-variable.component';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {of} from "rxjs";
import {
    CommandNgrxRepositoryService
} from "../../../../warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service";
import {SetVariableCommandDTO} from "../../../../warcommands/gameEngine/domain/command/model/set-variable-command.dto";
import {
    CommandPathFinderService
} from "../../../../warcommands/commands-panel/domain/commands-panel/services/command-path-finder.service";
import {
    CommandPathErrorManagerService
} from "../../../../warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service";
import {
    UniqueVarNameValidator
} from "../../../../warcommands/commands-panel/infrastructure/angular/commands/unique-var-name.validator";
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
    SetVarCommandComponent
} from "../../../../warcommands/commands-panel/domain/command-component/composition/set-var-command-component";
import {
    ClassNameENUM
} from "../../../../warcommands/commands-panel/domain/command/model/class-definition/class-name.enum";
import {CommandType} from "../../../../warcommands/commands-panel/domain/command/model/command-type.enum";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";
import {MatInputModule} from "@angular/material/input";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('SetVariableComponent', () => {
    let component: SetVariableComponent;
    let fixture: ComponentFixture<SetVariableComponent>;

    let formBuilderSpy;
    let commandNgrxRepositoryServiceSpy;
    let commandPathErrorManagerServiceSpy;
    let commandPathFinderServiceSpy;
    let uniqueVarNameValidatorSpy;

    beforeEach(waitForAsync(() => {

        formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
        const controlsConfigMock = new FormGroup({
            varName: new FormControl('', Validators.required),
            varValue: new FormControl('', Validators.required),
        });
        formBuilderSpy.group.and.returnValue(controlsConfigMock);

        commandNgrxRepositoryServiceSpy = jasmine.createSpyObj('CommandNgrxRepositoryService', ['getCommand']);
        const setVariableCommandMock: SetVariableCommandDTO = {
            data: {
                varName: "testName",
                varValue: "testValue"
            },
            id: "1",
            innerCommandContainerIdList: {},
            parentCommandContainerId: "",
            playerId: "",
            type: CommandType.SetVariable
        };
        commandNgrxRepositoryServiceSpy.getCommand.and.returnValue(of(setVariableCommandMock));

        commandPathErrorManagerServiceSpy = jasmine.createSpyObj('CommandPathErrorManagerService', ['buildCommandPathError', 'resetCommandPathError']);

        commandPathFinderServiceSpy = jasmine.createSpyObj('CommandPathFinderService', ['getCommandPath']);

        uniqueVarNameValidatorSpy = jasmine.createSpyObj('UniqueVarNameValidator', ['createValidator']);

        TestBed.configureTestingModule({
            imports: [MatTooltipModule, MatFormFieldModule, MatInputModule, NoopAnimationsModule, BrowserDynamicTestingModule, MatIconModule, ReactiveFormsModule],
            declarations: [SetVariableComponent],
            providers: [
                {provide: FormBuilder, useValue: formBuilderSpy},
                {provide: CommandNgrxRepositoryService, useValue: commandNgrxRepositoryServiceSpy},
                {provide: CommandPathErrorManagerService, useValue: commandPathErrorManagerServiceSpy},
                {provide: CommandPathFinderService, useValue: commandPathFinderServiceSpy},
                {provide: UniqueVarNameValidator, useValue: uniqueVarNameValidatorSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SetVariableComponent);
        component = fixture.componentInstance;

        component.commandData = {
            commandPathErrorsCounter: 0,
            data: {
                className: ClassNameENUM.Number,
                varName: "testName",
                varValue: "testValue"
            },
            fileId: "",
            id: "1",
            parentCommandContainerId: "",
            type: CommandType.SetVariable
        };

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

applyMixins(SetVarCommandComponent, [CommandComponent, CommandPathManageable, CommandFormValidable]);

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            Object.defineProperty(derivedCtor.prototype, name, <PropertyDescriptor>Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
        });
    });
}
