import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {VariableComponent} from './variable.component';
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
    VariableInScopeFinderService
} from "../../../../warcommands/commands-panel/domain/command/model/variable/services/variables-in-scope-finder.service";
import {of} from "rxjs";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
    CommandRepositoryService
} from "../../../../warcommands/commands-panel/domain/command/services/command-repository.service";
import {
    CommandNgrxRepositoryService
} from "../../../../warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service";
import {
    CommandPathFinderService
} from "../../../../warcommands/commands-panel/domain/commands-panel/services/command-path-finder.service";
import {
    VariableCommandEntity
} from "../../../../warcommands/commands-panel/domain/command/model/variable/model/variable-command.entity";
import {CommandType} from "../../../../warcommands/commands-panel/domain/command/model/command-type.enum";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {
    CommandPathErrorManagerService
} from "../../../../warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service";

describe('VariableComponent', () => {
    let component: VariableComponent;
    let fixture: ComponentFixture<VariableComponent>;

    let variableInScopeFinderServiceSpy;
    let formBuilderSpy;
    let commandRepositoryServiceSpy;
    let commandNgrxRepositoryServiceSpy;
    let commandPathFinderServiceSpy;
    let commandPathErrorManagerServiceSpy;

    let variableCommandEntityMock: VariableCommandEntity;

    beforeEach(waitForAsync(() => {
        variableCommandEntityMock = {
            classMember: undefined,
            commandPathErrorsCounter: 0,
            data: {
                variableCommandId: ''
            },
            fileId: "",
            id: "1",
            innerCommandContainerIdList: {},
            parentCommandContainerId: "",
            type: CommandType.Variable
        };
        variableInScopeFinderServiceSpy = jasmine.createSpyObj('VariableInScopeFinderService', ['getVariablesInPreviuosScope']);
        variableInScopeFinderServiceSpy.getVariablesInPreviuosScope.and.returnValue([variableCommandEntityMock]);
        formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
        const controlsConfigMock = new FormGroup({
            variable: new FormControl('', Validators.required),
        });
        formBuilderSpy.group.and.returnValue(controlsConfigMock);
        commandRepositoryServiceSpy = jasmine.createSpyObj('CommandRepositoryService', ['findById']);
        commandRepositoryServiceSpy.findById.and.returnValue(variableCommandEntityMock);
        commandNgrxRepositoryServiceSpy = jasmine.createSpyObj('CommandNgrxRepositoryService', ['getCommand']);
        commandNgrxRepositoryServiceSpy.getCommand.and.returnValue(of(variableCommandEntityMock));
        commandPathFinderServiceSpy = jasmine.createSpyObj('CommandPathFinderService', ['getCommandPath']);
        commandPathFinderServiceSpy.getCommandPath.and.returnValue([]);
        commandPathErrorManagerServiceSpy = jasmine.createSpyObj('CommandPathErrorManagerService', ['buildCommandPathError', 'resetCommandPathError']);
        TestBed.configureTestingModule({
            declarations: [VariableComponent],
            imports: [MatTooltipModule, MatFormFieldModule, MatSelectModule, MatIconModule, ReactiveFormsModule, NoopAnimationsModule],
            providers: [
                {provide: VariableInScopeFinderService, useValue: variableInScopeFinderServiceSpy},
                {provide: FormBuilder, useValue: formBuilderSpy},
                {provide: CommandRepositoryService, useValue: commandRepositoryServiceSpy},
                {provide: CommandNgrxRepositoryService, useValue: commandNgrxRepositoryServiceSpy},
                {provide: CommandPathFinderService, useValue: commandPathFinderServiceSpy},
                {provide: CommandPathErrorManagerService, useValue: commandPathErrorManagerServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VariableComponent);
        component = fixture.componentInstance;
        component.commandData = variableCommandEntityMock;
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

