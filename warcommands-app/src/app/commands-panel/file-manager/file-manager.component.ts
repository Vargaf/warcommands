import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { FileDTO } from 'src/warcommands/commands-panel/domain/file/model/file.dto';
import { FileManagerEvents } from 'src/warcommands/commands-panel/domain/file/services/file-manager.events';
import { CommandsPanelManagerService } from 'src/warcommands/commands-panel/domain/commands-panel/services/commands-panel-manager.service';
import { CommandDragDropManagerService } from 'src/warcommands/commands-panel/domain/command-drag-drop/services/command-drag-drop-manager.service';

@Component({
    selector: 'app-file-manager',
    templateUrl: './file-manager.component.html',
    styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {

    @ViewChild('deleteButtonWrapper', { static: true })
    deleteButtonWrapper: ElementRef<HTMLDivElement>;

    @ViewChild('deleteButtonDraggableElement', { static: true })
    deleteButtonDraggableElement: ElementRef<HTMLDivElement>;

    @ViewChild('cancelButtonWrapper', { static: true })
    cancelButtonWrapper: ElementRef<HTMLDivElement>;

    @ViewChild('cancelButtonDraggableElement', { static: true })
    cancelButtonDraggableElement: ElementRef<HTMLDivElement>;

    @ViewChild('filesTabGroup', { static: true })
    filesTabGroup: MatTabGroup;

    fileList: FileDTO[] = [];

    isDeleteCommandDropContainer = true;
    isSavingFile = false;

    constructor(
        private readonly commandsPanelManagerService: CommandsPanelManagerService,
        private readonly fileManagerEvents: FileManagerEvents,
        private readonly commandDragDropManager: CommandDragDropManagerService,
    ) { }

    ngOnInit() {
        this.fileManagerEvents.opennedFileLoadedListener().subscribe((file) => {
            this.addFile(file);
        });

        this.commandDragDropManager.createDeleteCommandDropContainer(this.deleteButtonWrapper, this.deleteButtonDraggableElement);
        this.commandDragDropManager.createCancelCommandDragContainer(this.cancelButtonWrapper, this.cancelButtonDraggableElement);
        this.commandsPanelManagerService.loadOpennedFiles();

    }

    private addFile(file: FileDTO): void {
        this.fileList.push(file);
    }

    saveFile(): void {
        this.isSavingFile = true;

        const selectedFile = this.filesTabGroup.selectedIndex;
        const file: FileDTO = this.fileList[selectedFile];
        this.commandsPanelManagerService.saveFile(file);

        this.isSavingFile = false;
    }

}
