import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CommandDropComponent} from './command-drop.component';
import {
    CommandContainerNgrxRepositoryService
} from "../../../warcommands/commands-panel/infrastructure/ngrx/command-container/command-container-ngrx-repository.service";
import {
    CommandContainerDTO
} from "../../../warcommands/commands-panel/domain/command-container/model/command-container.dto";
import {of} from "rxjs";
import {
    CommandDragDropManagerService
} from "../../../warcommands/commands-panel/domain/command-drag-drop/services/command-drag-drop-manager.service";
import {
    CommandRepositoryService
} from "../../../warcommands/commands-panel/domain/command/services/command-repository.service";

describe('CommandDropComponent', () => {
    let component: CommandDropComponent;
    let fixture: ComponentFixture<CommandDropComponent>;

    let commandContainerNgrxRepositoryServiceSpy;
    let commandDragDropManagerServiceSpy;
    let commandRepositoryServiceSpy;

    beforeEach(waitForAsync(() => {
        commandContainerNgrxRepositoryServiceSpy = jasmine.createSpyObj('CommandContainerNgrxRepositoryService', ['getCommandContainer']);
        const commandContainerMock: CommandContainerDTO = {
            commands: [],
            fileId: "",
            id: "",
            parentCommandId: ''
        };
        commandContainerNgrxRepositoryServiceSpy.getCommandContainer.and.returnValue(of(commandContainerMock));

        commandDragDropManagerServiceSpy = jasmine.createSpyObj('CommandDragDropManagerService', ['createCommandContainerDrop']);

        commandRepositoryServiceSpy = jasmine.createSpyObj('CommandRepositoryService', ['findById']);

        TestBed.configureTestingModule({
            declarations: [CommandDropComponent],
            providers: [
                {provide: CommandContainerNgrxRepositoryService, useValue: commandContainerNgrxRepositoryServiceSpy},
                {provide: CommandDragDropManagerService, useValue: commandDragDropManagerServiceSpy},
                {provide: CommandRepositoryService, useValue: commandRepositoryServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommandDropComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
