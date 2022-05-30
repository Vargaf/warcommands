import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {IfThenComponent} from './if-then.component';
import {of} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {
    CommandNgrxRepositoryService
} from "../../../../warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service";
import {
    CommandContainerNgrxRepositoryService
} from "../../../../warcommands/commands-panel/infrastructure/ngrx/command-container/command-container-ngrx-repository.service";
import {
    CommandRepositoryService
} from "../../../../warcommands/commands-panel/domain/command/services/command-repository.service";
import {
    CommandPathFinderService
} from "../../../../warcommands/commands-panel/domain/commands-panel/services/command-path-finder.service";
import {IfThenCommandEntity} from "../../../../warcommands/commands-panel/domain/command/model/if-then-command.entity";
import {CommandType} from "../../../../warcommands/commands-panel/domain/command/model/command-type.enum";
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
    CommandContainerDTO
} from "../../../../warcommands/commands-panel/domain/command-container/model/command-container.dto";
import {MatTooltipModule} from "@angular/material/tooltip";

describe('IfThenComponent', () => {
    let component: IfThenComponent;
    let fixture: ComponentFixture<IfThenComponent>;

    let formBuilderSpy;
    let commandNgrxRepositoryServiceSpy;
    let commandContainerNgrxRepositoryServiceSpy;
    let commandRepositoryServiceSpy;
    let commandPathFinderServiceSpy;

    let ifThenCommandMock: IfThenCommandEntity;

    beforeEach(waitForAsync(() => {
        formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
        const controlsConfigMock = {
            statusChanges: of(null),
            get: () => {},
            updateValueAndValidity: () => {},
        };
        formBuilderSpy.group.and.returnValue(controlsConfigMock);
        commandNgrxRepositoryServiceSpy = jasmine.createSpyObj('CommandNgrxRepositoryService', ['getCommand']);
        ifThenCommandMock = {
            classMember: undefined,
            commandPathErrorsCounter: 0,
            data: undefined,
            fileId: "",
            id: "",
            innerCommandContainerIdList: {conditionCommandContainerId: "", thenCommandContainerId: ""},
            parentCommandContainerId: "",
            type: CommandType.IfThen
        };
        commandNgrxRepositoryServiceSpy.getCommand.and.returnValue(of(ifThenCommandMock));
        commandContainerNgrxRepositoryServiceSpy = jasmine.createSpyObj('CommandContainerNgrxRepositoryService', ['getCommandContainer']);
        const commandContainerMock: CommandContainerDTO = {
            commands: [],
            fileId: "",
            id: "",
            parentCommandId: ''
        };
        commandContainerNgrxRepositoryServiceSpy.getCommandContainer.and.returnValue(of(commandContainerMock));
        commandRepositoryServiceSpy = jasmine.createSpyObj('CommandRepositoryService', ['a']);
        commandPathFinderServiceSpy = jasmine.createSpyObj('CommandPathFinderService', ['getCommandPath']);
        commandPathFinderServiceSpy.getCommandPath.and.returnValue([]);
        TestBed.configureTestingModule({
            imports: [MatTooltipModule],
            declarations: [IfThenComponent],
            providers: [
                {provide: FormBuilder, useValue: formBuilderSpy},
                {provide: CommandNgrxRepositoryService, useValue: commandNgrxRepositoryServiceSpy},
                {provide: CommandContainerNgrxRepositoryService, useValue: commandContainerNgrxRepositoryServiceSpy},
                {provide: CommandRepositoryService, useValue: commandRepositoryServiceSpy},
                {provide: CommandPathFinderService, useValue: commandPathFinderServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IfThenComponent);
        component = fixture.componentInstance;
        component.commandData = ifThenCommandMock;
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
