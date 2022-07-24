import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {IfThenElseComponent} from './if-then-else.component';
import {
    CommandNgrxRepositoryService
} from "../../../../warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service";
import {of} from "rxjs";
import {
    IfThenElseCommandEntity
} from "../../../../warcommands/commands-panel/domain/command/model/if-then-else-command.entity";
import {CommandType} from "../../../../warcommands/commands-panel/domain/command/model/command-type.enum";

describe('IfThenElseComponent', () => {
    let component: IfThenElseComponent;
    let fixture: ComponentFixture<IfThenElseComponent>;

    let commandNgrxRepositoryServiceSpy;

    beforeEach(waitForAsync(() => {
        const ifThenElseCommandMock: IfThenElseCommandEntity = {
            classMember: undefined,
            commandPathErrorsCounter: 0,
            data: undefined,
            fileId: "",
            id: "",
            innerCommandContainerIdList: {elseCommandContainerId: "", thenCommandContainerId: ""},
            parentCommandContainerId: "",
            type: CommandType.IfThenElse
        };
        commandNgrxRepositoryServiceSpy = jasmine.createSpyObj('CommandNgrxRepositoryService', ['getCommand']);
        commandNgrxRepositoryServiceSpy.getCommand.and.returnValue(of(ifThenElseCommandMock));
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
