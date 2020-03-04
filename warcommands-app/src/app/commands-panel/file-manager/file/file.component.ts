import { Component, OnInit, Input } from '@angular/core';
import { FileDTO } from 'src/warcommands/commands-panel/domain/file/model/file.dto';

@Component({
    selector: 'app-file',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

    @Input()
    fileData: FileDTO;

    constructor() { }

    ngOnInit() {
    }

}
