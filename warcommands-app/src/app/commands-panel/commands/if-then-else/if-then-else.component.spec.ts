import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {IfThenElseComponent} from './if-then-else.component';
import {
    CommandNgrxRepositoryService
} from "../../../../warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service";

describe('IfThenElseComponent', () => {
    let component: IfThenElseComponent;
    let fixture: ComponentFixture<IfThenElseComponent>;

    let commandNgrxRepositoryServiceSpy;

    beforeEach(waitForAsync(() => {
        commandNgrxRepositoryServiceSpy = jasmine.createSpyObj('CommandNgrxRepositoryService', ['a']);
        TestBed.configureTestingModule({
            declarations: [IfThenElseComponent],
            providers: [
                {provide: CommandNgrxRepositoryService, useValue: commandNgrxRepositoryServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IfThenElseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
