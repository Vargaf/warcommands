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

describe('GameCommandComponent', () => {
    let component: GameCommandComponent;
    let fixture: ComponentFixture<GameCommandComponent>;
    let commandNgrxRepositoryServiceSpy;

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

        TestBed.configureTestingModule({
            declarations: [GameCommandComponent],
            providers: [
                {provide: CommandNgrxRepositoryService, useValue: commandNgrxRepositoryServiceSpy}
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
