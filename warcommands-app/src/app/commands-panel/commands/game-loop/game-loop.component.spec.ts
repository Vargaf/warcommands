import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GameLoopComponent} from './game-loop.component';
import {
    CommandNgrxRepositoryService
} from "../../../../warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service";

describe('GameLoopComponent', () => {
    let component: GameLoopComponent;
    let fixture: ComponentFixture<GameLoopComponent>;

    let commandNgrxRepositoryServiceSpy;

    beforeEach(waitForAsync(() => {
        commandNgrxRepositoryServiceSpy = jasmine.createSpyObj('CommandNgrxRepositoryService', ['a']);
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
