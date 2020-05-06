import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { FileDTO } from 'src/warcommands/commands-panel/domain/file/model/file.dto';
import { FileManagerEvents } from 'src/warcommands/commands-panel/domain/file/services/file-manager.events';
import { CommandsPanelManagerService } from 'src/warcommands/commands-panel/domain/commands-panel/services/commands-panel-manager.service';
import { MouseDragDropHelperService } from 'src/warcommands/commands-panel/domain/command-drag-drop/services/mouse-drag-drop-helper.service';
import { CommandDragDropManagerService } from 'src/warcommands/commands-panel/domain/command-drag-drop/services/command-drag-drop-manager.service';
import { GameMiddlewareService } from 'src/warcommands/game-middleware/game-middleware.service';

@Component({
    selector: 'app-file-manager',
    templateUrl: './file-manager.component.html',
    styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {

    @ViewChild('deleteButtonWrapper', { static: true })
    deleteButtonWrapper: ElementRef<HTMLDivElement>;

    @ViewChild('deleteButtonDragableElement', { static: true })
    deleteButtonDragableElement: ElementRef<HTMLDivElement>;

    @ViewChild('filesTabGroup', { static: true })
    filesTabGroup: MatTabGroup;

    fileList: FileDTO[] = [];

    isDeleteCommandDropContainer = true;
    isGamePaused = false;

    constructor(
        private readonly commandsPanelManagerService: CommandsPanelManagerService,
        private readonly fileManagerEvents: FileManagerEvents,
        private readonly mouseDragDropHelperService: MouseDragDropHelperService,
        private readonly commandDragDropManager: CommandDragDropManagerService,
        private readonly gameMiddlewareService: GameMiddlewareService
    ) { }

    ngOnInit() {
        this.fileManagerEvents.opennedFileLoadedListener().subscribe((file) => {
            this.addFile(file);
        });

        this.commandDragDropManager.createDeleteCommandDropContainer(this.deleteButtonWrapper, this.deleteButtonDragableElement);
        this.commandsPanelManagerService.loadOpennedFiles();

    }

    private addFile(file: FileDTO): void {
        this.fileList.push(file);
    }

    onMouseMove(event: MouseEvent): void {
        this.mouseDragDropHelperService.saveActiveCommandContainer(event);
    }

    saveFile(): void {
        const selectedFile = this.filesTabGroup.selectedIndex;
        const file: FileDTO = this.fileList[selectedFile];
        this.commandsPanelManagerService.saveFile(file);
    }

    onPauseGame(): void {
        this.isGamePaused = true;
        this.gameMiddlewareService.pauseGame();
    }

    onResumeGame(): void {
        this.isGamePaused = false;
        this.gameMiddlewareService.resumeGame();
    }

}
