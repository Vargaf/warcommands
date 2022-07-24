import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {FileComponent} from './file.component';
import {
    UxUiNgrxRepositoryService
} from "../../../../warcommands/commands-panel/infrastructure/ngrx/ux-ui/ux-ui-ngrx-repository.service";
import {Renderer2} from "@angular/core";
import {of} from "rxjs";
import {FileDTO} from "../../../../warcommands/commands-panel/domain/file/model/file.dto";
import {CommandDropComponent} from "../../command-drop/command-drop.component";
import {
    CommandContainerNgrxRepositoryService
} from "../../../../warcommands/commands-panel/infrastructure/ngrx/command-container/command-container-ngrx-repository.service";
import {
    CommandDropRepository
} from "../../../../warcommands/commands-panel/domain/command-drag-drop/services/command-drop-repository.service";
import {
    CommandDraggableElementRepositoryService
} from "../../../../warcommands/commands-panel/domain/command-drag-drop/services/command-draggable-element-repository.service";
import {
    CommandContainerDragDropManagerService
} from "../../../../warcommands/commands-panel/domain/command-container/services/command-container-drag-drop-manager.service";
import {
    CommandComponentRepositoryService
} from "../../../../warcommands/commands-panel/domain/command-component/services/command-component-repository.service";
import {
    CommandRemovalEventChainGeneratorService
} from "../../../../warcommands/commands-panel/domain/command/services/command-removal-event-chain-generator.service";
import {
    CommandRepositoryService
} from "../../../../warcommands/commands-panel/domain/command/services/command-repository.service";
import {
    CommandContainerDTO
} from "../../../../warcommands/commands-panel/domain/command-container/model/command-container.dto";

describe('FileComponent', () => {
    let component: FileComponent;
    let fixture: ComponentFixture<FileComponent>;

    let uxUiNgrxRepositoryServiceSpy;
    let rendererSpy;

    let commandContainerNgrxRepositoryServiceSpy;
    let commandDropRepositorySpy;
    let commandDraggableElementRepositoryServiceSpy;
    let commandContainerDragDropManagerServiceSpy;
    let commandComponentRepositoryServiceSpy;
    let commandRemovalEventChainGeneratorServiceSpy;
    let commandRepositoryServiceSpy;

    beforeEach(waitForAsync(() => {

        rendererSpy = jasmine.createSpyObj('Renderer2', ['setStyle']);
        uxUiNgrxRepositoryServiceSpy = jasmine.createSpyObj('UxUiNgrxRepositoryService', ['watchWindowsSize']);
        const windowSizeMock = {
            height: 0
        }
        uxUiNgrxRepositoryServiceSpy.watchWindowsSize.and.returnValue(of(windowSizeMock));

        commandContainerNgrxRepositoryServiceSpy = jasmine.createSpyObj('CommandContainerNgrxRepositoryService', ['getCommandContainer']);
        const commandContainerMock: CommandContainerDTO = {
            commands: [],
            fileId: "",
            id: "",
            parentCommandId: ''
        };
        commandContainerNgrxRepositoryServiceSpy.getCommandContainer.and.returnValue(of(commandContainerMock));
        commandDropRepositorySpy = jasmine.createSpyObj('CommandDropRepository', ['a']);
        commandDraggableElementRepositoryServiceSpy = jasmine.createSpyObj('CommandDraggableElementRepositoryService', ['a']);
        commandContainerDragDropManagerServiceSpy = jasmine.createSpyObj('CommandContainerDragDropManagerService', ['createCommandContainerDrop']);
        commandComponentRepositoryServiceSpy = jasmine.createSpyObj('CommandComponentRepositoryService', ['a']);
        commandRemovalEventChainGeneratorServiceSpy = jasmine.createSpyObj('CommandRemovalEventChainGeneratorService', ['a']);
        commandRepositoryServiceSpy = jasmine.createSpyObj('CommandRepositoryService', ['a']);

        TestBed.configureTestingModule({
            declarations: [FileComponent, CommandDropComponent],
            providers: [
                {provide: UxUiNgrxRepositoryService, useValue: uxUiNgrxRepositoryServiceSpy},
                {provide: Renderer2, useValue: rendererSpy},
                {provide: CommandContainerNgrxRepositoryService, useValue: commandContainerNgrxRepositoryServiceSpy},
                {provide: CommandDropRepository, useValue: commandDropRepositorySpy},
                {provide: CommandDraggableElementRepositoryService, useValue: commandDraggableElementRepositoryServiceSpy},
                {provide: CommandContainerDragDropManagerService, useValue: commandContainerDragDropManagerServiceSpy},
                {provide: CommandComponentRepositoryService, useValue: commandComponentRepositoryServiceSpy},
                {provide: CommandRemovalEventChainGeneratorService, useValue: commandRemovalEventChainGeneratorServiceSpy},
                {provide: CommandRepositoryService, useValue: commandRepositoryServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {

        const fileData: FileDTO = {
            commandContainerId: "",
            id: "",
            name: "",
            playerId: ""
        }

        fixture = TestBed.createComponent(FileComponent);
        component = fixture.componentInstance;
        component.fileData = fileData;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
