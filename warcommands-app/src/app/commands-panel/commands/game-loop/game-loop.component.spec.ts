import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GameLoopComponent} from './game-loop.component';
import {
    CommandNgrxRepositoryService
} from "../../../../warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service";
import {
    GameLoopCommandEntity
} from "../../../../warcommands/commands-panel/domain/command/model/game-loop-command.entity";
import {of} from "rxjs";
import {CommandType} from "../../../../warcommands/commands-panel/domain/command/model/command-type.enum";

describe('GameLoopComponent', () => {
    let component: GameLoopComponent;
    let fixture: ComponentFixture<GameLoopComponent>;

    let commandNgrxRepositoryServiceSpy;

    beforeEach(waitForAsync(() => {
        commandNgrxRepositoryServiceSpy = jasmine.createSpyObj('CommandNgrxRepositoryService', ['getCommand']);
        const commandMock: GameLoopCommandEntity = {
            classMember: undefined,
            commandPathErrorsCounter: 0,
            data: undefined,
            fileId: "",
            id: "",
            innerCommandContainerIdList: {commandContainerId: ""},
            parentCommandContainerId: "",
            type: CommandType.GameLoop
        };
        commandNgrxRepositoryServiceSpy.getCommand.and.returnValue(of(commandMock));
        TestBed.configureTestingModule({
            declarations: [GameLoopComponent],
            providers: [
                {provide: CommandNgrxRepositoryService, useValue: commandNgrxRepositoryServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GameLoopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
