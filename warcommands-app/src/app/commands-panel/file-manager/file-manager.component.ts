import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { FileDTO } from 'src/warcommands/commands-panel/domain/file/model/file.dto';
import { FileManagerService } from 'src/warcommands/commands-panel/domain/file/services/file-manager.service';

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
        private readonly fileManagerService: FileManagerService
    ) { }

    ngOnInit() {
        this.fileList = this.fileManagerService.loadOpennedFiles();
    }

}
