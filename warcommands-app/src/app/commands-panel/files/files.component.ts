import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { FileDTO } from 'src/warcommands/commands/domain/file/model/file.dto';
import { FileManagerService } from 'src/warcommands/commands/domain/file-manager/services/file-manager.service';
import { MouseDragDropHelperService } from 'src/warcommands/commands/domain/command-panel/services/mouse-drag-drop-helper.service';

@Component({
    selector: 'app-files',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

    @ViewChild('filesTabGroup', { static: true })
    filesTabGroup: MatTabGroup;

    fileList: FileDTO[] = [];

    constructor(
        private readonly fileManagerService: FileManagerService,
        private readonly mouseHelperService: MouseDragDropHelperService
    ) { }

    ngOnInit() {
        this.fileList = this.fileManagerService.loadOppenedFiles();
    }

    saveFile() {
        const selectedFile = this.filesTabGroup.selectedIndex;
        this.fileManagerService.saveFile(this.fileList[selectedFile].id);
    }

    onMouseMove(event: MouseEvent) {
        this.mouseHelperService.saveActiveCommandContainer(event);
    }
}
