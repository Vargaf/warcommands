import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { FileDTO } from 'src/warcommands/commands-panel/domain/file/model/file.dto';
import { FileManagerEvents } from 'src/warcommands/commands-panel/domain/file/services/file-manager.events';
import { CommandsPanelManagerService } from 'src/warcommands/commands-panel/domain/commands-panel/services/commands-panel-manager.service';
import { MouseDragDropHelperService } from 'src/warcommands/commands-panel/domain/command-drag-drop/services/mouse-drag-drop-helper.service';

@Component({
    selector: 'app-file-manager',
    templateUrl: './file-manager.component.html',
    styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {

    @ViewChild('filesTabGroup', { static: true })
    filesTabGroup: MatTabGroup;

    fileList: FileDTO[] = [];

    constructor(
        private readonly commandsPanelManagerService: CommandsPanelManagerService,
        private readonly fileManagerEvents: FileManagerEvents,
        private readonly mouseDragDropHelperService: MouseDragDropHelperService
    ) { }

    ngOnInit() {
        this.fileManagerEvents.fileLoadedListener().subscribe((file) => {
            this.addFile(file);
        });

        this.commandsPanelManagerService.loadOpennedFiles();

    }

    private addFile(file: FileDTO): void {
        this.fileList.push(file);
    }

    onMouseMove(event: MouseEvent): void {
        this.mouseDragDropHelperService.saveActiveCommandContainer(event);
    }

}
