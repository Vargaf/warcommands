import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GameCommandComponent} from './game-command.component';
import {
    CommandNgrxRepositoryService
} from "../../../../warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service";
import {CommandType} from "../../../../warcommands/commands-panel/domain/command/model/command-type.enum";
import {
    ClassNameENUM
} from "../../../../warcommands/commands-panel/domain/command/model/class-definition/class-name.enum";
import {GenericCommandDTO} from "../../../../warcommands/commands-panel/domain/command/model/generic-command.dto";
import {of} from "rxjs";
import {
    GameClassMemberOptionsListComponent
} from "../../class-definition/game/game-class-member-options-list/game-class-member-options-list.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {
    CommandPathFinderService
} from "../../../../warcommands/commands-panel/domain/commands-panel/services/command-path-finder.service";
import {
    CommandRepositoryService
} from "../../../../warcommands/commands-panel/domain/command/services/command-repository.service";
import {MatIconModule} from "@angular/material/icon";

describe('GameCommandComponent', () => {
    let component: GameCommandComponent;
    let fixture: ComponentFixture<GameCommandComponent>;

    let commandNgrxRepositoryServiceSpy;

    let formBuilderSpy;
    let commandPathFinderServiceSpy;
    let commandRepositoryServiceSpy;

    beforeEach(waitForAsync(() => {
        commandNgrxRepositoryServiceSpy = jasmine.createSpyObj('CommandNgrxRepositoryService', ['getCommand']);
        const genericCommandDTOMock: GenericCommandDTO = {
            commandPathErrorsCounter: 0,
            fileId: "",
            id: "",
            parentCommandContainerId: "",
            type: CommandType.Game
        };
        commandNgrxRepositoryServiceSpy.getCommand.and.returnValue(of(genericCommandDTOMock));

        formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
        const controlsConfigMock = new FormGroup({
            memberSelected: new FormControl('', Validators.required),
        });
        formBuilderSpy.group.and.returnValue(controlsConfigMock);
        commandPathFinderServiceSpy = jasmine.createSpyObj('CommandPathFinderService', ['a']);
        commandRepositoryServiceSpy = jasmine.createSpyObj('CommandRepositoryService', ['a']);

        TestBed.configureTestingModule({
            declarations: [GameCommandComponent, GameClassMemberOptionsListComponent],
            imports: [MatIconModule],
            providers: [
                {provide: CommandNgrxRepositoryService, useValue: commandNgrxRepositoryServiceSpy},
                {provide: FormBuilder, useValue: formBuilderSpy},
                {provide: CommandPathFinderService, useValue: commandPathFinderServiceSpy},
                {provide: CommandRepositoryService, useValue: commandRepositoryServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GameCommandComponent);
        component = fixture.componentInstance;

        component.commandData = {
            commandPathErrorsCounter: 0,
            fileId: "",
            id: "",
            parentCommandContainerId: "",
            type: CommandType.Game,
            classMember: {
                returnClassName: ClassNameENUM.Game,
                className: ClassNameENUM.Game,
                memberName: '',
                args: [],
                methodChained: null
            }
        };

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
